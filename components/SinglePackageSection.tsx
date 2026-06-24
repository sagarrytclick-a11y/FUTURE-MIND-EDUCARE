"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { usePopup } from "../contexts/PopupContext";

interface SinglePackageSectionProps {
  title: string;
  subtitle: string;
  price: string;
  description: string;
  features: string[];
}

const SinglePackageSection = ({
  title,
  subtitle,
  price,
  description,
  features,
}: SinglePackageSectionProps) => {
  const { openPopup } = usePopup();

  return (
    <section className="relative overflow-hidden bg-gray-50 py-16 sm:py-24">
      {/* BACKGROUND DESIGN */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] h-[400px] w-[400px] rounded-full bg-blue-100 blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-100px] right-[-100px] h-[400px] w-[400px] rounded-full bg-cyan-100 blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {title}
          </h2>
          <p className="text-gray-600 mt-3">{subtitle}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100"
        >
          <div className="text-center mb-8">
            <div className="text-5xl sm:text-6xl font-black text-gray-900 mb-2">
              ₹{price}
            </div>
            <p className="text-gray-500 font-medium">{description}</p>
          </div>

          <ul className="space-y-4 mb-10">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1 shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaCheck className="text-blue-600 text-xs" />
                </div>
                <span className="text-gray-700 text-lg">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={openPopup}
            className="w-full py-4 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-blue-200"
          >
            Get Started Now →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SinglePackageSection;
