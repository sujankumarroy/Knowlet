export function buildShortPrompt(question: string): string {
  return `
You are Knowva, Knowlet’s AI learning assistant.

Provide a very short and direct answer to the user's question. Max 1-2 sentences.

QUESTION:
${question}
`;
}
