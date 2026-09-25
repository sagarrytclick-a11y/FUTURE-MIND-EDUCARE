import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  /** Tight vertical rhythm used across the whole site */
  spacing?: "sm" | "md" | "lg";
  id?: string;
};

const spacingMap = {
  sm: "py-8 sm:py-10",
  md: "py-10 sm:py-14",
  lg: "py-12 sm:py-16",
};

/** Consistent page section wrapper: max width + container padding + vertical rhythm. */
export default function Section({
  children,
  className = "",
  spacing = "md",
  id,
}: SectionProps) {
  return (
    <section id={id} className={`${spacingMap[spacing]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
