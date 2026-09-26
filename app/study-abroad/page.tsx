import type { Metadata } from "next";
import { buildMetadata } from "@/app/config/seo-utils";

export const metadata: Metadata = buildMetadata({
  title: "Study Abroad 2026 - Global Education Counselling",
  description:
    "End-to-end study abroad guidance: university shortlisting, documentation, visa support, scholarships and pre-departure support for students in Mumbai.",
  path: "/study-abroad",
  keywords: [
    "study abroad consultant",
    "study abroad counselling mumbai",
    "abroad education guidance",
    "student visa assistance",
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
  "Top-ranked global universities",
  "SOP + scholarship assistance",
  "Visa documentation support",
  "End-to-end admission counseling",
];

export default function StudyAbroadPage() {
  return (
    <main className="bg-white">
      <JsonLd
        data={serviceLd({
          name: "Study Abroad Counselling",
          description:
            "Study abroad counselling from Future Mind Educare, Mumbai: university shortlisting, documentation and application support.",
          path: "/study-abroad",
          areaServed: ["India"],
        })}
      />
      <PageHero
        align="center"
        variant="light"
        eyebrow="Study Abroad Pathway"
        title="Global Education,"
        highlight="Limitless Opportunities"
        description="Expert consultancy for pursuing higher education in top global universities."
        crumbs={[{ label: "Home", href: "/" }, { label: "Study Abroad" }]}
      />
      {/* Compact inline trust strip — centered checks, no cards */}
      <TrustStrip points={TRUST_POINTS} />
      <SinglePackageSection
        title="Study Abroad Pathway"
        subtitle="Global Education, Limitless Opportunities"
        price="1,00,000"
        priceNumeric={100000}
        planId="STUDY_ABROAD"
        description="Expert consultancy for pursuing higher education in top global universities."
        features={[
          "Course and university mapping",
          "Application essay/SOP guidance",
          "Scholarship assistance",
          "Visa and documentation support",
          "End-to-end admission counseling",
        ]}
      />
    </main>
  );
}
