"use client";

import { Badge } from "@nest-arch-web/ui/components/badge";
import { CodeBlock } from "@nest-arch-web/ui/components/code-block";
import { TerminalWindow } from "@nest-arch-web/ui/components/terminal-window";
import { Terminal, Box, Layers, Puzzle, Server, Check } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { ArchitectureInteractive } from "@/components/architecture-interactive";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const GALLERY_SCREENSHOTS = [
  {
    desc: "Start from a clear menu instead of a wall of flags. The wizard keeps the available paths visible from the first prompt.",
    src: "/projects/nest-arch/main-menu.png",
    tag: "00 / Entry point",
    title: "Choose a starting point",
  },
  {
    desc: "Select project type, package manager, data layer, transport and add-ons in a deliberate sequence.",
    src: "/projects/nest-arch/step-14-example.png",
    tag: "14 / Configuration",
    title: "Configure the stack",
  },
  {
    desc: "Follow the generator as templates resolve and the project tree is created, without leaving the terminal.",
    src: "/projects/nest-arch/generating-in-progress.png",
    tag: "Generate / Progress",
    title: "See what is being created",
  },
  {
    desc: "Review architecture, dependencies and selected options before files are written to disk.",
    src: "/projects/nest-arch/summary.png",
    tag: "Review / Summary",
    title: "Confirm before writing",
  },
  {
    desc: "Finish with a usable project structure, git initialization and the tooling selected in the wizard.",
    src: "/projects/nest-arch/project-generated.png",
    tag: "Done / Output",
    title: "Leave with a real project",
  },
] as const;

