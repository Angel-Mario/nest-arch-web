import type { CodeToken } from "./highlight";

// Shiki uses LF offsets. Windows templates and programmatic output can mix
// CRLF and LF, so tokenize and lay out the same normalized display source.
export const normalizeCodeSource = (content: string): string =>
  content.replaceAll(/\r\n?/gu, "\n");

export const codeLines = (content: string, tokens: CodeToken[] | null) => {
  const allTokens = tokens ?? [];
  let offset = 0;
  let cursor = 0;
  let number = 0;
  return content.split("\n").map((text) => {
    const start = offset;
    offset += text.length + 1;
    number += 1;
    const lineTokens: CodeToken[] = [];
    while (cursor < allTokens.length && allTokens[cursor].offset < offset - 1) {
      const token = allTokens[cursor];
      if (token.offset >= start) {
        lineTokens.push(token);
      }
      cursor += 1;
    }
    return { number, offset: start, text, tokens: lineTokens };
  });
};
