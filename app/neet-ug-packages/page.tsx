import React from "react";
import PricingSection from "@/components/PricingSection";
import PageHero from "@/components/PageHero";
import { FaCheckCircle } from "react-icons/fa";

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
      {/* Compact inline trust strip — blue checks, no cards */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {TRUST_POINTS.map((point) => (
              <span key={point} className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                <FaCheckCircle className="text-xs text-brand-950" />
                {point}
              </span>
            ))}
          </div>
        </div>
      </div>
      <PricingSection />
    </main>
  );
}
