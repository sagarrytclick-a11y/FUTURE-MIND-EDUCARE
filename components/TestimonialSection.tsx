"use client"

import React, { useState, useEffect } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaStar,
} from 'react-icons/fa';

interface TestimonialItem {
  name: string;
  university: string;
  quote: string;
  image: string;
}

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="py-20 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-blue-600 uppercase tracking-[0.25em] text-sm font-bold">
            Student Testimonials
          </span>

          <h2 className="mt-4 text-3xl md:text-5xl font-black text-slate-900 leading-tight">
            What Our
            <span className="text-blue-600"> Students Say</span>
          </h2>

          <p className="mt-5 text-slate-500 text-base md:text-lg leading-8 font-medium">
            Thousands of students trusted Future Mind Educare to start their
            MBBS journey abroad and in India.
          </p>
        </div>

        {/* TESTIMONIAL CARD */}
        <div className="relative max-w-5xl mx-auto">

          <div
            className="
              relative
              bg-white
              rounded-[32px]
              border
              border-slate-200
              shadow-[0_20px_60px_rgba(0,0,0,0.06)]
              overflow-hidden
            "
          >
            <div className="grid lg:grid-cols-2 items-center">

              {/* LEFT IMAGE */}
              <div className="relative h-[420px] lg:h-[520px] overflow-hidden">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/20" />

                {/* FLOATING BADGE */}
                <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-4 shadow-xl">
                  <div className="flex items-center gap-1 text-yellow-400 mb-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>

                  <p className="text-slate-900 font-bold text-sm">
                    5.0 Student Experience
                  </p>
                </div>
              </div>

              {/* RIGHT CONTENT */}
              <div className="p-8 md:p-12 relative">

                <FaQuoteLeft className="text-5xl text-blue-100 mb-6" />

                <p className="text-slate-600 text-lg leading-9 font-medium">
                  {testimonials[currentIndex].quote}
                </p>

                <div className="mt-10 border-t border-slate-100 pt-6">
                  <h3 className="text-2xl font-black text-slate-900">
                    {testimonials[currentIndex].name}
                  </h3>

                  <p className="text-blue-600 font-semibold mt-2">
                    {testimonials[currentIndex].university}
                  </p>
                </div>

                {/* BUTTONS */}
                <div className="flex items-center gap-4 mt-10">

                  <button
                    onClick={goPrev}
                    className="
                      w-12
                      h-12
                      rounded-2xl
                      border
                      border-slate-200
                      hover:bg-blue-600
                      hover:border-blue-600
                      hover:text-white
                      transition-all
                      duration-300
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <FaChevronLeft />
                  </button>

                  <button
                    onClick={goNext}
                    className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      transition-all
                      duration-300
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DOTS */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-lg ${
                  currentIndex === index
                    ? 'w-10 h-3 bg-blue-600'
                    : 'w-3 h-3 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;