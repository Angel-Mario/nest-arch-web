import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

import { fileLanguage } from "./file-presentation";

let highlighter: ReturnType<typeof createHighlighterCore> | undefined;

const loadHighlighter = async () => {
  highlighter ??= createHighlighterCore({
    engine: createJavaScriptRegexEngine(),
    langs: [
      import("shiki/langs/typescript.mjs"),
      import("shiki/langs/jsonc.mjs"),
      import("shiki/langs/yaml.mjs"),
      import("shiki/langs/markdown.mjs"),
      import("shiki/langs/prisma.mjs"),
      import("shiki/langs/toml.mjs"),
      import("shiki/langs/shellscript.mjs"),
      import("shiki/langs/dockerfile.mjs"),
      import("shiki/langs/dotenv.mjs"),
    ],
    themes: [
      import("shiki/themes/github-dark.mjs"),
      import("shiki/themes/github-light.mjs"),
    ],
  });
  try {
    return await highlighter;
  } catch (error) {
    highlighter = undefined;
    throw error;
  }
};

export interface CodeToken {
  offset: number;
  content: string;
  color?: string;
  fontStyle?: number;
}

export const highlightCode = async (
  content: string,
  path: string,
  dark: boolean
): Promise<CodeToken[]> => {
  const engine = await loadHighlighter();
  const { tokens } = engine.codeToTokens(content, {
    lang: fileLanguage(path),
    theme: dark ? "github-dark" : "github-light",
  });
  const result: CodeToken[] = [];
  let offset = 0;
  let firstLine = true;
  for (const line of tokens) {
    if (!firstLine) {
      result.push({ content: "\n", offset });
      offset += 1;
    }
    firstLine = false;
    for (const token of line) {
      if (token.content.length > 0) {
        result.push({
          color: token.color,
          content: token.content,
          fontStyle: token.fontStyle,
          offset,
        });
        offset += token.content.length;
      }
    }
  }
  return result;
};
