"use client";

import { Badge } from "@nest-arch-web/ui/components/badge";
import { CodeBlock } from "@nest-arch-web/ui/components/code-block";
import { TerminalWindow } from "@nest-arch-web/ui/components/terminal-window";
import { ArrowRight, Check, Play, Terminal } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { InteractiveTerminalWizard } from "./interactive-terminal-wizard";

const ASCII_CAT = `   ,-.       _,---._ __   /\\
  /  )    .-'       \`./  /  \\
 (  (   ,'            \` /   /|
  \\  \`-"             \\'\\   / |
   \`.              ,  \\ \\ /  |
    /\`.          ,'-\`----Y   |
   (            ;        |   '
   |  ,-.    ,-' NestJS  |  /
   |  | (   |    Toolkit | /
   )  |  \\  \`.___________|/
   \`--'   \`--'
`;

const ASCII_BANNER = ` _   _ _____ ____ _____     _    ____   ____ _   _ 
| \\ | | ____/ ___|_   _|   / \\  |  _ \\ / ___| | | |
|  \\| |  _| \\___ \\ | |    / _ \\ | |_) | |   | |_| |
| |\\  | |___ ___) || |   / ___ \\|  _ <| |___|  _  |
|_| \\_|_____|____/ |_|  /_/   \\_\\_| \\_\\\\____|_| |_|`;

