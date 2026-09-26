import type { Metadata } from "next";
import { breadcrumbLd, buildMetadata, itemListLd, JsonLd } from "@/app/config/seo-utils";
import { getIndiaData, slugify } from "@/lib/seo-data";

export const metadata: Metadata = buildMetadata({
  title: "MBBS Colleges by State in India",
  description:
    "Explore MBBS colleges across every Indian state. Government and private medical colleges with fees, seats, NEET cut-offs and admission process for 2026.",
  path: "/states",
  keywords: [
    "mbbs colleges in india",
    "medical colleges by state",
    "government mbbs colleges",
    "private mbbs colleges",
  ],
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const states = getIndiaData()?.states ?? [];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", url: "/" },
            { name: "States", url: "/states" },
          ]),
          itemListLd({
            name: "Indian states with MBBS colleges",
            items: states.map((state) => ({
              name: state.name,
              url: `/states/${slugify(state.name)}`,
            })),
          }),
        ]}
      />
      {children}
    </>
  );
}
