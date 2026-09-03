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
        "border-border bg-background relative flex flex-col overflow-hidden rounded-xl border shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all",
        className
      )}
    >
      {/* Title bar */}
      <div className="border-border bg-muted relative flex shrink-0 items-center justify-between border-b px-4 py-2.5">
        <div className="border-border bg-muted/60 flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="text-muted-foreground absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 font-mono text-[11px] text-zinc-400">
          <Terminal className="h-3.5 w-3.5 text-rose-400" />
          <span>{title}</span>
        </div>
        <div className="w-12" />
      </div>

      {/* Terminal content */}
      <div className="flex min-h-0 flex-1 flex-col bg-[#0a0a0f]/95 p-4 font-mono text-xs leading-relaxed text-zinc-300 sm:p-5 sm:text-sm">
        {children}
      </div>
    </div>
  );
}