export function HeroSection() {
  const [isLiveDemo, setIsLiveDemo] = React.useState(false);

  return (
    <section
      className="relative isolate grid grid-cols-1 items-start gap-10 pt-2 pb-6 md:grid-cols-2 md:items-center md:gap-6 lg:grid-cols-12 lg:gap-8 lg:pt-4 lg:pb-10"
      id="home"
    >
      <div className="pointer-events-none absolute -inset-x-24 -top-24 -bottom-24 -z-10 bg-[radial-gradient(ellipse_at_14%_40%,rgba(220,38,38,0.16),transparent_50%),radial-gradient(ellipse_at_84%_46%,rgba(220,38,38,0.08),transparent_46%)]" />

      {/* Left Column: Hero Copy & Value Proposition (Fixed 6 columns to prevent layout shift) */}
      <div className="flex flex-col items-start md:col-span-1 lg:col-span-6 xl:col-span-6">
        <Badge
          variant="outline"
          className="gap-2 rounded-md border-red-500/35 bg-red-500/5 px-2.5 font-mono text-[11px] font-medium tracking-wide text-red-300"
        >
          <span className="size-1.5 animate-pulse rounded-full bg-red-400" />
          <span>v0.2.2 is available</span>
        </Badge>

        <p className="mt-5 font-mono text-xs font-medium tracking-[0.18em] text-red-400 uppercase">
          Your architecture, made explicit
        </p>

        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.06em] text-balance leading-[0.96] sm:text-5xl md:max-w-[12ch] md:text-[3.25rem] lg:max-w-3xl lg:text-6xl">
          Build the NestJS project you actually meant to build.
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:max-w-lg">
          A guided terminal flow for choosing the runtime, data layer and
          tooling before your first file exists. Clear decisions in, a
          production-ready foundation out.
        </p>

        <div className="mt-7 flex w-full max-w-xl flex-col gap-3">
          <CodeBlock
            code="npx @nest-arch/tui@latest"
            prefix=""
            className="w-full rounded-md shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
          />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-red-400" /> No config files
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-red-400" /> Interactive by default
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setIsLiveDemo((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-lg border border-red-500/60 bg-red-500/15 px-3.5 py-2 font-mono text-xs font-semibold text-red-200 shadow-[0_0_25px_rgba(239,68,68,0.2)] transition-all hover:scale-[1.02] hover:bg-red-500/25 sm:text-sm"
          >
            {isLiveDemo ? (
              <>
                <Terminal className="size-4 text-red-400" />
                <span>Exit Interactive Demo</span>
              </>
            ) : (
              <>
                <Play className="size-3.5 fill-red-400 text-red-400" />
                <span>Try Live Demo</span>
                <span className="size-1.5 animate-pulse rounded-full bg-red-400" />
              </>
            )}
          </button>

          <Link
            href="#cli"
            className="inline-flex items-center gap-2 border-b border-red-500/50 pb-1 font-mono text-sm font-medium text-foreground transition-colors hover:border-red-400 hover:text-red-400"
          >
            Explore workflow <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* Right Column: Terminal Preview / Live Wizard (Fixed 6 columns and fixed height to prevent layout shift) */}
      <div className="relative h-[420px] w-full sm:h-[500px] md:h-[460px] md:max-w-[560px] md:justify-self-end lg:col-span-6 lg:h-[540px] xl:col-span-6">
        {isLiveDemo ? (
          <div className="h-full w-full animate-in fade-in zoom-in-95 duration-300">
            <InteractiveTerminalWizard onClose={() => setIsLiveDemo(false)} />
          </div>
        ) : (
          <div className="group relative h-full w-full overflow-hidden rounded-xl">
            <TerminalWindow
              title="Administrator: PowerShell"
              className="h-full w-full overflow-hidden rounded-xl border-red-500/25 bg-[#090a10]/95 shadow-[0_28px_90px_rgba(0,0,0,0.48)]"
            >
              <div className="flex h-full flex-col justify-between space-y-3 font-mono text-xs leading-relaxed select-none sm:text-sm">
                {/* Header: ASCII Cat & NEST ARCH Banner */}
                <div className="flex flex-col gap-4 overflow-x-auto pb-1 text-red-500 sm:flex-row sm:items-start sm:justify-start sm:gap-6">
                  {/* Cat ASCII */}
                  <pre className="font-mono text-[10px] leading-[1.15] text-red-500 sm:text-[11px] md:text-xs">
                    {ASCII_CAT}
                  </pre>

                  {/* Banner + Subtitle + Version */}
                  <div className="flex flex-col justify-start pt-1">
                    <pre className="font-mono text-[9px] font-bold leading-[1.15] text-red-500 sm:text-[10px] md:text-[11px]">
                      {ASCII_BANNER}
                    </pre>
                    <p className="mt-2 font-mono text-[11px] text-zinc-300 sm:text-xs">
                      Build production-ready NestJS projects.
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] font-semibold text-sky-400 sm:text-xs">
                      v0.2.2
                    </p>
                  </div>
                </div>

                {/* Horizontal Divider */}
                <div className="h-px w-full bg-white/10" />

                {/* Welcome Line */}
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-200 sm:text-sm">
                  <span className="font-bold text-red-400">✧</span>
                  <span>
                    Welcome to{" "}
                    <span className="font-bold text-red-400">Nest Arch</span> –
                    Let&apos;s build something amazing.
                  </span>
                </div>

                {/* Prompt Question */}
                <div className="pt-1">
                  <p className="font-mono text-xs text-zinc-400 sm:text-sm">
                    What would you like to do?
                  </p>

                  {/* Menu Options List (Static main menu representation) */}
                  <div className="mt-2.5 space-y-1.5 font-mono text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-red-400">
                      <span className="w-3 font-bold text-red-400">&gt;</span>
                      <span className="font-semibold text-red-400">
                        Create a new NestJS project
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-400">
                      <span className="w-3 text-transparent">&gt;</span>
                      <span>Starter templates</span>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-400">
                      <span className="w-3 text-transparent">&gt;</span>
                      <span>Documentation</span>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-400">
                      <span className="w-3 text-transparent">&gt;</span>
                      <span>Exit</span>
                    </div>
                  </div>
                </div>

                {/* Footer Controls Instruction */}
                <div className="border-t border-white/10 pt-3">
                  <p className="font-mono text-[11px] text-zinc-500 sm:text-xs">
                    Use <span className="font-semibold text-zinc-300">↑/↓</span>{" "}
                    to navigate •{" "}
                    <span className="font-semibold text-zinc-300">Enter</span>{" "}
                    to select •{" "}
                    <span className="font-semibold text-zinc-300">Ctrl+C</span>{" "}
                    to exit
                  </p>
                </div>
              </div>
            </TerminalWindow>

            {/* Glassmorphic Centered Interactive CTA Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 p-4 backdrop-blur-[1.5px] transition-all duration-300 group-hover:bg-black/30">
              <button
                type="button"
                onClick={() => setIsLiveDemo(true)}
                className="group/cta cursor-pointer flex max-w-sm items-center gap-3.5 rounded-xl border border-red-500/50 bg-[#10121d]/90 p-3.5 shadow-[0_0_40px_rgba(239,68,68,0.25)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-red-400 hover:bg-[#151726]/95 hover:shadow-[0_0_55px_rgba(239,68,68,0.38)] active:scale-[0.98] sm:max-w-md sm:gap-4 sm:p-4"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/20 text-red-400 ring-1 ring-red-500/50 transition-all duration-300 group-hover/cta:scale-110 group-hover/cta:bg-red-500/30 sm:size-10">
                  <Play className="size-4 fill-red-400" />
                </span>

                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-xs font-semibold text-zinc-100 sm:text-sm">
                      Launch Interactive Live Demo
                    </p>
                    <span className="size-1.5 animate-pulse rounded-full bg-red-400" />
                  </div>
                  <p className="font-mono text-[11px] text-zinc-400">
                    Click to test all CLI steps in browser
                  </p>
                </div>

                <span className="ml-auto flex items-center gap-1 rounded-md border border-red-500/40 bg-red-500/20 px-2 py-1 font-mono text-[10px] font-bold text-red-300 transition-all duration-300 group-hover/cta:border-red-400 group-hover/cta:bg-red-500/30 sm:text-xs">
                  START
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
