import type { Metadata } from "next";
import { buildMetadata } from "@/app/config/seo-utils";

export const metadata: Metadata = buildMetadata({
  title: 'MD MS Colleges in India 2026 - PG Medical Admissions',
  description: 'Top MD and MS colleges in India with seat matrix, fees, NEET PG cut-offs and admission guidance for postgraduate medical education.',
  path: '/colleges/md-ms',
  keywords: ['md ms colleges', 'neet pg counselling', 'pg medical admission', 'doctorate of medicine'],
  noindex: false,
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
