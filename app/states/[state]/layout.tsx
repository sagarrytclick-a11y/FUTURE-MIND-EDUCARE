import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/app/config/seo-utils";
import { findState, slugify } from "@/lib/seo-data";

type Params = { params: Promise<{ state: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { state: slug } = await params;
  const found = findState(slug);

  if (!found) {
    notFound();
  }

  const { state, kind } = found;
  const label = kind === "mdms" ? "MD/MS" : "MBBS";

  return buildMetadata({
    title: `Medical Colleges in ${state.name} - ${label} Colleges ${new Date().getFullYear()}`,
    description: `Top ${label} medical colleges in ${state.name} with fees, seats, NEET cut-offs, recognition and full admission process. Explore ${state.colleges.length}+ colleges with expert guidance from Future Mind Educare, Mumbai.`,
    path: `/states/${slugify(state.name)}`,
    keywords: [
      `medical colleges in ${state.name}`,
      `mbbs colleges in ${state.name}`,
      `${state.name} mbbs fees`,
      `mbbs admission ${state.name}`,
      kind === "mdms" ? `md ms colleges in ${state.name}` : `neet counselling ${state.name}`,
    ],
    images: state.image
      ? [{ url: state.image, alt: `Medical colleges in ${state.name}` }]
      : undefined,
  });
}

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
