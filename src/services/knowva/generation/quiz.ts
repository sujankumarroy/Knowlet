import { Type } from "@google/genai";

export const quizSchema = {
  type: Type.ARRAY,
  minItems: 5,
  maxItems: 5,
  items: {
    type: Type.OBJECT,
    properties: {
      question: {
        type: Type.STRING,
      },
      options: {
        type: Type.ARRAY,
        minItems: 4,
        maxItems: 4,
        items: {
          type: Type.STRING,
        },
      },
      answer: {
        type: Type.STRING,
      },
    },
    required: ["question", "options", "answer"],
  },
};

export function buildQuizPrompt(notes: string): string {
  return `
You are Knowva, Knowlet's AI learning assistant, specialized in quiz generation.

Create exactly 5 multiple-choice questions from the given student notes.

Rules:
- Exactly 4 options per question.
- The answer must exactly match one of the options.
- Questions must be based only on the provided notes.

NOTES:
${notes}
`;
}
