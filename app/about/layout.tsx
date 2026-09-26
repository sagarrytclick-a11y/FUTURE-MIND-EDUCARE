import type { Metadata } from "next";
import { breadcrumbLd, buildMetadata, JsonLd } from "@/app/config/seo-utils";
import { SITE_URL } from "@/app/config/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us - 15+ Years of MBBS Admission Expertise",
  description:
    "Future Mind Educare is an MBBS admission consultancy in Andheri East, Mumbai. 15+ years of experience, 5000+ students counselled and 50+ partner medical colleges across India and abroad.",
  path: "/about",
  keywords: [
    "about future mind educare",
    "education consultancy mumbai",
    "mbbs admission experts",
  ],
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", url: "/" },
            { name: "About", url: "/about" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": `${SITE_URL}/about#aboutpage`,
            url: `${SITE_URL}/about`,
            name: "About Future Mind Educare",
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
        ]}
      />
      {children}
    </>
  );
}
