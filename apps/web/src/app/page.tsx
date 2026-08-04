"use client";

import { Badge } from "@nest-arch-web/ui/components/badge";
import { CodeBlock } from "@nest-arch-web/ui/components/code-block";
import { TerminalWindow } from "@nest-arch-web/ui/components/terminal-window";
import {
  Terminal,
  Zap,
  Box,
  Layers,
  Puzzle,
  Quote,
  Code2,
  Server,
  Infinity as InfinityIcon,
  Check,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { ArchitectureInteractive } from "@/components/architecture-interactive";

function GithubIcon({ className }: { className?: string }) {
  return (
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
}

export default function Home() {
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = [
    {
      desc: "Select from production-ready fullstack templates.",
      label: "Starter templates",
    },
    {
      desc: "Access comprehensive docs and architecture guides.",
      label: "Documentation",
    },
    { desc: "Close interactive CLI menu.", label: "Exit" },
  ];

  return (
    <div className="relative min-h-screen bg-[#090a0f] text-zinc-100 selection:bg-rose-500/30 selection:text-rose-200 overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-full max-w-7xl -translate-x-1/2 bg-gradient-to-b from-rose-500/10 via-purple-600/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-pink-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-0 top-2/3 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-24 space-y-28">
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <Badge variant="glow">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-pulse" />
              <span>IN DEVELOPMENT</span>
              <span className="text-zinc-500">|</span>
              <span className="text-pink-300">v0.2.2</span>
            </Badge>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Scaffold smarter. <br />
              Ship{" "}
              <span className="bg-gradient-to-r from-rose-500 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                faster.
              </span>
              <span className="inline-block w-2.5 h-10 ml-2 bg-pink-500 align-middle animate-cursor" />
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-mono">
              Nest Arch is a powerful CLI and interactive TUI generator for
              building opinionated, production-ready{" "}
              <span className="text-rose-400 font-semibold">NestJS</span>{" "}
              applications and microservices — the right way, from the very
              first command.
            </p>

            {/* CTA Command & Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-lg">
              <CodeBlock
                code="npx nest-arch@latest"
                prefix=">_"
                className="flex-1"
              />
              <Link
                href="https://github.com"
                target="_blank"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 font-mono text-sm font-medium text-zinc-200 transition-all hover:bg-white/10 hover:border-white/25 hover:text-white"
              >
                <GithubIcon className="h-4 w-4" />
                <span>View on GitHub</span>
              </Link>
            </div>

            {/* Tech Badges Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 text-xs font-mono text-zinc-400 border-t border-white/10 w-full">
              <div className="flex items-center gap-2 hover:text-rose-400 transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/typescript.svg"
                  alt="TypeScript"
                  className="h-4 w-4"
                />
                <span>TypeScript</span>
              </div>
              <div className="flex items-center gap-2 hover:text-rose-400 transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/nestjs.svg" alt="NestJS" className="h-4 w-4" />
                <span>NestJS</span>
              </div>
              <div className="flex items-center gap-2 hover:text-rose-400 transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/turborepo-icon-dark.svg"
                  alt="Turborepo"
                  className="h-4 w-4"
                />
                <span>Turborepo</span>
              </div>
              <div className="flex items-center gap-2 hover:text-rose-400 transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/docker.svg" alt="Docker" className="h-4 w-4" />
                <span>Docker</span>
              </div>
              <div className="flex items-center gap-2 hover:text-rose-400 transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/zod.svg" alt="Zod" className="h-4 w-4" />
                <span>Zod</span>
              </div>
            </div>
          </div>

          {/* Hero Right Interactive Terminal Window */}
          <div className="lg:col-span-5">
            <TerminalWindow title="nest-arch v0.2.2">
              <div className="space-y-4">
                {/* ASCII Art */}
                <pre className="text-[10px] sm:text-xs leading-none font-bold text-rose-500/90 selection:bg-none overflow-x-auto">
                  {`  _  _ ___ ___ _____   _   ___  ___ _  _ 
 | \\| | __/ __|_   _| /_\\ | _ \\/ __| || |
 | .\` | _|\\__ \\ | |  / _ \\|   / (__| __ |
 |_|\\_|___|___/ |_| /_/ \\_\\_|_\\___|_||_|`}
                </pre>

                <div className="border-b border-white/10 pb-3 text-zinc-400">
                  <p className="text-pink-400 font-semibold">
                    &gt; Welcome to Nest Arch
                  </p>
                  <p className="text-zinc-500">
                    Let&apos;s build something amazing.
                  </p>
                </div>

                <div>
                  <p className="text-zinc-400 mb-2">
                    What would you like to do?
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-rose-400 font-semibold bg-rose-500/10 border border-rose-500/30 rounded px-2.5 py-1">
                      <span>&gt;</span>
                      <span>Create a new NestJS project</span>
                    </div>

                    {steps.map((step, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        type="button"
                        className={`w-full flex items-center justify-between text-left px-2.5 py-1 rounded transition-colors ${
                          activeStep === idx
                            ? "text-purple-300 bg-purple-500/10 font-semibold"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        <span>{step.label}</span>
                        <span className="text-[10px] text-zinc-600">
                          {step.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3 text-[11px] text-zinc-500 flex items-center justify-between">
                  <span>Use ↑/↓ to navigate</span>
                  <span className="text-rose-400 font-semibold">
                    Enter to select
                  </span>
                  <span>Ctrl+C to exit</span>
                </div>
              </div>
            </TerminalWindow>
          </div>
        </section>

        {/* FEATURES GRID ("WHY NEST ARCH?") */}
        <section id="features" className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="font-mono text-xs font-bold text-rose-400 tracking-widest uppercase">
              WHY NEST ARCH?
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Built for developers. Designed for{" "}
              <span className="bg-gradient-to-r from-rose-500 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                velocity.
              </span>
            </h2>
            <p className="text-sm font-mono text-zinc-400">
              We remove complexity from project setup so you can focus on
              building features, not boilerplate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              {
                desc: "Guided, intuitive, and beautiful terminal experience with smart prompts.",
                glow: "from-rose-500/20 to-pink-500/5",
                icon: Terminal,
                title: "Interactive TUI",
              },
              {
                desc: "Handlebars templates with smart resolution and dynamic scaffolding options.",
                glow: "from-purple-500/20 to-indigo-500/5",
                icon: Box,
                title: "Modular Engine",
              },
              {
                desc: "ORMs, auth, Docker, testing, linting, and modern tooling out of the box.",
                glow: "from-pink-500/20 to-rose-500/5",
                icon: Server,
                title: "Full-Stack Ready",
              },
              {
                desc: "TurboRepo powered workspaces for scalable architectures and shared packages.",
                glow: "from-indigo-500/20 to-purple-500/5",
                icon: Layers,
                title: "Monorepo First",
              },
              {
                desc: "Pluggable engine, custom templates, and limitless architecture possibilities.",
                glow: "from-rose-500/20 to-purple-500/5",
                icon: Puzzle,
                title: "Extensible",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="glow-card rounded-2xl p-6 flex flex-col justify-between space-y-4 group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 group-hover:border-pink-500/40 group-hover:bg-pink-500/10 transition-all">
                    <Icon className="h-6 w-6 text-rose-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-mono text-base font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="font-mono text-xs text-zinc-400 leading-relaxed">
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
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="font-mono text-xs font-bold text-purple-400 tracking-widest uppercase">
              ONE COMMAND. INFINITE POSSIBILITIES.
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              From idea to production,{" "}
              <span className="bg-gradient-to-r from-rose-500 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                effortlessly.
              </span>
            </h2>
          </div>

          <ArchitectureInteractive />
        </section>

        {/* METRICS HIGHLIGHTS ("MADE FOR PRODUCTION") */}
        <section className="rounded-2xl border border-white/10 bg-[#0c0d15]/80 p-8 sm:p-12 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <p className="font-mono text-xs font-bold text-rose-400 tracking-widest uppercase">
                MADE FOR PRODUCTION
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight">
                From day zero.
              </h2>
              <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                Every project scaffolded with Nest Arch is structured using
                industry best practices, security considerations, automated
                tests, and scalable modular architecture.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  color: "text-blue-400",
                  icon: Code2,
                  label: "TypeScript",
                  metric: "100%",
                },
                {
                  color: "text-rose-400",
                  icon: Zap,
                  label: "Boilerplate",
                  metric: "0",
                },
                {
                  color: "text-purple-400",
                  icon: InfinityIcon,
                  label: "Possibilities",
                  metric: "∞",
                },
                {
                  color: "text-emerald-400",
                  icon: Terminal,
                  label: "Command",
                  metric: "1",
                },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-5 rounded-xl border border-white/10 bg-white/5 text-center space-y-2 hover:border-pink-500/30 transition-colors"
                  >
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                    <span className="font-mono text-2xl font-bold text-white">
                      {stat.metric}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TESTIMONIAL CARD */}
        <section className="glow-card rounded-2xl p-8 sm:p-10 border border-white/10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2">
                <Quote className="h-6 w-6 text-rose-500 rotate-180" />
                <Badge variant="secondary">TRUSTED BY DEVELOPERS</Badge>
              </div>
              <p className="font-mono text-base sm:text-lg text-zinc-200 leading-relaxed italic">
                &ldquo;Nest Arch helped us standardize our architecture and ship
                features 3x faster. It&apos;s now our go-to starter for every
                new microservice.&rdquo;
              </p>
              <div>
                <p className="font-mono text-xs font-semibold text-rose-300">
                  Developer, Indie Founder
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 text-xs font-mono text-zinc-400 space-y-1">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Standardized Codebase</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Zero Tech Debt Setup</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* READY TO BUILD CTA BANNER */}
        <section
          id="get-started"
          className="rounded-2xl border border-pink-500/30 bg-gradient-to-r from-rose-950/40 via-purple-950/40 to-indigo-950/40 p-8 sm:p-12 shadow-[0_0_50px_rgba(236,72,153,0.15)] flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-2 text-center md:text-left">
            <p className="font-mono text-xs font-bold text-rose-400 uppercase tracking-wider">
              READY TO BUILD?
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Start your next idea <br className="hidden sm:inline" />
              the{" "}
              <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                right way.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <Link
              href="#get-started"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 px-6 py-3.5 font-mono text-sm font-semibold text-white shadow-[0_0_25px_rgba(236,72,153,0.5)] transition-all hover:scale-105"
            >
              <span>&gt;_ Get Started Now</span>
            </Link>

            <Link
              href="https://github.com"
              target="_blank"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-mono text-sm font-medium text-zinc-200 transition-all hover:bg-white/10 hover:border-white/25 hover:text-white"
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
