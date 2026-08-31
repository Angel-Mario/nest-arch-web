"use client";

import * as React from "react";

import { MAX_ZOOM, MIN_ZOOM, ZOOM_STEP } from "./constants";

interface UseLightboxKeyboardOptions {
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}

export function useLightboxKeyboard({
  onClose,
  onPrev,
  onNext,
  setZoom,
}: UseLightboxKeyboardOptions) {
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "+" || e.key === "=")
        setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM));
      if (e.key === "-") setZoom((z) => Math.max(z - ZOOM_STEP, MIN_ZOOM));
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext, setZoom]);
}
