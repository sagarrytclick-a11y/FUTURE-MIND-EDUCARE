"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { usePopup } from "../contexts/PopupContext";

const plans = [
  {
    name: "PLAN 1",
    price: "10,000",
    subtitle: "(Information based package)",
    features: [
      "Will be added in a Personal Whatsapp Group for all Updates related to NEET UG 2025 Colleges & Counseling.",
      "One Personalized Session by Senior Counseling Expert to Understand your Admission.",
      "Possibilities based on your - NEET Rank, Category, State of Domicile, Other Open State Options, Govt. & more.",
      "Access of All Important data Related to NEET UG college & Counselings.",
    ],
  },
  {
    name: "PLAN 2",
    price: "25,000",
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
    name: "PLAN 3",
    price: "50,000",
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
    name: "PLAN 4",
    price: "10,0000",
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
  const { openPopup } = usePopup();

  return (
    <section className="relative overflow-hidden bg-gray-50 py-16 sm:py-24">
      {/* BACKGROUND DESIGN */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-120px] right-[-100px] h-[300px] w-[300px] rounded-full bg-blue-100 blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-120px] left-[-100px] h-[300px] w-[300px] rounded-full bg-cyan-100 blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-15">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-orange-600 font-bold tracking-wider uppercase mb-2 text-sm">
            NEET UG Pathway
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Explore Our Packages for NEET UG
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col ${
                plan.highlighted
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              <h3
                className={`font-bold mb-2 ${
                  plan.highlighted ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {plan.name}
              </h3>
              <div className="text-4xl sm:text-5xl font-black mb-1">
                ₹{plan.price}
              </div>
              <p
                className={`text-sm mb-6 ${
                  plan.highlighted ? "text-blue-50" : "text-gray-500"
                }`}
              >
                {plan.subtitle}
              </p>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <FaCheck
                      className={`mt-1 shrink-0 ${
                        plan.highlighted ? "text-blue-200" : "text-blue-600"
                      }`}
                    />
                    <span
                      className={
                        plan.highlighted ? "text-white" : "text-gray-700"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={openPopup}
                className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Pick This Package →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
