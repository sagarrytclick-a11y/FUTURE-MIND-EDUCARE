'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaArrowRight,
  FaStar,
  FaQuoteLeft,
} from 'react-icons/fa';
import { usePopup } from '@/contexts/PopupContext';
import Link from 'next/link';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import { SITE_IDENTITY } from '@/app/config/site_identity';
import Image from "next/image";

const WhoWeAre: React.FC = () => {
  const checklist = [
    'University selection guidance',
    'Admission process & documentation',
    'Visa assistance & pre-departure support',
    'Career counselling from experts',
  ];

  const stats = [
    { number: '5000+', label: 'Students Guided' },
    { number: '15+', label: 'Countries' },
    { number: '100+', label: 'Medical Universities' },
  ];

  const { openPopup } = usePopup();

  return (
    <Section spacing="md" className="relative bg-white overflow-hidden">
      {/* Soft background accents */}
      <span className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-accent-100/50 blur-3xl" />
      <span className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-accent-200/40 blur-3xl" />

      <div className="relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-10 items-center">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1 w-full"
          >
            <div className="group relative w-full max-w-[580px] mx-auto lg:mx-0">
              {/* Reduced height using lower aspect ratio (4/3 & 1/1 mix) */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-md">
                <Image
                  src="/about-team.jpg"
                  alt="Future Mind Educare counselling team"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 580px"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 flex items-end bg-brand-950/0 transition-colors duration-300 group-hover:bg-brand-950/80">
                  <div className="w-full translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <FaQuoteLeft className="text-accent-400 text-xl" />
                    <p className="mt-1.5 text-sm font-semibold leading-relaxed text-white">
                      One stop solution for MBBS guidance — India &amp; abroad.
                    </p>
                  </div>
                </div>
              </div>

              {/* FLOATING: YEARS EXPERIENCE */}
              <div className="absolute -bottom-3 left-3 sm:left-4 z-20 flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-3.5 py-2 shadow-lg">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-400 text-xs font-extrabold text-brand-950">
                  10+
                </span>
                <span className="text-[11px] font-semibold leading-tight text-gray-600">
                  Years
                  <br />
                  Experience
                </span>
              </div>

              {/* FLOATING: GOOGLE REVIEWS */}
              <a
                href={SITE_IDENTITY.contact.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -right-2 -top-3 z-20 hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3.5 py-2 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-400 sm:inline-flex"
              >
                <span className="flex items-center gap-0.5 text-accent-400 text-[10px]">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </span>
                <span className="text-[11px] font-semibold leading-tight text-gray-600">
                  4.2 · 115
                  <br />
                  Google reviews
                </span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <SectionHeading
              align="left"
              className="!mb-0"
              eyebrow="About Future Mind Educare"
              title={
                <>
                  Guiding Future <span className="text-accent-600">Medical Professionals</span>
                </>
              }
              description="Future Mind Educare is a trusted educational consultancy helping aspiring students secure MBBS admissions in top medical universities across India and abroad."
            />

            {/* CHECKLIST — 2 column cards */}
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-white px-3.5 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-900 hover:shadow-md"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-100 text-brand-950 transition-colors duration-300 group-hover:bg-accent-400">
                    <FaCheckCircle className="text-[11px]" />
                  </span>
                  <span className="text-sm font-medium leading-snug text-gray-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* STAT CARDS */}
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-400 hover:shadow-md"
                >
                  <p className="text-xl font-extrabold leading-none tracking-tight text-accent-600 sm:text-2xl">
                    {item.number}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold leading-tight text-gray-600">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/about"
                className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-950 px-6 text-sm font-bold text-white transition-colors duration-300 hover:bg-brand-900 sm:w-auto"
              >
                Learn More About Us
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() => openPopup()}
                className="inline-flex h-11 w-full items-center justify-center rounded-full border border-accent-400 bg-accent-400 px-6 text-sm font-bold text-brand-950 transition-colors duration-300 hover:bg-accent-500 sm:w-auto"
              >
                Talk to a Counselor
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default WhoWeAre;