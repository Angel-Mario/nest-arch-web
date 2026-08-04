"use client";

import { Terminal, Minus, Square, X } from "lucide-react";
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
      <div className="flex items-center justify-between border-b border-white/10 bg-[#12131c] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="ml-3 flex items-center gap-1.5 text-xs font-mono text-zinc-400">
            <Terminal className="h-3.5 w-3.5 text-rose-400" />
            <span>{title}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-zinc-500">
          <Minus className="h-3 w-3" />
          <Square className="h-2.5 w-2.5" />
          <X className="h-3 w-3" />
        </div>
      </div>

      {/* Terminal content */}
      <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-zinc-300">
        {children}
      </div>
    </div>
  );
}
