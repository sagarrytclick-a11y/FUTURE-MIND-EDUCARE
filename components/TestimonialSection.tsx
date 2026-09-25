"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaQuoteLeft,
} from 'react-icons/fa';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import { SITE_IDENTITY } from '@/app/config/site_identity';

interface TestimonialItem {
  name: string;
  university: string;
  quote: string;
  image: string;
}

const PER_VIEW = 3;

const testimonials: TestimonialItem[] = [
  {
    name: "Sachin Sachdeva",
    university: "Tbilisi State Medical University, Georgia",
    quote:
      "Future Mind Educare made my dream of studying MBBS abroad come true. Their guidance throughout the admission process was exceptional.",
    image:
      "https://i.pinimg.com/736x/dd/de/09/ddde094724373791608fd38b28d94739.jpg",
  },
  {
    name: "Rahul Verma",
    university: "Kazakhstan Medical University",
    quote:
      "The counseling I received was amazing. They helped me choose the perfect university based on my budget and career goals.",
    image:
      "https://i.pinimg.com/736x/27/90/03/27900371354079f41e16751f2a320fdb.jpg",
  },
  {
    name: "Anjali Patel",
    university: "Davao Medical School Foundation",
    quote:
      "Their counselors guided me at every step and made the complete process smooth and stress-free for my MBBS admission.",
    image:
      "https://i.pinimg.com/736x/28/06/61/2806611f0d5d28ede2130650f6f96d71.jpg",
  },
  {
    name: "Raj Kumar",
    university: "Philippines Medical University",
    quote:
      "Excellent support from admission to visa approval. I highly recommend Future Mind Educare to every medical aspirant.",
    image:
      "https://i.pinimg.com/736x/e3/fd/17/e3fd175ad1c7cf2bf88aad354b854120.jpg",
  },
];

const TestimonialSection: React.FC = () => {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(testimonials.length / PER_VIEW);

  const goNext = useCallback(() => {
    setPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const goPrev = useCallback(() => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext]);

  const visible = Array.from({ length: PER_VIEW }, (_, i) => {
    const start = (page * PER_VIEW + i) % testimonials.length;
    return testimonials[start];
  });

  return (
    <Section spacing="md" className="bg-white overflow-hidden">
      <SectionHeading
        eyebrow="Student Testimonials"
        title={
          <>
            What Our <span className="text-accent-600">Students Say</span>
          </>
        }
        description="Thousands of students trusted Future Mind Educare to start their MBBS journey abroad and in India."
      />

      {/* RATING PILL ROW */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 border border-slate-200 rounded-full pl-4 pr-1.5 py-1.5 bg-white shadow-sm">
          <span className="flex items-center gap-0.5 text-amber-400 text-xs">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </span>
          <span className="text-gray-600 text-sm font-medium">
            4.2 · 115 Google reviews
          </span>
          <a
            href={SITE_IDENTITY.contact.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-brand-950 hover:bg-brand-900 text-white font-bold rounded-full h-11 px-5 text-sm transition-colors"
          >
            <FaStar className="text-[11px]" />
            View on Google
          </a>
          <a
            href={SITE_IDENTITY.contact.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-11 px-5 rounded-full border border-slate-200 bg-white text-brand-950 text-sm font-bold transition-colors hover:bg-accent-100 hover:border-accent-400"
          >
            Write a review
          </a>
        </div>
      </div>

      {/* 3-CARD GRID */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {visible.map((item) => (
              <article
                key={item.name}
                className="group relative h-full flex flex-col bg-white border border-slate-200 hover:bg-brand-950 hover:border-brand-900 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5"
              >
                <FaQuoteLeft className="text-slate-200 group-hover:text-accent-400 text-2xl transition-colors duration-300" />

                <div className="flex items-center gap-0.5 text-amber-400 text-[11px] mt-2">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <p className="text-gray-600 group-hover:text-slate-200 text-sm leading-6 mt-2 flex-1">
                  {item.quote}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 group-hover:border-white/15 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-accent-400 transition-all duration-300"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-brand-950 group-hover:text-white leading-tight truncate transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 group-hover:text-slate-300 text-xs truncate transition-colors duration-300">
                      {item.university}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ARROWS */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <button
            onClick={goPrev}
            aria-label="Previous testimonials"
            className="w-9 h-9 rounded-full border border-slate-200 hover:bg-brand-950 hover:border-brand-950 hover:text-white transition-all duration-300 flex items-center justify-center text-xs"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={goNext}
            aria-label="Next testimonials"
            className="w-9 h-9 rounded-full bg-brand-950 hover:bg-brand-900 text-white transition-all duration-300 flex items-center justify-center text-xs"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              aria-label={`Go to testimonial page ${index + 1}`}
              className={`transition-all duration-300 rounded-full ${
                page === index
                  ? 'w-8 h-2.5 bg-brand-950'
                  : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TestimonialSection;
