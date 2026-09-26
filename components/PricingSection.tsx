"use client";

import React, { useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import CheckoutModal from "./CheckoutModal";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import { SkeletonGrid, SkeletonHeading } from "@/components/Skeleton";

const subscribeNoop = () => () => {};

const plans = [
  {
    id: "NEET_UG_PLAN_1",
    name: "PLAN 1",
    price: 10000,
    subtitle: "(Information based package)",
    features: [
      "Will be added in a Personal Whatsapp Group for all Updates related to NEET UG 2025 Colleges & Counseling.",
      "One Personalized Session by Senior Counseling Expert to Understand your Admission.",
      "Possibilities based on your - NEET Rank, Category, State of Domicile, Other Open State Options, Govt. & more.",
      "Access of All Important data Related to NEET UG college & Counselings.",
    ],
  },
  {
    id: "NEET_UG_PLAN_2",
    name: "PLAN 2",
    price: 25000,
    subtitle: "Personalized Counseling Service",
    highlighted: true,
    features: [
      "Will be added in a Personal Whatsapp Group for all Updates related to NEET UG 2025 Colleges & Counseling.",
      "One Personalized Session by Senior Counseling Expert to Understand your Admission.",
      "Access of All Important data Related to NEET UG college & Counselings.",
      "Access of All Premium Videos Related to college & Counseling College Mapping.",
      "All India & one State Counselling of your choice Covered",
      "Truly unlimited, dedicated 1-on-1 phone call & WhatsApp chat support with our counselling experts.",
    ],
  },
  {
    id: "NEET_UG_PLAN_3",
    name: "PLAN 3",
    price: 50000,
    subtitle: "ONE TO ONE counseling service",
    features: [
      "Complete Counseling Process will be taken care By Team Sri Sai Consultancy From Day one of Counseling till the End of Counseling.",
      "Access of All Personalized Tools & End to End Personalized Care of Entire Counseling Process.",
      "Senior expert",
      "College/ Institute mapping",
      "All India & 40+ State Counsellings Covered",
    ],
  },
  {
    id: "NEET_UG_PLAN_4",
    name: "PLAN 4",
    price: 100000,
    subtitle: "NRI/MNGT Quota Admission service",
    features: [
      "NRI Documentation verification",
      "End to End Offline Mngt Quota or NRI",
      "Quota Admission Assistance",
      "Registration & Choice entry by Expert",
      "Best College Suggestions",
    ],
  },
];

const PricingSection = () => {
  const [checkoutPlan, setCheckoutPlan] = useState<{
    id: string;
    name: string;
    price: number;
  } | null>(null);

  // Avoid hydration mismatch: render the real prices only after mount
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );

  if (!mounted)
    return (
      <Section spacing="md" className="bg-gray-50">
        <SkeletonHeading />
        <SkeletonGrid count={3} cols={3} className="mt-6" />
      </Section>
    );

  return (
    <Section spacing="md" className="bg-gray-50">
        <SectionHeading
          eyebrow="NEET UG Pathway"
          title="Explore Our Packages for NEET UG"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-5 bg-white shadow-sm flex flex-col ${
                plan.highlighted
                  ? "border-2 border-accent-500"
                  : "border border-slate-200"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-400 text-brand-950 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  Popular
                </span>
              )}
              <h3 className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-1.5">
                {plan.name}
              </h3>
              <div className="text-3xl font-extrabold text-brand-950 mb-1 tracking-tight">
                ₹{plan.price.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {plan.subtitle}
              </p>

              <ul className="space-y-2.5 mb-5 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <FaCheck className="mt-1 shrink-0 text-xs text-brand-950" />
                    <span className="text-sm leading-relaxed text-gray-600">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() =>
                  setCheckoutPlan({
                    id: plan.id,
                    name: plan.name,
                    price: plan.price,
                  })
                }
                className="inline-flex w-full items-center justify-center h-11 px-6 rounded-full bg-brand-950 text-white hover:bg-brand-900 text-sm font-bold transition-colors"
              >
                Pick This Package →
              </button>
            </motion.div>
          ))}
        </div>

      {checkoutPlan && (
        <CheckoutModal
          isOpen={!!checkoutPlan}
          onClose={() => setCheckoutPlan(null)}
          planId={checkoutPlan.id}
          planName={checkoutPlan.name}
          planPrice={checkoutPlan.price}
        />
      )}
    </Section>
  );
};

export default PricingSection;
