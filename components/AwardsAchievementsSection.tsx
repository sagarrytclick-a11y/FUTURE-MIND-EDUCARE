"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaAward, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { usePopup } from "../contexts/PopupContext";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";

const MINI_STATS = [
  { value: "5000+", label: "Students Guided" },
  { value: "15+", label: "Countries Covered" },
  { value: "150+", label: "Partner Universities" },
  { value: "95%", label: "Visa Success Rate" },
];

const TRUST_POINTS = [
  "NMC-aware university shortlisting",
  "Transparent fees, no hidden charges",
];

const AwardsAchievementsSection: React.FC = () => {
  const { openPopup } = usePopup();

  return (
    <Section
      spacing="md"
      className="relative overflow-hidden bg-brand-950"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f1a44,#172554,#1e3a8a)]" />

      {/* LIGHT EFFECT */}
      <div className="absolute top-6 left-16 w-[240px] h-[200px] bg-white/10 blur-3xl rounded-xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[280px] h-[220px] bg-white/5 blur-3xl rounded-xl pointer-events-none" />
      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/3 w-[200px] h-[200px] bg-accent-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative flex items-center pb-8">
              {/* CERTIFICATE 1 */}
              <motion.div
                whileHover={{ rotate: 3, y: -8 }}
                transition={{ duration: 0.3 }}
                className="
                  relative
                  z-20
                  rounded-xl
                  overflow-hidden
                  border
                  border-white/10
                  shadow-[0_20px_50px_rgba(0,0,0,0.35)]
                "
              >
                <Image
                  src="/paper/image-1.png"
                  alt="Award Certificate"
                  width={170}
                  height={160}
                  sizes="170px"
                  className="w-[150px] md:w-[170px] h-40 object-cover"
                />
                {/* Accent corner tag */}
                <span className="absolute top-2 left-2 bg-accent-400 text-brand-950 text-[10px] font-extrabold uppercase tracking-wide rounded-full px-2 py-0.5">
                  Awarded
                </span>
              </motion.div>

              {/* CERTIFICATE 2 */}
              <motion.div
                whileHover={{ rotate: -3, y: -8 }}
                transition={{ duration: 0.3 }}
                className="
                  relative
                  -ml-10
                  mt-10
                  rounded-xl
                  overflow-hidden
                  border
                  border-white/10
                  shadow-[0_20px_50px_rgba(0,0,0,0.35)]
                "
              >
                <Image
                  src="/paper/image-2.png"
                  alt="Achievement Certificate"
                  width={170}
                  height={160}
                  sizes="170px"
                  className="w-[150px] md:w-[170px] h-40 object-cover"
                />
              </motion.div>

              {/* FLOATING BADGE */}
              <div
                className="
                  absolute
                  -bottom-0
                  left-1/2
                  -translate-x-1/2
                  bg-white
                  rounded-xl
                  px-4
                  py-2.5
                  shadow-2xl
                  border
                  border-slate-100
                  flex
                  items-center
                  gap-3
                  z-30
                "
              >
                <div className="w-10 h-10 rounded-xl bg-accent-400 text-brand-950 flex items-center justify-center text-base">
                  <FaAward />
                </div>

                <div>
                  <h4 className="text-gray-900 font-bold text-base leading-none">
                    19+ Years
                  </h4>

                  <p className="text-gray-600 text-xs font-medium mt-1">
                    Trusted Excellence
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* TITLE — SectionHeading scale, light variant for dark bg */}
            <SectionHeading
              align="left"
              dark
              eyebrow="Awards & Recognition"
              title={<>Our <span className="text-accent-400">Achievements</span></>}
              description="With over 19 years of experience, Future Mind Educare has helped thousands of aspiring medical students secure admissions in top medical universities across India and abroad."
              className="mb-0"
            />

            {/* MINI GLASS STATS */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl">
              {MINI_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-xl border border-white/15 bg-white/10 backdrop-blur px-3 py-2.5 text-center transition-all duration-300 hover:bg-accent-400 hover:border-accent-400 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <p className="text-lg font-extrabold text-white group-hover:text-brand-950 leading-none transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-slate-300 group-hover:text-brand-950/80 mt-1 leading-tight transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* TRUST POINTS */}
            <ul className="mt-4 space-y-2">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-slate-200">
                  <FaCheckCircle className="text-accent-400 text-xs shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <button
              onClick={openPopup}
              className="
                group
                mt-5
                inline-flex
                items-center
                gap-2
                bg-brand-950
                hover:bg-brand-900
                text-white
                h-11
                px-6
                rounded-full
                font-bold
                text-sm
                shadow-[0_12px_30px_rgba(23,37,84,0.30)]
                transition-all
                duration-300
                hover:scale-[1.03]
              "
            >
              Get Free Consultation

              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 text-xs" />
            </button>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default AwardsAchievementsSection;
