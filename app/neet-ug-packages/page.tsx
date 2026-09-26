import type { Metadata } from "next";
import { buildMetadata } from "@/app/config/seo-utils";

export const metadata: Metadata = buildMetadata({
  title: "NEET UG Counselling Packages 2026 - Fees & What You Get",
  description:
    "Choose a NEET UG counselling package: 1-on-1 expert guidance, NEET score analysis, college shortlisting, choice filling support and seat confirmation assistance.",
  path: "/neet-ug-packages",
  keywords: [
    "neet ug counselling package",
    "neet counselling fees",
    "neet seat confirmation help",
    "medical college shortlist",
  ],
});

import React from "react";
import dynamic from "next/dynamic";

const PricingSection = dynamic(() => import("@/components/PricingSection"));
import PageHero from "@/components/PageHero";
import TrustStrip from "@/components/TrustStrip";

const TRUST_POINTS = [
  "1-on-1 NEET counselling expert",
  "Choice filling + cut-off analysis",
  "All-India + state quota covered",
  "Admission till final reporting",
];

export default function NeetUgPackagesPage() {
  return (
    <main className="bg-slate-50">
      <PageHero
        align="center"
        variant="dark"
        eyebrow="NEET UG Pathway"
        title="NEET UG"
        highlight="Counselling Packages"
        description="Pick a plan that fits your needs — from information access to end-to-end 1-on-1 counselling support."
        crumbs={[{ label: "Home", href: "/" }, { label: "NEET UG Packages" }]}
      />
      {/* Compact inline trust strip — centered checks, no cards */}
      <TrustStrip points={TRUST_POINTS} />
      <PricingSection />
    </main>
  );
}
