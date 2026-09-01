"use client";

import { ZoomIn, ZoomOut, X } from "lucide-react";

import { MAX_ZOOM } from "./constants";

interface ZoomControlsProps {
  zoom: number;
  isZoomed: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onClose: () => void;
}

export const ZoomControls = ({
  zoom,
  isZoomed,
  onZoomIn,
  onZoomOut,
  onClose,
}: ZoomControlsProps) => (
  <div
    className="absolute top-4 right-4 z-10 flex items-center gap-2"
    onClick={(e) => e.stopPropagation()}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.stopPropagation();
      }
    }}
    role="presentation"
  >
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onZoomOut();
      }}
      disabled={!isZoomed}
      aria-label="Zoom out"
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-30"
    >
      <ZoomOut className="size-4" />
    </button>
    <span className="flex min-w-[3ch] items-center justify-center rounded-full border border-white/10 bg-black/60 px-2 py-1 text-center font-mono text-xs text-white/70 backdrop-blur-sm">
      {zoom.toFixed(1)}x
    </span>
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onZoomIn();
      }}
      disabled={zoom >= MAX_ZOOM}
      aria-label="Zoom in"
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-30"
    >
      <ZoomIn className="size-4" />
    </button>
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      aria-label="Close lightbox"
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
    >
      <X className="size-4" />
    </button>
  </div>
);

interface CounterProps {
  current: number;
  total: number;
}

export const Counter = ({ current, total }: CounterProps) => (
  <span
    className="absolute top-4 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-xs text-white/70 backdrop-blur-sm sm:left-1/2 sm:-translate-x-1/2"
    onClick={(e) => e.stopPropagation()}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.stopPropagation();
      }
    }}
    role="presentation"
  >
    {current + 1} / {total}
  </span>
);
