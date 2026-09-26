import type { Metadata } from "next";
import { buildMetadata } from "@/app/config/seo-utils";

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How Future Mind Educare collects, uses and protects your personal information and enquiry data. Last updated policy for our education consulting services.',
  path: '/privacy',
  keywords: ['privacy policy'],
  noindex: false,
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
