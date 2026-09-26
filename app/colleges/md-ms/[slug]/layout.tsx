import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/app/config/seo-utils";
import { getMdmsData } from "@/lib/seo-data";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = getMdmsData();
  const state = data?.states.find((s) => s.slug === slug);
  const year = new Date().getFullYear();

  if (!state) {
    notFound();
  }

  return buildMetadata({
    title: `MD MS Colleges in ${state.name} ${year} - PG Medical Admission`,
    description: `MD and MS colleges in ${state.name} with seat matrix, fees, NEET PG cut-offs, clinical exposure and admission guidance for ${year}. Explore ${state.colleges.length}+ postgraduate colleges with Future Mind Educare.`,
    path: `/colleges/md-ms/${state.slug}`,
    keywords: [
      `md ms colleges in ${state.name}`,
      `neet pg counselling ${state.name}`,
      `postgraduate medical colleges ${state.name}`,
      `md ms admission ${year}`,
    ],
    images: state.image
      ? [{ url: state.image, alt: `MD MS colleges in ${state.name}` }]
      : undefined,
  });
}

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
