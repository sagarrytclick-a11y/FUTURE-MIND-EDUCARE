import React from "react";

export const FALLBACK_IMAGE = "/placeholder-college.png";

/**
 * Swaps a failed remote image for the local branded placeholder so cards never
 * render an empty white block. Guarded so it cannot loop.
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>
) {
  const target = e.currentTarget;
  if (target.src.endsWith(FALLBACK_IMAGE)) return;
  target.src = FALLBACK_IMAGE;
}
