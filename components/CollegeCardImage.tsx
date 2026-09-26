"use client";

import { handleImageError } from "@/lib/img-fallback";

type CollegeCardImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

/**
 * Card image for the server-rendered `MbbsCard` section.
 *
 * Plain `<img>` with intrinsic `width`/`height` (so nothing shifts while the
 * image loads), lazy loading, and the guarded fallback that swaps a dead remote
 * URL for the local branded placeholder.
 *
 * This has to be a client component: `onError` is an event handler, and event
 * handlers cannot be passed into a server component. Keeping it in this single
 * leaf means the data-driven parent stays a server component.
 */
export default function CollegeCardImage({
  src,
  alt,
  className,
  width = 640,
  height = 400,
}: CollegeCardImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      onError={handleImageError}
      className={className}
    />
  );
}
