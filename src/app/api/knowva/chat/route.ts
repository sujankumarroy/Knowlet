import { NextRequest } from "next/server";

import { authGate } from "@/lib/auth/authGate";
import { generatePrompt } from "@/services/knowva/generation";
import { buildDefaultPrompt } from "@/services/knowva/generation/default";
import { generateStream, extractMemories } from "@/services/knowva";
import { createMemories, getMemories } from "@/db/knowva/memory";
import { fetchMessages } from "@/db/knowva/message";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, mode, model, chatId } = body;

    if (!text) {
      return new Response(
        JSON.stringify({ success: false, error: "No text provided" }),
        { status: 400, headers: corsHeaders() },
      );
    }

    const { ok, res, payload } = await authGate(req, "jwt");
    if (!ok || !payload) return res;

    void (async () => {
      try {
        const memories = await extractMemories(text);
        await createMemories(memories, payload.user_id);
      } catch (error) {
        console.error("Memory extraction failed:", error);
      }
    })();

    let prompt = "";

    if (["quiz", "short", "explain", "create-resource"].includes(mode)) {
      prompt = generatePrompt(mode, text);
    } else {
      let userMemories = "";
      let recentConversation = "";
      let conversationSummary = "";

      const result = await Promise.allSettled([
        getMemories(payload.user_id),
        fetchMessages(chatId),
      ]);

      const memories = result[0].status === "fulfilled" ? result[0].value : [];
      const messages = result[1].status === "fulfilled" ? result[1].value : [];

      userMemories = memories.map((memory) => `- ${memory.content}`).join("\n");

      messages.pop();
      recentConversation = messages
        .map((message) => `${message.role}: ${message.content}`)
        .join("\n");

      prompt = buildDefaultPrompt(
        text,
        userMemories,
        recentConversation,
        conversationSummary,
      );
    }

    const stream = await generateStream({ prompt, model });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    const message = (err as any).message || "";

    if (
      message.includes("429") ||
      message.toLowerCase().includes("quota") ||
      message.toLowerCase().includes("too many requests")
    ) {
      const waitTime = extractRetryTime(message);
      return new Response(
        JSON.stringify({
          type: "rate_limit",
          error: `⏳ AI limit reached. Try again in ${waitTime} seconds.`,
          retryAfter: waitTime,
        }),
        { status: 429, headers: corsHeaders() },
      );
    }

    return new Response(
      JSON.stringify({
        type: "server_error",
        error: "Something went wrong. Please try again.",
      }),
      { status: 500, headers: corsHeaders() },
    );
  }
}

function cleanJSON(raw: string) {
  return raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

function corsHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function extractRetryTime(errorMessage: string) {
  const match = errorMessage.match(/retryDelay":"(\d+)s"/);
  return match ? parseInt(match[1]) : 20;
}
