import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  crumbs?: Crumb[];
  /** Visual variant so different pages don't look identical */
  variant?: "light" | "tinted" | "dark";
  /** Center the hero content (title, subtitle, breadcrumbs) */
  align?: "left" | "center";
};

/** Compact hero used by all inner pages: small breadcrumb, tight title, muted subtitle. */
export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  crumbs,
  variant = "light",
  align = "left",
}: PageHeroProps) {
  const isDark = variant === "dark";
  const wrapClass = isDark ? "bg-brand-950" : "bg-accent-50";
  const titleClass = isDark ? "text-white" : "text-brand-950";
  const highlightClass = isDark ? "text-accent-400" : "text-accent-600";
  const descClass = isDark ? "text-gray-300" : "text-gray-600";
  const crumbClass = isDark ? "text-gray-400" : "text-gray-500";
  const crumbCurrentClass = isDark ? "text-gray-200" : "text-gray-700";
  const isCenter = align === "center";
  const textAlign = isCenter ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`relative overflow-hidden ${wrapClass}`}>
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent-200 blur-3xl opacity-60" />
      <div className="absolute -bottom-28 -left-20 h-56 w-56 rounded-full bg-accent-100 blur-3xl opacity-50" />
      <div
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col ${textAlign}`}
      >
        {crumbs && crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className={`flex items-center gap-1.5 text-xs ${crumbClass} mb-4 flex-wrap ${isCenter ? "justify-center" : ""}`}
          >
            {crumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {i > 0 && <FaChevronRight className="text-[10px] text-gray-400" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-brand-900 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={crumbCurrentClass + " font-medium"}>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-600 mb-3 block">
            {eyebrow}
          </span>
        )}
        <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${titleClass} text-balance max-w-3xl`}>
          {title}{" "}
          {highlight && <span className={highlightClass}>{highlight}</span>}
        </h1>
        {description && (
          <p className={`mt-3 text-sm sm:text-base ${descClass} leading-relaxed max-w-2xl text-pretty`}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
