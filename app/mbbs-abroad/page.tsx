import type { Metadata } from "next";
import { buildMetadata } from "@/app/config/seo-utils";

export const metadata: Metadata = buildMetadata({
  title: "MBBS Abroad 2026 - Study Medicine in Russia, Kazakhstan & More",
  description:
    "Complete MBBS abroad guidance: NMC-approved universities in Russia, Kazakhstan, Kyrgyzstan, Uzbekistan, Georgia and Egypt with fees, duration and admission help.",
  path: "/mbbs-abroad",
  keywords: [
    "mbbs abroad",
    "mbbs in russia",
    "mbbs in kazakhstan",
    "nmc approved universities abroad",
    "mbbs abroad admission 2026",
  ],
});

import React from "react";
import dynamic from "next/dynamic";

const SinglePackageSection = dynamic(
  () => import("@/components/SinglePackageSection")
);
import { serviceLd, JsonLd } from "@/app/config/seo-utils";
import PageHero from "@/components/PageHero";
import TrustStrip from "@/components/TrustStrip";

const TRUST_POINTS = [
  "NMC-approved universities",
  "No donation / transparent fees",
  "Visa + pre-departure support",
  "FMGE / NEXT guidance",
];

export default function MbbsAbroadPage() {
  return (
    <main className="bg-slate-50">
      <JsonLd
        data={serviceLd({
          name: "MBBS Abroad Admission Guidance",
          description:
            "End-to-end MBBS abroad guidance from Future Mind Educare, Mumbai: university selection, documentation, visa and pre-departure support.",
          path: "/mbbs-abroad",
          areaServed: ["India", "Russia", "Georgia", "Kyrgyzstan", "Uzbekistan", "Kazakhstan"],
        })}
      />
      <PageHero
        align="center"
        variant="light"
        eyebrow="MBBS Abroad Pathway"
        title="Your Dream Medical"
        highlight="Career Awaits"
        description="Premium guidance for MBBS admission in top international medical universities."
        crumbs={[{ label: "Home", href: "/" }, { label: "MBBS Abroad" }]}
      />
      {/* Compact inline trust strip — centered checks, no cards */}
      <TrustStrip points={TRUST_POINTS} />
      <SinglePackageSection
        title="MBBS Abroad Pathway"
        subtitle="Your Dream Medical Career Awaits"
        price="1,00,000"
        priceNumeric={100000}
        planId="MBBS_ABROAD"
        description="Premium guidance for MBBS admission in top international medical universities."
        features={[
          "University selection based on your profile",
          "Complete admission documentation support",
          "Visa application assistance",
          "Pre-departure guidance",
          "Dedicated 1-on-1 counselor",
        ]}
      />
    </main>
  );
}
