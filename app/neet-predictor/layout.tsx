import type { Metadata } from "next";
import { breadcrumbLd, buildMetadata, JsonLd } from "@/app/config/seo-utils";
import { SITE_URL } from "@/app/config/seo";

export const metadata: Metadata = buildMetadata({
  title: "NEET Score Predictor 2026 - Check MBBS College Chances",
  description:
    "Enter your NEET UG score to predict your college rank, get category cut-offs and find out which government and private MBBS colleges you can get admitted to.",
  path: "/neet-predictor",
  keywords: [
    "neet score predictor",
    "neet rank predictor",
    "mbbs college predictor",
    "neet cutoff 2026",
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
            { name: "NEET Predictor", url: "/neet-predictor" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "@id": `${SITE_URL}/neet-predictor#app`,
            name: "NEET UG Score Predictor",
            url: `${SITE_URL}/neet-predictor`,
            applicationCategory: "EducationalApplication",
            applicationSubCategory: "NEET Admission Predictor",
            operatingSystem: "Web browser",
            browserRequirements: "Requires JavaScript",
            inLanguage: "en-IN",
            description:
              "Free NEET UG score predictor to check MBBS college rank, category cut-offs and admission chances.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
        ]}
      />
      {children}
    </>
  );
}
