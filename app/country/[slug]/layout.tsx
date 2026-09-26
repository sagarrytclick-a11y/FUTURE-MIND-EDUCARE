import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/app/config/seo-utils";
import { findCountry, slugify } from "@/lib/seo-data";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const country = findCountry(slug);

  if (!country) {
    notFound();
  }

  const year = new Date().getFullYear();

  return buildMetadata({
    title: `MBBS in ${country.name} ${year} - Fees, Universities & Admission`,
    description:
      country.description ||
      `Study MBBS in ${country.name}: top universities, tuition fees, duration, medium of instruction, recognition and complete admission process for ${year}.`,
    path: `/country/${slugify(country.name)}`,
    keywords: [
      `mbbs in ${country.name}`,
      `study mbbs in ${country.name}`,
      `mbbs ${country.name} fees`,
      `medical universities in ${country.name}`,
      `mbbs abroad ${country.name}`,
    ],
    images: country.image
      ? [{ url: country.image, alt: `MBBS in ${country.name}` }]
      : undefined,
  });
}

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
