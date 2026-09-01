"use client";

import { Check, ChevronRight, Expand, Terminal } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { Lightbox } from "./lightbox";
import type { LightboxItem } from "./lightbox/types";

const GALLERY_SCREENSHOTS = [
  {
    desc: "Start from a clear menu instead of a wall of flags. The wizard keeps the available paths visible from the first prompt.",
    src: "/projects/nest-arch/main-menu.png",
    tag: "01 / Start",
    title: "Choose a starting point",
  },
  {
    desc: "Select project type, package manager, data layer, transport and add-ons in a deliberate sequence.",
    src: "/projects/nest-arch/step-14-example.png",
    tag: "02 / Configure",
    title: "Configure the stack",
  },
  {
    desc: "Review architecture, dependencies and selected options before files are written to disk.",
    src: "/projects/nest-arch/summary.png",
    tag: "03 / Confirm",
    title: "Confirm before writing",
  },
  {
    desc: "Follow the generator as templates resolve and the project tree is created, without leaving the terminal.",
    src: "/projects/nest-arch/generating-in-progress.png",
    tag: "04 / Generate",
    title: "See what is being created",
  },
  {
    desc: "Finish with a usable project structure, git initialization and the tooling selected in the wizard.",
    src: "/projects/nest-arch/project-generated.png",
    tag: "05 / Done",
    title: "Leave with a real project",
  },
] as const satisfies readonly LightboxItem[];

const HIGHLIGHTS = [
  "Pure terminal interface with zero heavy dependencies",
  "Instant input validation & condition checks",
] as const;

export const WorkflowGallery = () => {
  const [activeGalleryTab, setActiveGalleryTab] = React.useState(0);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const active = GALLERY_SCREENSHOTS[activeGalleryTab];

  return (
    <section id="workflow" className="space-y-10">
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <p className="font-mono text-xs font-medium tracking-[0.18em] text-red-600 uppercase dark:text-red-400">
          The workflow
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          A generator you can inspect as it works.
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Each stage stays explicit, so configuration never feels like a black
          box.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Description / steps list */}
        <div className="order-1 flex flex-col gap-6 lg:sticky lg:top-24 lg:order-2 lg:col-span-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {active.tag}
              </span>
            </div>
            <h3 className="text-foreground border-l-2 border-red-500 pl-3 font-mono text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
              {active.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {active.desc}
            </p>
          </div>

          <div className="border-border space-y-2.5 border-t pt-5">
            {HIGHLIGHTS.map((highlight) => (
              <div key={highlight} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-red-500 dark:text-red-400" />
                <span className="text-foreground/70 dark:text-muted-foreground font-mono text-xs leading-relaxed">
                  {highlight}
                </span>
              </div>
            ))}
          </div>

          {/* Step navigation */}
          <nav className="flex flex-col gap-1" aria-label="Workflow steps">
            {GALLERY_SCREENSHOTS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveGalleryTab(idx)}
                type="button"
                aria-current={activeGalleryTab === idx ? "step" : undefined}
                className={`group flex items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors ${
                  activeGalleryTab === idx
                    ? "border-red-500/40 bg-red-500/10"
                    : "hover:border-border hover:bg-muted/40 cursor-pointer border-transparent"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center font-mono text-[10px] font-bold transition-colors ${
                    activeGalleryTab === idx
                      ? "bg-red-500 text-white"
                      : "bg-zinc-200 text-zinc-500 group-hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-500 dark:group-hover:bg-zinc-700"
                  }`}
                >
                  {idx + 1}
                </span>
                <span
                  className={`font-mono text-xs font-medium transition-colors ${
                    activeGalleryTab === idx
                      ? "text-red-600 dark:text-red-300"
                      : "text-foreground/70 group-hover:text-foreground dark:text-muted-foreground dark:group-hover:text-foreground"
                  }`}
                >
                  {item.title}
                </span>
                <ChevronRight
                  className={`ml-auto h-4 w-4 transition-all ${
                    activeGalleryTab === idx
                      ? "translate-x-0 text-red-500 opacity-100"
                      : "-translate-x-1 text-zinc-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                  }`}
                />
              </button>
            ))}
          </nav>
        </div>

        {/* Screenshot */}
        <div className="order-2 lg:order-1 lg:col-span-7">
          <div className="border-border bg-background overflow-hidden rounded-xl border shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
            {/* Terminal title bar */}
            <div className="border-border bg-muted/60 flex items-center gap-2 border-b px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-muted-foreground ml-2 flex items-center gap-1.5 font-mono text-[11px]">
                <Terminal className="h-3.5 w-3.5 text-red-500 dark:text-red-400" />
                {active.tag}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex(activeGalleryTab)}
              aria-label={`Expand: ${active.title}`}
              className="group relative block w-full cursor-zoom-in"
            >
              <Image
                src={active.src}
                alt={active.title}
                width={1400}
                height={1400}
                className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              {/* Expand hint overlay */}
              <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-md bg-black/65 px-2 py-1 font-mono text-[10px] text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                <Expand className="size-3" />
                expand
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY_SCREENSHOTS}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
};
