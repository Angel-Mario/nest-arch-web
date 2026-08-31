"use client";

import * as React from "react";

import { MAX_ZOOM, MIN_ZOOM, ZOOM_STEP } from "./constants";

export function useLightbox(imagesLength: number, initialIndex: number) {
  const [current, setCurrent] = React.useState(initialIndex);
  const [zoom, setZoom] = React.useState(MIN_ZOOM);

  const reset = React.useCallback(() => setZoom(MIN_ZOOM), []);

  const prev = React.useCallback(() => {
    setCurrent((c) => (c - 1 + imagesLength) % imagesLength);
    reset();
  }, [imagesLength, reset]);

  const next = React.useCallback(() => {
    setCurrent((c) => (c + 1) % imagesLength);
    reset();
  }, [imagesLength, reset]);

  const zoomIn = React.useCallback(() => {
    setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const zoomOut = React.useCallback(() => {
    setZoom((z) => Math.max(z - ZOOM_STEP, MIN_ZOOM));
  }, []);

  const goTo = React.useCallback(
    (index: number) => {
      setCurrent(index);
      reset();
    },
    [reset],
  );

  return {
    current,
    zoom,
    isZoomed: zoom > MIN_ZOOM,
    prev,
    next,
    zoomIn,
    zoomOut,
    goTo,
    setZoom,
  };
}
