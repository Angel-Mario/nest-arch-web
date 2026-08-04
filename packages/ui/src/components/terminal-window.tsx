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
        "relative rounded-xl border border-white/10 bg-[#0c0d14]/90 backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.15)] overflow-hidden",
        className
      )}
    >
      {/* Title bar */}
      <div className="relative flex items-center justify-between border-b border-white/10 bg-[#12131c] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56] inline-block border border-black/20" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e] inline-block border border-black/20" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f] inline-block border border-black/20" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs font-mono text-zinc-400">
          <Terminal className="h-3.5 w-3.5 text-rose-400" />
          <span>{title}</span>
        </div>
        <div className="w-12" />
      </div>

      {/* Terminal content */}
      <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-zinc-300">
        {children}
      </div>
    </div>
  );
}
