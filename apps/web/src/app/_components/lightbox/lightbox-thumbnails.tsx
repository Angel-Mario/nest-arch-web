"use client";

import Image from "next/image";

import type { LightboxItem } from "./types";

interface ThumbnailsProps {
  images: readonly LightboxItem[];
  current: number;
  onSelect: (index: number) => void;
}

export function Thumbnails({ images, current, onSelect }: ThumbnailsProps) {
  return (
    <div
      className="absolute bottom-4 flex max-w-full gap-2 overflow-x-auto px-4"
      onClick={(e) => e.stopPropagation()}
    >
      {images.map((image, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to image ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`relative h-[38px] w-[60px] shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-all ${
            i === current
              ? "border-red-500 opacity-100"
              : "border-transparent opacity-50 hover:opacity-80"
          }`}
        >
          <Image
            src={image.src}
            alt=""
            fill
            className="object-cover"
            sizes="60px"
          />
        </button>
      ))}
    </div>
  );
}
