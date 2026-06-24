import React from "react";
import SinglePackageSection from "@/components/SinglePackageSection";
import Footer from "@/components/Footer";

export default function MbbsAbroadPage() {
  return (
    <main>
      <SinglePackageSection
        title="MBBS Abroad Pathway"
        subtitle="Your Dream Medical Career Awaits"
        price="1,00,000"
        description="Premium guidance for MBBS admission in top international medical universities."
        features={[
          "University selection based on your profile",
          "Complete admission documentation support",
          "Visa application assistance",
          "Pre-departure guidance",
          "Dedicated 1-on-1 counselor",
        ]}
      />
      <Footer />
    </main>
  );
}
