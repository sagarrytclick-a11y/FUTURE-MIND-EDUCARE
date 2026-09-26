import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  /** Light text for dark backgrounds */
  dark?: boolean;
  className?: string;
};

/** Consistent section header: blue eyebrow + deep-brand title + muted subtitle. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  className = "",
}: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "items-center text-center" : "items-start text-left";
  const titleColor = dark ? "text-white" : "text-brand-950";
  const descColor = dark ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`flex flex-col ${alignClass} mb-6 sm:mb-8 ${className}`}>
      {eyebrow && (
        <span className={`text-xs font-bold uppercase tracking-[0.2em] mb-3 ${dark ? "text-accent-400" : "text-accent-600"}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${titleColor} text-balance max-w-3xl`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-2.5 text-sm sm:text-base ${descColor} leading-relaxed max-w-2xl text-pretty`}>
          {description}
        </p>
      )}
    </div>
  );
}
