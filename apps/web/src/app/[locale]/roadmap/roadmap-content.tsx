"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { useUi } from "@/components/locale-provider";

export const RoadmapContent = () => {
  const { t, locale } = useUi();
  const { roadmap } = t;

  return (
    <div className="bg-background text-foreground min-h-screen overflow-hidden selection:bg-red-500/30 selection:text-red-100">
      <main className="mx-auto max-w-7xl space-y-12 px-4 pt-6 pb-24 sm:px-6 lg:px-8 lg:pt-10">
        <Link
          href={`/${locale}` as Route}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 font-mono text-xs"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {roadmap.backToHome}
        </Link>

        <div className="max-w-2xl space-y-3">
          <p className="font-mono text-xs font-medium tracking-[0.18em] text-red-400 uppercase">
            {roadmap.sectionLabel}
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            {roadmap.heading}
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {roadmap.description}
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {roadmap.milestones.map((milestone) => (
            <li key={milestone.version} className="flex">
              <section
                aria-labelledby={`release-${milestone.version}`}
                className={`bg-muted/20 w-full rounded-2xl border p-6 ${milestone.version === "1.0.0" ? "border-red-500/50" : "border-border"}`}
              >
                <header className="mb-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-3xl font-semibold tracking-tight">
                      {milestone.version}
                    </p>
                    <span className="border-border bg-background text-muted-foreground rounded-full border px-3 py-1 font-mono text-xs">
                      {milestone.status}
                    </span>
                  </div>
                  <h2
                    id={`release-${milestone.version}`}
                    className="text-xl font-semibold"
                  >
                    {milestone.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {milestone.description}
                  </p>
                </header>
                <ul className="space-y-3">
                  {milestone.items.map((item) => (
                    <li
                      key={item.title}
                      className="border-border bg-background rounded-xl border p-4"
                    >
                      <h3 className="font-mono text-sm font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
                {milestone.exploration ? (
                  <div className="border-border mt-6 border-t border-dashed pt-4">
                    <h3 className="text-muted-foreground font-mono text-xs font-semibold uppercase">
                      {milestone.exploration.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {milestone.exploration.description}
                    </p>
                  </div>
                ) : null}
              </section>
            </li>
          ))}
        </ol>

        <section aria-labelledby="community-heading" className="space-y-5">
          <h2 id="community-heading" className="text-xl font-semibold">
            {roadmap.community.heading}
          </h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {roadmap.community.items.map((item) => (
              <li key={item.title} className="border-border border-t pt-4">
                <span className="text-muted-foreground font-mono text-xs">
                  {item.status}
                </span>
                <h3 className="mt-2 text-sm font-semibold">
                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("https://") ? "_blank" : undefined
                      }
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 underline underline-offset-4"
                    >
                      {item.title}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};
