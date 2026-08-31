"use client";

import { Badge } from "@nest-arch-web/ui/components/badge";
import { Check } from "lucide-react";
import * as React from "react";

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

export function WorkflowGallery() {
  const [activeGalleryTab, setActiveGalleryTab] = React.useState(0);

  return (
    <section id="cli" className="space-y-8">
      <div className="mx-auto max-w-3xl space-y-3 text-center">
        <p className="font-mono text-xs font-medium tracking-[0.18em] text-red-400 uppercase">
          The workflow
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          A generator you can inspect as it works.
        </h2>
        <p className="text-sm font-mono text-zinc-400">
          Each stage stays explicit, so configuration never feels like a black
          box.
        </p>
      </div>

      <div className="border border-border bg-card p-4 sm:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2 border-b border-white/10 pb-6">
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

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="flex justify-center lg:col-span-7">
            <div className="group relative w-full overflow-hidden rounded-xl border border-white/15 bg-black p-2 shadow-2xl">
              <img
                src={GALLERY_SCREENSHOTS[activeGalleryTab].src}
                alt={GALLERY_SCREENSHOTS[activeGalleryTab].title}
                className="h-auto w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4 lg:col-span-5">
            <Badge variant="secondary" className="w-fit font-mono">
              {GALLERY_SCREENSHOTS[activeGalleryTab].tag}
            </Badge>
            <h3 className="font-mono text-2xl font-bold text-white">
              {GALLERY_SCREENSHOTS[activeGalleryTab].title}
            </h3>
            <p className="font-mono text-sm leading-relaxed text-zinc-400">
              {GALLERY_SCREENSHOTS[activeGalleryTab].desc}
            </p>

            <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-mono text-zinc-500">
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
  );
}
