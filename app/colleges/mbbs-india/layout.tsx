import type { Metadata } from "next";
import { breadcrumbLd, buildMetadata, itemListLd, JsonLd } from "@/app/config/seo-utils";
import { getIndiaData, slugify } from "@/lib/seo-data";

export const metadata: Metadata = buildMetadata({
  title: "MBBS Colleges in India 2026 - Fees, Seats & Cut-off",
  description:
    "Complete list of government and private MBBS colleges in India with fees, seats, NEET cut-offs, recognition and admission process for 2026 admissions.",
  path: "/colleges/mbbs-india",
  keywords: [
    "mbbs colleges in india",
    "government mbbs colleges",
    "private mbbs colleges fees",
    "mbbs admission 2026",
    "neet cut off 2026",
  ],
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const data = getIndiaData();
  const items = (data?.states ?? []).flatMap((state) =>
    state.colleges.map((college) => ({
      name: college.name,
      url: `/colleges/${slugify(college.name)}`,
    }))
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", url: "/" },
            { name: "Colleges", url: "/colleges/mbbs-india" },
            { name: "MBBS in India", url: "/colleges/mbbs-india" },
          ]),
          itemListLd({
            name: "MBBS Colleges in India",
            items: items.slice(0, 100),
          }),
        ]}
      />
      {children}
    </>
  );
}
