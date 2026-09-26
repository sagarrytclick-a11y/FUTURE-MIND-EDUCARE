"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaGlobeAsia,
  FaUserGraduate,
  FaStethoscope,
  FaArrowRight,
} from "react-icons/fa";
import { usePopup } from "@/contexts/PopupContext";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";

interface SectorItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const TargetSectorsSection: React.FC = () => {
  const { openPopup } = usePopup();

  const sectors: SectorItem[] = [
    {
      title: "MBBS Abroad",
      description: "Admission guidance for recognized universities worldwide.",
      icon: <FaGlobeAsia />,
    },
    {
      title: "MBBS India",
      description: "NEET counseling and admission support across India.",
      icon: <FaUserGraduate />,
    },
    {
      title: "MD / MS",
      description: "PG admission assistance in top institutions.",
      icon: <FaStethoscope />,
    },
  ];

  return (
    <Section spacing="md" className="relative bg-slate-50 overflow-hidden">
      <div className="relative z-10">
        <SectionHeading
          eyebrow="Career Opportunities"
          title={
            <>
              Our Target <span className="text-accent-600">Sectors</span>
            </>
          }
          description="Expert medical admission guidance across pathways to build successful careers in medicine."
        />

        {/* MINIMAL FLAT CARDS — deliberately plainer than Services rows */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {sectors.map((sector, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              viewport={{ once: true }}
              className="group bg-white border border-slate-200 hover:bg-brand-950 hover:border-brand-900 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-100 group-hover:bg-accent-400 text-brand-950 group-hover:text-brand-950 flex items-center justify-center text-base mb-3 transition-colors duration-300">
                {sector.icon}
              </div>
              <h3 className="text-brand-950 group-hover:text-white font-bold mb-1 leading-snug transition-colors duration-300">
                {sector.title}
              </h3>
              <p className="text-gray-600 group-hover:text-slate-300 text-sm leading-6 line-clamp-2 transition-colors duration-300">
                {sector.description}
              </p>
              <button
                onClick={openPopup}
                className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-brand-950 group-hover:text-accent-400 transition-colors"
              >
                Learn more <span aria-hidden="true">↗</span>
              </button>
            </motion.div>
          ))}

          {/* NAVY CTA TILE fills the 4-col grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.21 }}
            viewport={{ once: true }}
            className="group bg-brand-950 border border-brand-900 rounded-2xl p-4 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-accent-400 text-brand-950 group-hover:bg-white flex items-center justify-center text-base mb-3 transition-colors duration-300">
                <FaArrowRight className="text-xs" />
              </div>
              <h3 className="text-white font-bold leading-snug">
                Not sure where to start?
              </h3>
              <p className="text-slate-300 text-sm leading-6 line-clamp-2 mt-1">
                Get free counselling to pick your path.
              </p>
            </div>
            <button
              onClick={openPopup}
              className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-accent-400 group-hover:text-white transition-colors self-start"
            >
              Talk to Expert <span aria-hidden="true">↗</span>
            </button>
          </motion.div>
        </div>

        <div className="mt-6 text-center max-w-3xl mx-auto">
          <p className="text-gray-600 text-sm leading-6">
            With years of experience, we have guided thousands of students
            toward dream medical careers in India and abroad.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default TargetSectorsSection;
