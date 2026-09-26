import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  breadcrumbLd,
  buildMetadata,
  collegeLd,
  JsonLd,
} from "@/app/config/seo-utils";
import { SITE_URL } from "@/app/config/seo";
import { findCollege } from "@/lib/seo-data";

type Params = { params: Promise<{ slug: string }> };

const LABELS = {
  india: { kindLabel: "MBBS", parentName: "MBBS in India", parentPath: "/colleges/mbbs-india" },
  abroad: { kindLabel: "MBBS Abroad", parentName: "MBBS Abroad", parentPath: "/colleges/mbbs-abroad" },
  mdms: { kindLabel: "MD/MS", parentName: "MD/MS Colleges", parentPath: "/colleges/md-ms" },
} as const;

type Found = NonNullable<ReturnType<typeof findCollege>>;

function locationOf(found: Found): string {
  if (found.kind === "abroad") return found.country.name;
  return found.state.name;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const found = findCollege(slug);

  if (!found) {
    notFound();
  }

  const { college, kind } = found;
  const location = locationOf(found);
  const { kindLabel } = LABELS[kind];

  const title = `${college.name}, ${college.city ?? location} - Fees, Seats & Admission ${new Date().getFullYear()}`;
  const description = [
    `${college.name} is a ${college.type ?? "medical"} college in ${college.city ?? location}, ${location}.`,
    college.ranking ? `Ranked ${college.ranking}.` : "",
    college.fees ? `Fees: ${college.fees}.` : "",
    college.seats ? `${college.seats} seats.` : "",
    college.recognition ? `Recognised by ${college.recognition}.` : "",
    `Get ${kindLabel} admission guidance, NEET counselling and fee details from Future Mind Educare, Mumbai.`,
  ]
    .filter(Boolean)
    .join(" ");

  return buildMetadata({
    title,
    description: description.slice(0, 300),
    path: `/colleges/${slug}`,
    keywords: [
      `${college.name} admission`,
      `${college.name} fees`,
      `${college.name} NEET cut off`,
      `medical college in ${college.city ?? location}`,
      `${kindLabel} ${location}`,
    ],
    images: college.image
      ? [{ url: college.image, alt: `${college.name} campus` }]
      : undefined,
  });
}

export default async function Layout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const found = findCollege(slug);

  const data = found
    ? [
        breadcrumbLd([
          { name: "Home", url: "/" },
          {
            name: LABELS[found.kind].parentName,
            url: LABELS[found.kind].parentPath,
          },
          { name: found.college.name, url: `/colleges/${slug}` },
        ]),
        collegeLd({
          name: found.college.name,
          url: `${SITE_URL}/colleges/${slug}`,
          city: found.college.city,
          // Abroad colleges are located in a country, not an Indian region.
          state: found.kind === "abroad" ? undefined : found.state.name,
          country: found.kind === "abroad" ? found.country.name : "IN",
          image: found.college.image,
          type: found.college.type,
          fees: found.college.fees,
          seats: found.college.seats,
          description: `${found.college.name} admission, fees, seats and NEET cut-off details.`,
        }),
      ]
    : [];

  return (
    <>
      {data.map((entry, i) => (
        <JsonLd key={i} data={entry} />
      ))}
      {children}
    </>
  );
}
