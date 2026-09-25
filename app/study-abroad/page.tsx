import React from "react";
import SinglePackageSection from "@/components/SinglePackageSection";
import PageHero from "@/components/PageHero";
import { FaCheckCircle } from "react-icons/fa";

const TRUST_POINTS = [
  "Top-ranked global universities",
  "SOP + scholarship assistance",
  "Visa documentation support",
  "End-to-end admission counseling",
];

export default function StudyAbroadPage() {
  return (
    <main className="bg-white">
      <PageHero
        align="center"
        variant="light"
        eyebrow="Study Abroad Pathway"
        title="Global Education,"
        highlight="Limitless Opportunities"
        description="Expert consultancy for pursuing higher education in top global universities."
        crumbs={[{ label: "Home", href: "/" }, { label: "Study Abroad" }]}
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
