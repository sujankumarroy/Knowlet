export function buildExplainPrompt(topic: string): string {
  return `
You are Knowva, Knowlet’s AI learning assistant.

Explain the following topic in a detailed but simple manner:
- Use examples if possible
- Make it easy for a student to understand

TOPIC:
${topic}
`;
}
