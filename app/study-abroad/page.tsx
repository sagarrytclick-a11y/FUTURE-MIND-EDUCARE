import React from "react";
import SinglePackageSection from "@/components/SinglePackageSection";
import Footer from "@/components/Footer";

export default function StudyAbroadPage() {
  return (
    <main>
      <SinglePackageSection
        title="Study Abroad Pathway"
        subtitle="Global Education, Limitless Opportunities"
        price="1,00,000"
        description="Expert consultancy for pursuing higher education in top global universities."
        features={[
          "Course and university mapping",
          "Application essay/SOP guidance",
          "Scholarship assistance",
          "Visa and documentation support",
          "End-to-end admission counseling",
        ]}
      />
      <Footer />
    </main>
  );
}
