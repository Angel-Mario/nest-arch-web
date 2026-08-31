import { Badge } from "@nest-arch-web/ui/components/badge";
import { CodeBlock } from "@nest-arch-web/ui/components/code-block";
import { TerminalWindow } from "@nest-arch-web/ui/components/terminal-window";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      className="grid grid-cols-1 items-center gap-12 pt-4 lg:grid-cols-12"
      id="intro"
    >
      <div className="flex flex-col items-start gap-6 lg:col-span-7">
        <Badge
          variant="outline"
          className="gap-2 rounded-sm border-red-500/35 bg-red-500/5 px-2.5 font-mono text-[11px] font-medium tracking-wide text-red-300"
        >
          <span className="size-1.5 rounded-full bg-red-400" />
          <span>v0.2.2 is available</span>
        </Badge>

        <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.055em] text-balance leading-[0.98] sm:text-6xl lg:text-7xl">
          <span className="block text-zinc-100">Build production-ready</span>
          <span className="mt-1 block text-[--nest-red]">NestJS projects</span>
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Choose the runtime, data layer and project shape in an interactive
          terminal flow. Nest Arch generates the starting point; you keep the
          decisions.
        </p>

        <div className="flex w-full max-w-xl flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          <CodeBlock
            code="npx @nest-arch/tui@latest"
            prefix=">_"
            className="flex-1"
          />
          {/* <Link
            href="https://www.npmjs.com/package/@nest-arch/tui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-md border border-border bg-muted/40 px-4 py-2.5 font-mono text-sm font-medium text-foreground transition-colors hover:border-red-500/50 hover:bg-red-500/10"
          >
            <img
              src="/icons/npm-wordmark.svg"
              alt="npm"
              className="h-4 w-auto"
            />
            <span>NPM Package</span>
          </Link> */}
        </div>

        {/* <div className="flex w-full flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-2 transition-colors hover:text-red-400">
            <img
              src="/icons/typescript.svg"
              alt="TypeScript"
              className="h-4 w-4"
            />
            <span>TypeScript</span>
          </div>
          <div className="flex items-center gap-2 transition-colors hover:text-red-400">
            <img src="/icons/nestjs.svg" alt="NestJS" className="h-4 w-4" />
            <span>NestJS</span>
          </div>
          <div className="flex items-center gap-2 transition-colors hover:text-red-400">
            <img
              src="/icons/turborepo-icon-dark.svg"
              alt="Turborepo"
              className="h-4 w-4"
            />
            <span>Turborepo</span>
          </div>
          <div className="flex items-center gap-2 transition-colors hover:text-red-400">
            <img src="/icons/docker.svg" alt="Docker" className="h-4 w-4" />
            <span>Docker</span>
          </div>
          <div className="flex items-center gap-2 transition-colors hover:text-red-400">
            <img src="/icons/zod.svg" alt="Zod" className="h-4 w-4" />
            <span>Zod</span>
          </div>
        </div> */}
      </div>

      {/* <div className="lg:col-span-5">
        <TerminalWindow title="@nest-arch/tui v0.2.2">
          <div className="flex min-h-91.25 flex-col font-mono text-[11px] leading-relaxed sm:text-xs">
            <div className="border-b border-white/15 pb-5">
              <div className="flex items-start gap-3 text-red-400">
                <pre className="shrink-0 text-[7px] leading-[0.8] sm:text-[8px]">{` /\\_/\\
( o.o )
 > ^ <`}</pre>
                <div className="min-w-0 pt-1">
                  <pre className="overflow-hidden text-[9px] leading-none font-semibold tracking-[-0.08em] sm:text-[11px]">{` _   _ _____ ____ _____      _    ____   ____ _   _
|  | | ____/ ___|_   _|    /   |  _ \\ / ___| | | |
|  \\| |  _| \\___ \\ | |     / _ \\ | |_) | |   | |_| |
| |\\  | |___ ___) || |    / ___ \\|  _ <| |___|  _  |
|_| \\_|_____|____/ |_|   /_/   \\_\\_| \\_\\____|_| |_|`}</pre>
                  <p className="mt-1 text-zinc-300">
                    Build production-ready NestJS projects.
                  </p>
                  <p className="text-sky-400">v0.2.2</p>
                </div>
              </div>
            </div>

            <div className="flex-1 py-5">
              <p className="font-semibold text-zinc-100">
                <span className="mr-2 text-red-400">✧</span>
                Welcome to <span className="text-red-400">Nest Arch</span>—
                Let&apos;s build something amazing.
              </p>
              <p className="mt-6 text-zinc-400">What would you like to do?</p>
              <ul className="mt-3 flex flex-col gap-2 text-zinc-500">
                <li className="font-semibold text-red-400">
                  &gt; Create a new NestJS project
                </li>
                <li className="pl-3">Starter templates</li>
                <li className="pl-3">Documentation</li>
                <li className="pl-3">Exit</li>
              </ul>
            </div>

            <p className="border-t border-white/15 pt-4 text-zinc-400">
              Use <span className="text-zinc-100">↑/↓</span> to navigate{" "}
              <span className="text-zinc-100">• Enter</span> to select{" "}
              <span className="text-zinc-100">• Ctrl+C</span> to exit
            </p>
          </div>
        </TerminalWindow>
      </div> */}
    </section>
  );
}
