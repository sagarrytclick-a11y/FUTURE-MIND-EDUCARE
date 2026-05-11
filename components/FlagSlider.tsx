'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaArrowRight,
  FaGlobeAsia,
} from 'react-icons/fa';

const FlagSlider = () => {
  const [isPaused, setIsPaused] = useState(false);

  const countries = [
    {
      name: 'India',
      slug: 'india',
      flag:
        'https://argroupofeducation.com/wp-content/uploads/2024/04/india.svg',
      description: 'Top Medical Colleges',
    },
    {
      name: 'Bangladesh',
      slug: 'bangladesh',
      flag:
        'https://argroupofeducation.com/wp-content/uploads/2024/04/bangladesh.svg',
      description: 'Affordable Education',
    },
    {
      name: 'Kyrgyzstan',
      slug: 'kyrgyzstan',
      flag:
        'https://argroupofeducation.com/wp-content/uploads/2024/04/kyrgyzstan.svg',
      description: 'Quality Medical Education',
    },
    {
      name: 'Kazakhstan',
      slug: 'kazakhstan',
      flag:
        'https://argroupofeducation.com/wp-content/uploads/2024/04/kazakhstan.svg',
      description: 'Modern Facilities',
    },
    {
      name: 'Uzbekistan',
      slug: 'uzbekistan',
      flag:
        'https://argroupofeducation.com/wp-content/uploads/2024/04/uzbekistan.svg',
      description: 'Recognized Universities',
    },
    {
      name: 'Georgia',
      slug: 'georgia',
      flag:
        'https://argroupofeducation.com/wp-content/uploads/2024/04/georgia.svg',
      description: 'European Standards',
    },
    {
      name: 'Russia',
      slug: 'russia',
      flag:
        'https://argroupofeducation.com/wp-content/uploads/2024/04/russia-1.svg',
      description: 'Historic Medical Tradition',
    },
    {
      name: 'Nepal',
      slug: 'nepal',
      flag:
        'https://argroupofeducation.com/wp-content/uploads/2024/04/nepal-1.svg',
      description: 'Affordable Education',
    },
  ];

  const duplicatedCountries = [...countries, ...countries];

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff,#f8fafc)]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4">
        {/* TOP SECTION */}
        {/* TOP SECTION */}
        <div className="flex flex-col items-center justify-center text-center mb-14">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 mb-5">
            <FaGlobeAsia className="text-blue-600 text-sm" />

            <span className="text-blue-700 text-xs font-bold tracking-wide uppercase">
              Study MBBS Worldwide
            </span>


          </div>

          {/* HEADING */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight max-w-4xl">
            Explore Top
            <span className="text-blue-600"> MBBS Destinations</span>
          </h2>

          {/* TEXT */}
          <p className="mt-5 text-slate-500 text-base md:text-lg leading-8 font-medium max-w-3xl">
            Discover globally recognized medical universities with affordable
            fee structures, modern campuses, and excellent career opportunities.
          </p>

          {/* BUTTON */}
          <Link href={'/colleges/mbbs-abroad'} >
            <button
              className="
      group
      mt-8
      h-12
      px-7
      rounded-lg
      border
      border-slate-200
      bg-white
      hover:bg-blue-600
      hover:border-blue-600
      text-slate-800
      hover:text-white
      font-bold
      text-sm
      shadow-sm
      transition-all
      duration-300
      flex
      items-center
      gap-3
    "
            >
              Explore Countries

              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>

        </div>

        {/* SLIDER */}
        <div className="relative">
          {/* FADE EFFECT */}
          <div
            className="overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
          >
            <motion.div
              className="flex items-center"
              animate={{
                x: isPaused ? 0 : ['0%', '-50%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 28,
                  ease: 'linear',
                },
              }}
              onHoverStart={() => setIsPaused(true)}
              onHoverEnd={() => setIsPaused(false)}
            >
              {duplicatedCountries.map((country, index) => (
                <div
                  key={`${country.name}-${index}`}
                  className="flex-shrink-0 w-[320px] px-3"
                >
                  <Link
                    href={`/colleges/mbbs-abroad?country=${country.slug}`}
                    className="block"
                  >
                    <div
                      className="
                        group
                        relative
                        bg-white
                        border
                        border-slate-200
                        rounded-[28px]
                        p-5
                        hover:border-blue-100
                        hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                        transition-all
                        duration-500
                        overflow-hidden
                      "
                    >
                      {/* TOP LIGHT */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                      {/* CONTENT */}
                      <div className="flex items-center justify-between">

                        {/* LEFT */}
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-blue-100 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

                            <img
                              src={country.flag}
                              alt={country.name}
                              className="
                              relative
                              w-16
                              h-12
                              object-cover
                              rounded-lg
                              border
                              border-slate-100
                              shadow-sm
                              group-hover:scale-105
                              transition-transform
                              duration-500
                            "
                            />
                          </div>

                          <div>
                            <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                              {country.name}
                            </h3>

                            <p className="text-sm text-slate-500 font-medium mt-1">
                              {country.description}
                            </p>
                          </div>
                        </div>

                        {/* RIGHT ICON */}
                        <div
                          className="
                          w-11
                          h-11
                          rounded-2xl
                          bg-slate-100
                          group-hover:bg-blue-600
                          flex
                          items-center
                          justify-center
                          transition-all
                          duration-300
                        "
                        >
                          <FaArrowRight className="text-slate-500 group-hover:text-white transition-colors duration-300 text-sm" />
                        </div>
                      </div>

                      {/* BOTTOM */}
                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <p className="text-xs font-bold tracking-wide uppercase text-slate-400">
                          MBBS Admission 2026
                        </p>

                        <span className="text-sm font-bold text-blue-600">
                          Learn More
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlagSlider;