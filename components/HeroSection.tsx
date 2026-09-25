"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePopup } from "../contexts/PopupContext";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const TYPED_COLLEGES = [
  "Yaroslavl The Wise Novgorod State University, Russia",
  "Kyrgyz State Medical Academy, Kyrgyzstan",
  "Grant Medical College, Mumbai",
  "Tbilisi State Medical University, Georgia",
];

function useTypewriter() {
  const [text, setText] = useState("");
  useEffect(() => {
    let college = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = TYPED_COLLEGES[college];
      if (!deleting) {
        char += 1;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = setTimeout(tick, 1800);
          return;
        }
        timer = setTimeout(tick, 45);
      } else {
        char -= 1;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          college = (college + 1) % TYPED_COLLEGES.length;
          timer = setTimeout(tick, 400);
          return;
        }
        timer = setTimeout(tick, 18);
      }
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, []);
  return text;
}

const HeroSection = () => {
  const { openPopup } = usePopup();
  const typed = useTypewriter();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-950 via-blue-900 to-brand-900">
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 sm:pt-14 sm:pb-20">
        <div className="grid lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] gap-8 items-center">
          {/* DOCTOR CUTOUT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block self-end"
          >
            <Image
              src="/hero.png"
              alt="Future Mind Educare — medical student guidance"
              width={500}
              height={500}
              priority
              className="w-full max-w-[560px] h-auto object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* COPY */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-white">
                MBBS INDIA & ABROAD — GLOBAL PATHWAYS
              </span>
            </div>

            {/* HEADING */}
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight text-white text-balance">
              Build Your
              <span className="block text-accent-400 mt-1">
                Medical Career
              </span>
            </h1>

            {/* FEATURED GLASS BOX */}
            <div className="mt-6 max-w-xl rounded-2xl border border-white/15 bg-brand-950/60 backdrop-blur px-4 py-3.5">
              <p className="text-[11px] font-bold tracking-[0.18em] text-slate-300">
                FEATURED COLLEGE (ABROAD)
              </p>
              <p className="mt-1 text-sm sm:text-base font-semibold text-white min-h-[1.75rem]">
                {typed}
                <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] animate-pulse bg-accent-400" />
              </p>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300 max-w-xl">
              Trusted support for MBBS in India & abroad — university selection,
              applications, counselling and visa assistance end to end.
            </p>

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
              <Link href="/colleges/mbbs-abroad">
                <button className="h-12 px-7 rounded-full border border-white/40 text-white font-bold text-sm hover:bg-white/10 transition-all duration-300 w-full sm:w-auto">
                  Explore Countries
                </button>
              </Link>
            </div>

            {/* MINI STATS */}
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
              <div>
                <p className="text-2xl font-extrabold text-white leading-none">5000+</p>
                <p className="text-xs text-slate-300 mt-1">Students Guided</p>
              </div>
              <div className="border-l border-white/15 pl-8">
                <p className="text-2xl font-extrabold text-white leading-none">15+</p>
                <p className="text-xs text-slate-300 mt-1">Countries Available</p>
              </div>
              <div className="border-l border-white/15 pl-8">
                <p className="text-2xl font-extrabold text-accent-400 leading-none">19+</p>
                <p className="text-xs text-slate-300 mt-1">Years Experience</p>
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
