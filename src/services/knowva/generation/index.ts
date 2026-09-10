import { buildDefaultPrompt } from "./default";
import { buildQuizPrompt } from "./quiz";
import { buildShortPrompt } from "./short";
import { buildExplainPrompt } from "./explain";
import { buildCreateResourcePrompt } from "./create-resource";

export function generatePrompt(mode: string, input: string): string {
  switch (mode) {
    case "quiz":
      return buildQuizPrompt(input);

    case "short":
      return buildShortPrompt(input);

    case "explain":
      return buildExplainPrompt(input);

    case "create-resource":
      return buildCreateResourcePrompt(input);

    default:
      return buildDefaultPrompt(input);
  }
}
