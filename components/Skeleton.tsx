"use client";

import React from "react";

type Tone = "light" | "dark";

type BlockProps = {
  className?: string;
  style?: React.CSSProperties;
  tone?: Tone;
};

function toneClass(tone: Tone = "light") {
  return tone === "dark" ? "skeleton-dark" : "skeleton";
}

export function Skeleton({ className = "", style, tone = "light" }: BlockProps) {
  return (
    <div
      aria-hidden="true"
      className={`${toneClass(tone)} ${className}`}
      style={style}
    />
  );
}

export function SkeletonLine({
  width = "100%",
  height = "0.875rem",
  className = "",
  tone = "light",
}: BlockProps & { width?: string; height?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`${toneClass(tone)} ${className}`}
      style={{ width, height, borderRadius: "0.375rem" }}
    />
  );
}

export function SkeletonText({
  lines = 3,
  width = "100%",
  className = "",
  gap = "0.6rem",
  tone = "light",
}: BlockProps & { lines?: number; width?: string; gap?: string }) {
  return (
    <div className={`flex flex-col ${className}`} style={{ gap }} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine
          key={i}
          tone={tone}
          width={i === lines - 1 && lines > 1 ? "62%" : width}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({
  className = "",
  tone = "light",
  withImage = true,
}: BlockProps & { withImage?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden rounded-xl border border-gray-100 bg-white p-4 ${className}`}
    >
      {withImage && (
        <Skeleton tone={tone} className="mb-4 h-40 w-full" style={{ borderRadius: "0.75rem" }} />
      )}
      <SkeletonLine width="72%" height="1.05rem" />
      <div className="mt-3">
        <SkeletonText lines={2} />
      </div>
      <div className="mt-4 flex gap-2">
        <Skeleton tone={tone} className="h-6 w-20" style={{ borderRadius: "9999px" }} />
        <Skeleton tone={tone} className="h-6 w-24" style={{ borderRadius: "9999px" }} />
      </div>
    </div>
  );
}

export function SkeletonGrid({
  count = 6,
  cols = 3,
  className = "",
  tone = "light",
}: BlockProps & { count?: number; cols?: 3 | 4 }) {
  const colsClass =
    cols === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div
      aria-hidden="true"
      className={`grid gap-5 ${colsClass} ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} tone={tone} />
      ))}
    </div>
  );
}

export function SkeletonHeading({
  className = "",
  tone = "light",
}: BlockProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`} aria-hidden="true">
      <Skeleton tone={tone} className="h-3 w-24" style={{ borderRadius: "9999px" }} />
      <Skeleton tone={tone} className="h-7 w-72 max-w-[80%]" />
      <Skeleton tone={tone} className="h-4 w-96 max-w-[90%]" />
    </div>
  );
}

export function SkeletonDetail({
  className = "",
  tone = "light",
  bg = "bg-slate-50",
}: BlockProps & { bg?: string }) {
  return (
    <div className={`min-h-screen ${bg} ${className}`} aria-hidden="true">
      <SkeletonHeroBand tone={tone} />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Skeleton tone={tone} className="mb-4 h-8 w-2/3 max-w-md" />
        <div className="mb-6 flex flex-wrap gap-3">
          <Skeleton tone={tone} className="h-7 w-28" style={{ borderRadius: "9999px" }} />
          <Skeleton tone={tone} className="h-7 w-36" style={{ borderRadius: "9999px" }} />
          <Skeleton tone={tone} className="h-7 w-32" style={{ borderRadius: "9999px" }} />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4">
            <Skeleton tone={tone} className="h-44 w-full" style={{ borderRadius: "1rem" }} />
            <SkeletonText lines={5} />
          </div>
          <div className="space-y-4 lg:col-span-2">
            <SkeletonText lines={7} />
            <Skeleton tone={tone} className="h-36 w-full" style={{ borderRadius: "1rem" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonHeroBand({
  className = "",
  tone = "light",
}: BlockProps) {
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <Skeleton tone={tone} className="h-56 w-full sm:h-64" style={{ borderRadius: 0 }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
        <Skeleton tone="dark" className="h-4 w-40" style={{ borderRadius: "9999px", opacity: 0.45 }} />
        <Skeleton tone="dark" className="h-8 w-64 max-w-[85%]" style={{ opacity: 0.45 }} />
        <Skeleton tone="dark" className="h-4 w-80 max-w-[90%]" style={{ opacity: 0.45 }} />
      </div>
    </div>
  );
}

export function SkeletonListPage({
  stats = 4,
  cards = 6,
  className = "",
  tone = "light",
  bg = "bg-slate-50",
}: BlockProps & { stats?: number; cards?: number; bg?: string }) {
  return (
    <div className={`min-h-screen ${bg} ${className}`} aria-hidden="true">
      <SkeletonHeroBand tone={tone} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {stats > 0 && (
          <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: stats }).map((_, i) => (
              <Skeleton key={i} tone={tone} className="h-20 w-full" style={{ borderRadius: "1.5rem" }} />
            ))}
          </div>
        )}

        <div className="mb-6 flex flex-col items-center gap-3">
          <Skeleton tone={tone} className="h-14 w-full max-w-4xl" style={{ borderRadius: "1.5rem" }} />
          <div className="flex w-full justify-center gap-2 overflow-hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} tone={tone} className="h-10 w-24 shrink-0" style={{ borderRadius: "9999px" }} />
            ))}
          </div>
        </div>

        <SkeletonGrid count={cards} tone={tone} />
      </div>
    </div>
  );
}

export function SkeletonAdmin({
  className = "",
  tone = "light",
}: BlockProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`} aria-hidden="true">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Skeleton tone={tone} className="h-6 w-40" />
          <Skeleton tone={tone} className="h-9 w-28" style={{ borderRadius: "0.75rem" }} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} tone={tone} className="h-24 w-full" style={{ borderRadius: "1rem" }} />
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-5 py-4">
            <Skeleton tone={tone} className="h-5 w-52" />
          </div>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 border-b border-gray-50 px-5 py-4">
              <Skeleton tone={tone} className="h-9 w-9 shrink-0" style={{ borderRadius: "9999px" }} />
              <Skeleton tone={tone} className="h-4 flex-1" />
              <Skeleton tone={tone} className="h-4 w-24" />
              <Skeleton tone={tone} className="h-7 w-20" style={{ borderRadius: "9999px" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
