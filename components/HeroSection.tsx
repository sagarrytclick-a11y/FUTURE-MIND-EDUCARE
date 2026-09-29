"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePopup } from "../contexts/PopupContext";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const FEATURED_COLLEGES = [
  "AIIMS, New Delhi",
  "Grant Medical College, Mumbai",
  "Maulana Azad Medical College, New Delhi",
  "Lady Hardinge Medical College, New Delhi",
];

const HeroSection = () => {
  const { openPopup } = usePopup();
  const [featuredCollege, setFeaturedCollege] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFeaturedCollege((current) => (current + 1) % FEATURED_COLLEGES.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800">
      {/* Globe line-art decoration */}
      <div className="absolute inset-y-0 right-[-160px] hidden md:flex items-center opacity-100 pointer-events-none">
        <div className="relative h-[560px] w-[560px]">
          <div className="absolute inset-0 rounded-full border border-white/15" />
          <div className="absolute inset-8 rounded-full border border-white/10" />
          <div className="absolute inset-20 rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
          <div className="absolute left-1/2 top-1/2 h-[560px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/10" />
          <div className="absolute left-1/2 top-1/2 h-[560px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/10" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-14">
        <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-2 sm:gap-4 md:gap-8 items-end">
          {/* DOCTOR CUTOUT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative order-2 flex h-[220px] justify-center sm:h-[280px] md:order-1 md:h-full md:min-h-[540px] md:items-end"
          >
            <Image
              src="/hero.png"
              alt="Future Mind Educare — medical student guidance"
              width={275}
              height={458}
              priority
              className="h-[220px] w-auto max-w-none object-contain object-bottom drop-shadow-2xl sm:h-[280px] md:h-[540px] lg:h-[620px]"
            />
          </motion.div>

          {/* COPY */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-1 py-4 sm:py-6 md:order-2 md:py-14"
          >
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-white">
                MBBS ADMISSIONS IN INDIA
              </span>
            </div>

            {/* HEADING */}
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl md:text-6xl">
              MBBS in India
              <span className="block text-accent-400 mt-1">Find Your College</span>
            </h1>

            <div className="mt-5 max-w-xl rounded-xl border border-white/20 bg-brand-950/35 px-4 py-3">
              <p className="text-[10px] font-bold tracking-[0.16em] text-slate-300 sm:text-[11px]">
                FEATURED COLLEGE IN INDIA
              </p>
              <div className="relative mt-1 min-h-7 overflow-hidden text-base font-semibold text-white sm:text-lg">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={featuredCollege}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-x-0 top-0"
                  >
                    {FEATURED_COLLEGES[featuredCollege]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

        
            <div className="mt-5 grid max-w-xl grid-cols-2 gap-x-4 gap-y-2 text-sm font-medium text-white sm:text-base">
              <span>Fees and seat details</span>
              <span>NEET cut-offs</span>
              <span>Government and private colleges</span>
              <span>State-wise choices</span>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={openPopup}
                className="group h-12 px-7 rounded-full bg-white hover:bg-accent-100 text-brand-950 font-bold text-sm shadow-lg transition-all duration-300 flex items-center justify-center gap-2.5 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto"
              >
                Get Expert Counselling
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-950/10">
                  <FaArrowRight className="text-[11px] transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </button>
              <Link href="/colleges/mbbs-india">
                <span className="flex h-12 w-full items-center justify-center rounded-full border border-white/40 px-7 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10 sm:w-auto">
                  Explore Colleges
                </span>
              </Link>
            </div>

            {/* MINI STATS */}
            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-3 sm:gap-x-8">
              <div>
                <p className="text-2xl font-extrabold text-white leading-none">296+</p>
                <p className="text-xs text-slate-300 mt-1">Colleges Listed</p>
              </div>
              <div className="border-l border-white/15 pl-3 sm:pl-8">
                <p className="text-2xl font-extrabold text-white leading-none">18</p>
                <p className="text-xs text-slate-300 mt-1">States Covered</p>
              </div>
              <div className="border-l border-white/15 pl-3 sm:pl-8">
                <p className="text-2xl font-extrabold text-accent-400 leading-none">46,696</p>
                <p className="text-xs text-slate-300 mt-1">MBBS Seats</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ECG baseline */}
      <svg
        className="absolute bottom-0 left-0 w-full h-8 text-white/20"
        viewBox="0 0 1200 32"
        preserveAspectRatio="none"
        fill="none"
      >
        <polyline
          points="0,20 480,20 500,20 510,6 520,28 530,20 560,20 1200,20"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </section>
  );
};

export default HeroSection;
