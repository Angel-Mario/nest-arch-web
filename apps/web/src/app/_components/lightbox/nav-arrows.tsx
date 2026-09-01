"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavArrowsProps {
  total: number;
  isZoomed: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const NavArrows = ({
  total,
  isZoomed,
  onPrev,
  onNext,
}: NavArrowsProps) => {
  if (total <= 1 || isZoomed) {
    return null;
  }

  const buttonClass =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80";

  return (
    <>
      <button
        type="button"
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className={`${buttonClass} -left-7 sm:-left-10`}
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className={`${buttonClass} -right-7 sm:-right-10`}
      >
        <ChevronRight className="size-5" />
      </button>
    </>
  );
};
