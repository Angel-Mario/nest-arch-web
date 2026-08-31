"use client";

import Image from "next/image";
import * as React from "react";

import { Counter, ZoomControls } from "./lightbox-controls";
import { Thumbnails } from "./lightbox-thumbnails";
import { NavArrows } from "./nav-arrows";
import type { LightboxProps } from "./types";
import { useLightbox } from "./use-lightbox";
import { useLightboxKeyboard } from "./use-lightbox-keyboard";
import { useScrollLock } from "./use-scroll-lock";

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const { current, zoom, isZoomed, prev, next, zoomIn, zoomOut, goTo, setZoom } =
    useLightbox(images.length, initialIndex);

  useLightboxKeyboard({ onClose, onPrev: prev, onNext: next, setZoom });
  useScrollLock();

  const img = images[current];

  return (
    <div
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden bg-black/92"
      style={{ backdropFilter: "blur(8px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={img.title}
    >
      <ZoomControls
        zoom={zoom}
        isZoomed={isZoomed}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onClose={onClose}
      />
      <Counter current={current} total={images.length} />

      {/* Image + nav */}
      <div className="relative flex h-full w-full flex-col items-center justify-center px-10 py-20 sm:px-14">
        <div
          className={`relative flex items-center justify-center transition-all duration-300 ${
            isZoomed ? "h-full w-full" : "max-w-5xl"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!isZoomed) zoomIn();
          }}
        >
          <NavArrows total={images.length} isZoomed={isZoomed} onPrev={prev} onNext={next} />
          <div
            className={`relative select-none transition-transform duration-300 ${
              isZoomed ? "max-h-[85vh] max-w-[95vw]" : "cursor-zoom-in"
            }`}
            style={{ transform: `scale(${zoom})` }}
          >
            <Image
              key={current}
              src={img.src}
              alt={img.title}
              width={1400}
              height={1400}
              className="mx-auto h-auto max-h-[75vh] w-auto max-w-full rounded-xl border border-white/10 object-contain shadow-2xl md:max-h-[80vh]"
              sizes="90vw"
              priority
            />
          </div>
        </div>

        {/* Description */}
        {!isZoomed && (
          <p className="mt-6 max-w-2xl px-4 text-center font-mono text-sm leading-relaxed text-white/70">
            {img.desc}
          </p>
        )}
      </div>

      <Thumbnails images={images} current={current} onSelect={goTo} />
    </div>
  );
}
