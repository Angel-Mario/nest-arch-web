"use client";

import { Box, Layers, Puzzle, Server, Terminal } from "lucide-react";

import { useUi } from "@/components/locale-provider";

const FEATURE_ICONS = [Terminal, Box, Server, Layers, Puzzle];

export const FeaturesGrid = () => {
  const { t } = useUi();

  return (
    <section id="features" className="space-y-10">
      <div className="max-w-2xl space-y-3">
        <p className="font-mono text-xs font-medium tracking-[0.18em] text-red-400 uppercase">
          {t.features.sectionLabel}
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          {t.features.heading}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t.features.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {t.features.items.map((feature, index) => {
          const Icon = FEATURE_ICONS[index] ?? Terminal;

          return (
            <div
              key={feature.title}
              className="group border-border bg-muted/20 hover:bg-muted/40 relative flex min-h-48 flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="border-border bg-background relative flex size-9 items-center justify-center rounded-xl border text-red-400 transition-colors duration-300 group-hover:border-red-500/50 group-hover:bg-red-500/10 group-hover:text-red-500">
                <Icon className="size-4" />
              </div>

              <div className="relative mt-4">
                <h3 className="text-foreground mb-2 font-mono text-sm font-semibold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
