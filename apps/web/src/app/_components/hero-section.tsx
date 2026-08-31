import { Badge } from "@nest-arch-web/ui/components/badge";
import { CodeBlock } from "@nest-arch-web/ui/components/code-block";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { InteractiveTerminalWizard } from "./interactive-terminal-wizard";

export function HeroSection() {
  return (
    <section
      className="relative isolate grid grid-cols-1 items-start gap-10 pt-2 pb-6 lg:grid-cols-12 lg:gap-8 lg:pt-4 lg:pb-10"
      id="home"
    >
      <div className="pointer-events-none absolute -inset-x-24 -top-24 -bottom-24 -z-10 bg-[radial-gradient(ellipse_at_14%_40%,rgba(220,38,38,0.16),transparent_50%),radial-gradient(ellipse_at_84%_46%,rgba(220,38,38,0.08),transparent_46%)]" />
      <div className="flex flex-col items-start lg:col-span-5 xl:col-span-5">
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
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.06em] text-balance leading-[0.96] sm:text-5xl lg:text-6xl">
          Build the NestJS project you actually meant to build.
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          A guided terminal flow for choosing the runtime, data layer and
          tooling before your first file exists. Clear decisions in, a
          production-ready foundation out.
        </p>
        <div className="mt-7 flex w-full max-w-xl flex-col gap-3">
          <CodeBlock
            code="npx @nest-arch/tui@latest"
            prefix="$"
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
        <Link
          href="#cli"
          className="mt-6 inline-flex items-center gap-2 border-b border-red-500/50 pb-1 font-mono text-sm font-medium text-foreground transition-colors hover:border-red-400 hover:text-red-400"
        >
          Explore the workflow <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="relative w-full lg:col-span-7 xl:col-span-7">
        <InteractiveTerminalWizard />
      </div>
    </section>
  );
}
