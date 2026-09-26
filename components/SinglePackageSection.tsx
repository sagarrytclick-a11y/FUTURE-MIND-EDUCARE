"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import CheckoutModal from "./CheckoutModal";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

interface SinglePackageSectionProps {
  title: string;
  subtitle: string;
  price: string;
  priceNumeric: number;
  planId: string;
  description: string;
  features: string[];
}

const trustPoints = [
  "Secure payment via Razorpay",
  "Instant access after payment",
  "1-on-1 support from counseling experts",
];

const SinglePackageSection = ({
  title,
  subtitle,
  price,
  priceNumeric,
  planId,
  description,
  features,
}: SinglePackageSectionProps) => {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <Section spacing="md" className="bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Single Package"
          title={title}
          description={subtitle}
        />

        <div className="grid gap-4 lg:grid-cols-[1fr_320px] items-start">
          {/* Left: package details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
          >
            <h3 className="text-base sm:text-lg font-extrabold text-brand-950 mb-1">
              What&apos;s included
            </h3>
            <p className="text-sm text-gray-600 mb-4">{description}</p>
            <ul className="space-y-2.5">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0 h-5 w-5 rounded-full bg-accent-100 flex items-center justify-center">
                    <FaCheck className="text-brand-950 text-[10px]" />
                  </div>
                  <span className="text-sm text-gray-600 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: sticky price card */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky top-header-gap bg-brand-950 rounded-2xl p-5 text-center"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              One-time payment
            </p>
            <div className="text-3xl font-extrabold text-accent-400 mt-1 tracking-tight">
              ₹{price}
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="mt-4 inline-flex w-full items-center justify-center h-11 px-6 rounded-full bg-white hover:bg-accent-100 text-brand-950 font-bold text-sm transition-colors"
            >
              Get Started Now →
            </button>
            <ul className="mt-4 pt-4 border-t border-white/10 space-y-2 text-left">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-slate-300">
                  <FaCheck className="mt-1 shrink-0 text-xs text-accent-400" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </div>

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        planId={planId}
        planName={title}
        planPrice={priceNumeric}
      />
    </Section>
  );
};

export default SinglePackageSection;
