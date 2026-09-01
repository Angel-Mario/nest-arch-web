"use client";

import { Terminal } from "lucide-react";
import * as React from "react";

import { cn } from "../lib/utils";

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalWindow({
  title = "nest-arch",
  children,
  className,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0c0d14]/90 shadow-[0_0_40px_rgba(168,85,247,0.15)] backdrop-blur-xl",
        className
      )}
    >
      {/* Title bar */}
      <div className="relative flex shrink-0 items-center justify-between border-b border-white/10 bg-[#12131c] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full border border-black/20 bg-[#ff5f56]" />
          <span className="inline-block h-3 w-3 rounded-full border border-black/20 bg-[#ffbd2e]" />
          <span className="inline-block h-3 w-3 rounded-full border border-black/20 bg-[#27c93f]" />
        </div>
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 font-mono text-xs text-zinc-400">
          <Terminal className="h-3.5 w-3.5 text-rose-400" />
          <span>{title}</span>
        </div>
        <div className="w-12" />
      </div>

      {/* Terminal content */}
      <div className="flex min-h-0 flex-1 flex-col p-4 font-mono text-xs leading-relaxed text-zinc-300 sm:p-5 sm:text-sm">
        {children}
      </div>
    </div>
  );
}
