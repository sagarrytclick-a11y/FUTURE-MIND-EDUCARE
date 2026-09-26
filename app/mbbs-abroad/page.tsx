import React from "react";
import SinglePackageSection from "@/components/SinglePackageSection";
import PageHero from "@/components/PageHero";
import { FaCheckCircle } from "react-icons/fa";

const TRUST_POINTS = [
  "NMC-approved universities",
  "No donation / transparent fees",
  "Visa + pre-departure support",
  "FMGE / NEXT guidance",
];

export default function MbbsAbroadPage() {
  return (
    <main className="bg-slate-50">
      <PageHero
        align="center"
        variant="light"
        eyebrow="MBBS Abroad Pathway"
        title="Your Dream Medical"
        highlight="Career Awaits"
        description="Premium guidance for MBBS admission in top international medical universities."
        crumbs={[{ label: "Home", href: "/" }, { label: "MBBS Abroad" }]}
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
