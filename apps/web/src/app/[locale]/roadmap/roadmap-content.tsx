"use client";

import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { useUi } from "@/components/locale-provider";

const ROADMAP_ICONS = [Sparkles, Clock, AlertTriangle];

const statusRow = (
  icon: React.ElementType,
  label: string,
  className: string
) => {
  const Icon = icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium ${className}`}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );
};

export const RoadmapContent = () => {
  const { t, locale } = useUi();

  return (
    <div className="bg-background text-foreground min-h-screen overflow-hidden selection:bg-red-500/30 selection:text-red-100">
      <main className="mx-auto max-w-7xl space-y-12 px-4 pt-6 pb-24 sm:px-6 lg:px-8 lg:pt-10">
        <Link
          href={`/${locale}` as Route}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 font-mono text-xs transition-colors"
        >
          <ArrowUpRight className="size-4" aria-hidden="true" />
          {t.roadmap.backToHome}
        </Link>

        <div className="max-w-2xl space-y-3">
          <p className="font-mono text-xs font-medium tracking-[0.18em] text-red-400 uppercase">
            {t.roadmap.sectionLabel}
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            {t.roadmap.heading}
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t.roadmap.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.roadmap.groups.map((group, groupIndex) => {
            const GroupIcon = ROADMAP_ICONS[groupIndex] ?? Sparkles;
            const ACCENT_CLASSES: Record<number, string> = {
              0: "border-red-500/40 text-red-500",
              1: "border-amber-500/40 text-amber-500",
              2: "border-rose-500/40 text-rose-500",
            };
            const accent = ACCENT_CLASSES[groupIndex] ?? ACCENT_CLASSES[2];

            return (
              <section
                key={group.title}
                className="border-border bg-muted/20 rounded-2xl border p-6"
                aria-label={group.title}
              >
                <header className="mb-6 flex items-center gap-3">
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${accent} bg-background`}
                  >
                    <GroupIcon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-foreground font-mono text-sm font-semibold">
                      {group.title}
                    </h2>
                    <p className="text-muted-foreground text-xs">
                      {group.subtitle}
                    </p>
                  </div>
                </header>

                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item.title}
                      className="border-border bg-background rounded-xl border p-4 transition-colors hover:border-red-500/30"
                    >
                      {(() => {
                        if (group.title === t.roadmap.groups[2]?.title) {
                          return statusRow(
                            AlertTriangle,
                            t.roadmap.status.notReady,
                            "border-rose-500/40 bg-rose-500/10 text-rose-500"
                          );
                        }

                        if (group.title === t.roadmap.groups[1]?.title) {
                          return statusRow(
                            Clock,
                            t.roadmap.status.waiting,
                            "border-amber-500/40 bg-amber-500/10 text-amber-500"
                          );
                        }

                        return statusRow(
                          CheckCircle2,
                          t.roadmap.status.planned,
                          "border-red-500/40 bg-red-500/10 text-red-500"
                        );
                      })()}
                      <div className="mt-2.5">
                        <h3 className="text-foreground font-mono text-sm font-semibold">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
};
