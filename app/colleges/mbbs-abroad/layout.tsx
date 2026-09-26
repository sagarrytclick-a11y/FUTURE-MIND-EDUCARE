import type { Metadata } from "next";
import { buildMetadata } from "@/app/config/seo-utils";

export const metadata: Metadata = buildMetadata({
  title: 'MBBS in Abroad 2026 - Countries, Fees & Admission',
  description: 'Study MBBS abroad in Russia, Kazakhstan, Kyrgyzstan, Uzbekistan, Georgia, Egypt and more. Compare fees, duration, recognition and admission process.',
  path: '/colleges/mbbs-abroad',
  keywords: ['mbbs abroad', 'study mbbs in russia', 'mbbs in kazakhstan', 'mbbs abroad fees'],
  noindex: false,
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
