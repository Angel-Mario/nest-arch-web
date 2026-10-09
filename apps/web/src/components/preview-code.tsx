"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
  codeLines,
  normalizeCodeSource,
} from "@/lib/project-preview/code-lines";
import { highlightCode } from "@/lib/project-preview/highlight";
import type { CodeToken } from "@/lib/project-preview/highlight";

interface HighlightedContent {
  content: string;
  path: string;
  dark: boolean;
  tokens: CodeToken[];
}

const CodeSpan = ({ token }: { token: CodeToken }) => (
  <span
    style={{
      color: token.color,
      fontStyle: [1, 3, 5, 7].includes(token.fontStyle ?? 0)
        ? "italic"
        : undefined,
      fontWeight: [2, 3, 6, 7].includes(token.fontStyle ?? 0) ? 600 : undefined,
      textDecoration: [4, 5, 6, 7].includes(token.fontStyle ?? 0)
        ? "underline"
        : undefined,
    }}
  >
    {token.content}
  </span>
);

export const PreviewCode = ({
  content,
  path,
}: {
  content: string;
  path: string;
}) => {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const displayContent = normalizeCodeSource(content);
  const [highlighted, setHighlighted] = useState<HighlightedContent | null>(
    null
  );
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const tokens = await highlightCode(displayContent, path, dark);
        if (active) {
          setHighlighted({ content: displayContent, dark, path, tokens });
        }
      } catch {
        // Keep readable plain text if a grammar cannot load.
        if (active) {
          setHighlighted(null);
        }
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [displayContent, path, dark]);
  const tokens =
    highlighted?.content === displayContent &&
    highlighted.path === path &&
    highlighted.dark === dark
      ? highlighted.tokens
      : null;
  const lines = codeLines(displayContent, tokens);
  return (
    <code>
      {lines.map((line) => (
        <span
          key={line.offset}
          className="preview-code-line"
          data-line-number={line.number}
        >
          {tokens
            ? line.tokens.map((token) => (
                <CodeSpan key={token.offset} token={token} />
              ))
            : line.text}
          {line.number < lines.length ? "\n" : ""}
        </span>
      ))}
    </code>
  );
};