export default function Home() {
  const [activeGalleryTab, setActiveGalleryTab] = React.useState(0);

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-red-500/30 selection:text-red-100">
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8 lg:pt-16 space-y-28">
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <Badge
              variant="outline"
              className="gap-2 rounded-sm border-red-500/35 bg-red-500/5 px-2.5 font-mono text-[11px] font-medium tracking-wide text-red-300"
            >
              <span className="size-1.5 rounded-full bg-red-400" />
              <span>v0.2.2 is available</span>
            </Badge>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl leading-[0.98]">
              A NestJS foundation that starts with your architecture.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Choose the runtime, data layer and project shape in an interactive
              terminal flow. Nest Arch generates the starting point; you keep
              the decisions.
            </p>

            {/* CTA Command & Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-xl">
              <CodeBlock
                code="npx @nest-arch/tui@latest"
                prefix=">_"
                className="flex-1"
              />
              <Link
                href="https://www.npmjs.com/package/@nest-arch/tui"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-md border border-border bg-muted/40 px-4 py-2.5 font-mono text-sm font-medium text-foreground transition-colors hover:border-red-500/50 hover:bg-red-500/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/npm-wordmark.svg"
                  alt="npm"
                  className="h-4 w-auto"
                />
                <span>NPM Package</span>
              </Link>
            </div>

            {/* Tech Badges Row */}
            <div className="flex w-full flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-2 hover:text-red-400 transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/typescript.svg"
                  alt="TypeScript"
                  className="h-4 w-4"
                />
                <span>TypeScript</span>
              </div>
              <div className="flex items-center gap-2 hover:text-red-400 transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/nestjs.svg" alt="NestJS" className="h-4 w-4" />
                <span>NestJS</span>
              </div>
              <div className="flex items-center gap-2 hover:text-red-400 transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/turborepo-icon-dark.svg"
                  alt="Turborepo"
                  className="h-4 w-4"
                />
                <span>Turborepo</span>
              </div>
              <div className="flex items-center gap-2 hover:text-red-400 transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/docker.svg" alt="Docker" className="h-4 w-4" />
                <span>Docker</span>
              </div>
              <div className="flex items-center gap-2 hover:text-red-400 transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/zod.svg" alt="Zod" className="h-4 w-4" />
                <span>Zod</span>
              </div>
            </div>
          </div>

          {/* Hero Right Interactive Terminal Window */}
          <div className="lg:col-span-5">
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
                    Let's build something amazing.
                  </p>
                  <p className="mt-6 text-zinc-400">
                    What would you like to do?
                  </p>
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
          </div>
        </section>

        {/* TUI GALLERY SHOWCASE SECTION */}
        <section id="cli" className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p className="font-mono text-xs font-medium tracking-[0.18em] text-red-400 uppercase">
              The workflow
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              A generator you can inspect as it works.
            </h2>
            <p className="text-sm font-mono text-zinc-400">
              Each stage stays explicit, so configuration never feels like a
              black box.
            </p>
          </div>

          <div className="border border-border bg-card p-4 sm:p-8">
            {/* Gallery Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/10 pb-6 mb-8">
              {GALLERY_SCREENSHOTS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryTab(idx)}
                  type="button"
                  className={`rounded-sm border px-3 py-2 text-xs font-mono font-medium transition-colors ${
                    activeGalleryTab === idx
                      ? "border-red-500/50 bg-red-500/10 text-foreground"
                      : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Active Screenshot Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex justify-center">
                <div className="relative overflow-hidden rounded-xl border border-white/15 bg-black p-2 shadow-2xl group w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={GALLERY_SCREENSHOTS[activeGalleryTab].src}
                    alt={GALLERY_SCREENSHOTS[activeGalleryTab].title}
                    className="w-full h-auto rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                <Badge variant="secondary" className="w-fit font-mono">
                  {GALLERY_SCREENSHOTS[activeGalleryTab].tag}
                </Badge>
                <h3 className="text-2xl font-bold text-white font-mono">
                  {GALLERY_SCREENSHOTS[activeGalleryTab].title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                  {GALLERY_SCREENSHOTS[activeGalleryTab].desc}
                </p>

                <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sky-400" />
                    <span>
                      Pure terminal interface with zero heavy dependencies
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sky-400" />
                    <span>Instant input validation & condition checks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID ("WHY NEST ARCH?") */}
        <section id="features" className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-xs font-medium tracking-[0.18em] text-red-400 uppercase">
              Designed around choices
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              The pieces that shape a real project.
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Start with the decisions that are difficult to retrofit later, not
              a generic starter and a long cleanup.
            </p>
          </div>

          <div className="grid grid-cols-1 border-y border-border sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                desc: "Guided, intuitive, and beautiful terminal experience with smart prompts.",
                icon: Terminal,
                title: "A guided CLI",
              },
              {
                desc: "Handlebars templates with smart resolution and dynamic scaffolding options.",
                icon: Box,
                title: "Composable templates",
              },
              {
                desc: "ORMs, auth, Docker, testing, linting, and modern tooling out of the box.",
                icon: Server,
                title: "Production defaults",
              },
              {
                desc: "TurboRepo powered workspaces for scalable architectures and shared packages.",
                icon: Layers,
                title: "Monorepo-ready",
              },
              {
                desc: "Pluggable engine, custom templates, and limitless architecture possibilities.",
                icon: Puzzle,
                title: "Room to adapt",
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group flex min-h-56 flex-col justify-between border-border p-6 transition-colors hover:bg-muted/35 sm:border-r lg:last:border-r-0"
                >
                  <div className="flex size-10 items-center justify-center border border-border bg-background text-red-400 transition-colors group-hover:border-red-500/50 group-hover:bg-red-500/10">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-mono text-sm font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* INTERACTIVE ARCHITECTURE SECTION */}
        <section id="architecture" className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="font-mono text-xs font-medium tracking-[0.18em] text-red-400 uppercase">
              Project map
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              One starting point. Several deliberate paths.
            </h2>
          </div>

          <ArchitectureInteractive />
        </section>

        <section className="grid border-y border-border md:grid-cols-3">
          {[
            [
              "Runtime",
              "NestJS with Express or Fastify, selected before the first file is generated.",
            ],
            [
              "Data layer",
              "Prisma, TypeORM or Drizzle with the project structure prepared for it.",
            ],
            [
              "Tooling",
              "Linting, tests, Docker and workspace conventions added only when you choose them.",
            ],
          ].map(([label, description]) => (
            <div
              key={label}
              className="border-border px-0 py-7 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0"
            >
              <p className="font-mono text-xs font-medium text-red-400">
                {label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </section>

        {/* READY TO BUILD CTA BANNER */}
        <section
          id="get-started"
          className="flex flex-col items-center justify-between gap-8 border-y border-red-500/30 bg-red-500/5 px-6 py-10 md:flex-row md:px-10"
        >
          <div className="space-y-2 text-center md:text-left">
            <p className="font-mono text-xs font-bold text-red-400 uppercase tracking-wider">
              Start here
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
              Generate a project you will recognize tomorrow.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <Link
              href="https://www.npmjs.com/package/@nest-arch/tui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-red-500 px-5 py-3 font-mono text-sm font-semibold text-white transition-colors hover:bg-red-600 sm:w-auto"
            >
              <span>&gt;_ Get Started Now</span>
            </Link>

            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-3 font-mono text-sm font-medium text-foreground transition-colors hover:border-red-500/50 sm:w-auto"
            >
              <GithubIcon className="h-4 w-4" />
              <span>Star on GitHub</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
