"use client";

import { Check, Copy, Terminal } from "lucide-react";
import * as React from "react";

import { cn } from "../lib/utils";

interface CodeBlockProps {
  code: string;
  className?: string;
  prefix?: string;
}

export function CodeBlock({ code, className, prefix = "$ " }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div
      className={cn(
        "group relative flex items-center justify-between gap-3 rounded-lg border border-red-500/30 bg-[#0d0e15] px-4 py-2.5 font-mono text-sm transition-all hover:border-red-500/50",
        className
      )}
    >
      <div className="flex items-center  gap-2 overflow-x-auto">
        <Terminal className="h-4 w-4 shrink-0 text-red-500" />
        <span className="-ml-2 text-rose-400 select-none">{prefix}</span>
        <span className="text-zinc-100 font-medium">{code}</span>
      </div>
      <button
        onClick={handleCopy}
        type="button"
        className="cursor-pointer flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Copy command"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
