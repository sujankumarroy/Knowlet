import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async (request) => {

    // CORS
    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            }
        });
    }

    try {
        const body = await request.json();
        const { text } = body;

        if (!text) {
            return new Response(
                JSON.stringify({ success: false, error: "No text provided" }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
You are a quiz generator for Knowlet.

Your primary task is to create 5 multiple-choice questions (MCQs) from the given student notes.

STRICT RULES (must follow):
- Output MUST be valid JSON
- Do NOT include markdown (no \`\`\`)
- Do NOT include explanations, headings, or extra text
- Do NOT include trailing commas
- The response MUST start with [ and end with ]
- Each question must have exactly 4 options
- Answer must be one of: "A", "B", "C", "D"

SPECIAL BEHAVIOR:
- If the user asks about your identity (e.g., "who are you", "what are you", "who made you"), respond with:
"I am Knowlet, an AI-powered learning assistant that helps students generate quizzes, understand concepts, and study more effectively."
- Do NOT return JSON in that case, only the above sentence.

FORMAT:
[
  {
    "question": "string",
    "options": [
      "A) option text",
      "B) option text",
      "C) option text",
      "D) option text"
    ],
    "answer": "A"
  }
]

NOTES:
${text}
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const raw = response.text();

        let parsed;

        try {
            parsed = JSON.parse(raw);
        } catch (err) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Invalid AI response",
                    raw
                }),
                {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                quiz: parsed
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }
        );

    } catch (err) {
        return new Response(
            JSON.stringify({
                success: false,
                error: err.message
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }
        );
    }
};
