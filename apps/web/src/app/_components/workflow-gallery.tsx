"use client";

import { cn } from "@nest-arch-web/ui/lib/utils";
import { Check, ChevronRight, Expand, Terminal } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { useUi } from "@/components/locale-provider";

import { Lightbox } from "./lightbox";
import type { LightboxItem } from "./lightbox/types";

const GALLERY_IMAGES = [
  { src: "/projects/nest-arch/main-menu.png" },
  { src: "/projects/nest-arch/step-14-example.png" },
  { src: "/projects/nest-arch/summary.png" },
  { src: "/projects/nest-arch/generating-in-progress.png" },
  { src: "/projects/nest-arch/project-generated.png" },
] as const satisfies readonly { src: string }[];

export const WorkflowGallery = () => {
  const { t } = useUi();
  const [activeGalleryTab, setActiveGalleryTab] = React.useState(0);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const touchStart = React.useRef<{ x: number; y: number } | null>(null);

  const handlePreviewTouchStart = (
    event: React.TouchEvent<HTMLButtonElement>
  ) => {
    const touch = event.touches.item(0);
    if (!touch) {
      return;
    }

    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handlePreviewTouchEnd = (
    event: React.TouchEvent<HTMLButtonElement>
  ) => {
    const start = touchStart.current;
    touchStart.current = null;

    const touch = event.changedTouches.item(0);
    if (!start || !touch) {
      return;
    }

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const swipeThreshold = 48;

    if (
      Math.abs(deltaX) < swipeThreshold ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return;
    }

    setActiveGalleryTab(
      (current) =>
        (current + (deltaX < 0 ? 1 : -1) + GALLERY_IMAGES.length) %
        GALLERY_IMAGES.length
    );
  };

  const activeStep = t.workflow.steps[activeGalleryTab];
  const activeImage = GALLERY_IMAGES[activeGalleryTab];

  const galleryScreenshots: LightboxItem[] = GALLERY_IMAGES.map(
    (img, index) => ({
      alt: t.workflow.steps[index]?.title ?? "",
      desc: t.workflow.steps[index]?.description ?? "",
      src: img.src,
      tag: t.workflow.steps[index]?.tag ?? "",
      title: t.workflow.steps[index]?.title ?? "",
    })
  );

  return (
    <section id="workflow" className="space-y-10">
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <p className="font-mono text-xs font-medium tracking-[0.18em] text-red-600 uppercase dark:text-red-400">
          {t.workflow.sectionLabel}
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          {t.workflow.heading}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t.workflow.description}
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Description / steps list */}
        <div className="order-1 flex flex-col gap-6 lg:sticky lg:top-24 lg:order-2 lg:col-span-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {activeStep?.tag}
              </span>
            </div>
            <h3 className="text-foreground border-l-2 border-red-500 pl-3 font-mono text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
              {activeStep?.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {activeStep?.description}
            </p>
          </div>

          <div className="border-border space-y-2.5 border-t pt-5">
            {t.workflow.highlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-red-500 dark:text-red-400" />
                <span className="text-foreground/70 dark:text-muted-foreground font-mono text-xs leading-relaxed">
                  {highlight}
                </span>
              </div>
            ))}
          </div>

          {/* Step navigation */}
          <nav
            className="relative flex flex-col gap-1"
            aria-label="Workflow steps"
          >
            <span
              className="bg-border pointer-events-none absolute top-6 bottom-6 left-6 w-px"
              aria-hidden="true"
            />
            {t.workflow.steps.map((step, idx) => (
              <button
                key={step.title}
                onClick={() => setActiveGalleryTab(idx)}
                type="button"
                aria-current={activeGalleryTab === idx ? "step" : undefined}
                className={cn(
                  "group focus-visible:outline-ring relative flex min-h-12 cursor-pointer items-center gap-3.5 rounded-xl px-2 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                  activeGalleryTab === idx
                    ? "bg-primary/5"
                    : "hover:bg-muted/40"
                )}
              >
                <span
                  className={cn(
                    "bg-background relative flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] font-medium tabular-nums transition-colors",
                    activeGalleryTab === idx
                      ? "border-primary/40 text-primary"
                      : "border-border text-muted-foreground group-hover:border-foreground/25 group-hover:text-foreground"
                  )}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    activeGalleryTab === idx
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  {step.title}
                </span>
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    "ml-auto size-4 shrink-0 transition-all",
                    activeGalleryTab === idx
                      ? "text-primary translate-x-0 opacity-100"
                      : "text-muted-foreground -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                  )}
                />
              </button>
            ))}
          </nav>
        </div>

        {/* Screenshot */}
        <div className="order-2 lg:order-1 lg:col-span-7">
          <div className="border-border bg-background overflow-hidden rounded-xl border shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
            {/* Terminal title bar */}
            <div className="border-border bg-muted/60 flex items-center gap-2 border-b px-4 py-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-muted-foreground ml-2 flex items-center gap-1.5 font-mono text-[11px]">
                <Terminal className="h-3.5 w-3.5 text-red-500 dark:text-red-400" />
                {activeStep?.tag}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex(activeGalleryTab)}
              onTouchStart={handlePreviewTouchStart}
              onTouchEnd={handlePreviewTouchEnd}
              onTouchCancel={() => {
                touchStart.current = null;
              }}
              aria-label={`Expand: ${activeStep?.title}`}
              className="group relative block w-full cursor-zoom-in touch-pan-y"
            >
              <Image
                src={activeImage?.src ?? ""}
                alt={activeStep?.title ?? ""}
                width={1400}
                height={1400}
                className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              {/* Expand hint overlay */}
              <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-md bg-black/65 px-2 py-1 font-mono text-[10px] text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                <Expand className="size-3" />
                {t.workflow.expand}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryScreenshots}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
};
