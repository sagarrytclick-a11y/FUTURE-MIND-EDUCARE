import type { Metadata } from "next";
import { buildMetadata } from "@/app/config/seo-utils";

export const metadata: Metadata = buildMetadata({
  title: 'Terms & Conditions',
  description: 'Terms and conditions governing the use of the Future Mind Educare website, counselling services and educational guidance.',
  path: '/terms',
  keywords: ['terms and conditions'],
  noindex: false,
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
