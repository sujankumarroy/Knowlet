import { gemini } from "@/lib/gemini";
import { sleep } from "@/utils/sleep";
import { DEFAULT_MODEL, ModelId } from "@/config/ai";
import { quizSchema } from "./generation/quiz";
import { createResourceSchema } from "./generation/create-resource";
import { Mode } from "@/types/knowva";

type GenerateOptions = {
  prompt: string;
  mode?: Mode;
  model?: ModelId;
  retries?: number;
};

export async function generate({
  prompt,
  model = DEFAULT_MODEL,
  retries = 3,
}: GenerateOptions): Promise<string> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await gemini.models.generateContent({
        model,
        contents: prompt,
      });

      if (!response.text) throw new Error("Failed to generate response");

      return response.text.trim();
    } catch (error: any) {
      lastError = error;

      const status = error?.status ?? error?.code;
      const retryable = [429, 500, 503].includes(status);

      if (!retryable || attempt === retries) {
        break;
      }

      await sleep(1000 * 2 ** (attempt - 1));
    }
  }

  const message =
    lastError instanceof Error
      ? lastError.message
      : "Failed to generate AI response.";

  throw new Error(message);
}

export async function generateStream({
  prompt,
  mode = "chat",
  model = DEFAULT_MODEL,
  retries = 3,
}: GenerateOptions): Promise<ReadableStream<any>> {
  let lastError: unknown;

  const responseSchema = {
    quiz: quizSchema,
    "create-resource": createResourceSchema,
  } as const;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const config =
        mode === "create-resource"
          ? {
              responseMimeType: "application/json",
              responseSchema: responseSchema[mode],
            }
          : undefined;

      const stream = await gemini.models.generateContentStream({
        model,
        contents: prompt,
        config,
      });

      const encoder = new TextEncoder();

      const responseStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const text = chunk.text ?? "";

              if (text) {
                controller.enqueue(encoder.encode(text));
              }
            }

            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
      });

      return responseStream;
    } catch (error: any) {
      lastError = error;

      const status = error?.status ?? error?.code;
      const retryable = [429, 500, 503].includes(status);

      if (!retryable || attempt === retries) {
        break;
      }

      await sleep(1000 * 2 ** (attempt - 1));
    }
  }

  const message =
    lastError instanceof Error
      ? lastError.message
      : "Failed to generate AI response.";

  throw new Error(message);
}
