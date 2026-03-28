import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

export default async (request) => {
    if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders() });
    }

    try {
        const body = await request.json();
        const { text, mode, difficulty = "medium" } = body;

        if (!text) {
            return new Response(
                JSON.stringify({ success: false, error: "No text provided" }),
                { status: 400, headers: corsHeaders() }
            );
        }

        const lowerText = text.toLowerCase();

        if (
            lowerText.includes("who are you") ||
            lowerText.includes("what are you") ||
            lowerText.includes("who made you")
        ) {
            return new Response(
                JSON.stringify({
                    success: true,
                    type: "identity",
                    message: "I am Knowlet, an AI-powered learning assistant that helps students generate quizzes, understand concepts, and study more effectively."
                }),
                { status: 200, headers: corsHeaders() }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        let prompt = "";

        // Mode-specific prompt
        switch (mode) {
            case "quiz":
                prompt = `
You are a quiz generator for Knowlet.

Create 5 ${difficulty}-level multiple-choice questions (MCQs) from the given student notes.

STRICT RULES:
- Output MUST be valid JSON
- NO markdown
- NO explanations or extra text
- Start with [ and end with ]
- Exactly 4 options per question

FORMAT:
[
  {
    "question": "string",
    "options": [
      "option text",
      "option text",
      "option text",
      "option text"
    ],
    "answer": "option text"
  }
]

NOTES:
${text}
`;
                break;

            case "study":
                prompt = `
You are Knowlet, an AI learning assistant.

Summarize the following text clearly and concisely for study purposes:
- Keep it simple and easy to understand
- Highlight key points
- No unnecessary long explanations

TEXT:
${text}
`;
                break;

            case "short":
                prompt = `
You are Knowlet, an AI learning assistant.

Provide a very short and direct answer to the user's question. Max 1-2 sentences.

QUESTION:
${text}
`;
                break;

            case "explain":
                prompt = `
You are Knowlet, an AI learning assistant.

Explain the following topic in a detailed but simple manner:
- Use examples if possible
- Make it easy for a student to understand

TOPIC:
${text}
`;
                break;

            default:
                // normal chat
                prompt = `
You are Knowlet, an AI learning assistant.

Answer the user's question clearly and concisely.
- Keep it simple and easy to understand
- No unnecessary long explanations
- No JSON, only plain text

QUESTION:
${text}
`;
        }

        let raw = "";
        let parsed = null;

        for (let attempt = 0; attempt < 3; attempt++) {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            raw = response.text();

            if (mode === "quiz") {
                try {
                    const cleaned = cleanJSON(raw);
                    parsed = JSON.parse(cleaned);
                    break;
                } catch (err) {
                    if (attempt === 2) {
                        return new Response(
                            JSON.stringify({ success: false, error: "Invalid AI response after retries", raw }),
                            { status: 500, headers: corsHeaders() }
                        );
                    }
                }
            } else {
                return new Response(
                    JSON.stringify({ success: true, type: "chat", message: raw.trim() }),
                    { status: 200, headers: corsHeaders() }
                );
            }
        }

        return new Response(
            JSON.stringify({ success: true, type: "quiz", quiz: parsed }),
            { status: 200, headers: corsHeaders() }
        );

    } catch (err) {
        const message = err.message || "";

        if (message.includes("429") || message.toLowerCase().includes("quota") || message.toLowerCase().includes("too many requests")) {
            const waitTime = extractRetryTime(message);
            return new Response(
                JSON.stringify({
                    success: false,
                    type: "rate_limit",
                    message: `⏳ AI limit reached. Try again in ${waitTime} seconds.`,
                    retryAfter: waitTime
                }),
                { status: 429, headers: corsHeaders() }
            );
        }

        return new Response(
            JSON.stringify({ success: false, errObj: err, error: "Something went wrong. Please try again." }),
            { status: 500, headers: corsHeaders() }
        );
    }
};

function cleanJSON(raw) {
    return raw.replace(/```json/g, "").replace(/```/g, "").trim();
}

function corsHeaders() {
    return {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
    };
}

function extractRetryTime(errorMessage) {
    const match = errorMessage.match(/retryDelay":"(\d+)s"/);
    return match ? parseInt(match[1]) : 20;
}