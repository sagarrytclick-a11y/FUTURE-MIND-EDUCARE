"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePopup } from "../contexts/PopupContext";
import {
  FaArrowRight,
  FaUserGraduate,
  FaGlobeAsia,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import Link from "next/link";

const HeroSection = () => {
  const { openPopup } = usePopup();

  return (
    <section className="relative overflow-hidden bg-white">
      
      {/* BACKGROUND DESIGN */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-120px] right-[-100px] h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] lg:h-[350px] lg:w-[350px] rounded-lg bg-blue-100 blur-2xl sm:blur-3xl opacity-60 sm:opacity-70"></div>

        <div className="absolute bottom-[-120px] left-[-100px] h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] lg:h-[300px] lg:w-[300px] rounded-lg bg-cyan-100 blur-2xl sm:blur-3xl opacity-60 sm:opacity-70"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl lg:max-w-3xl"
          >
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 sm:px-4 py-2 mb-4 sm:mb-6">
              <FaStar className="text-yellow-500 text-xs sm:text-sm" />

              <span className="text-xs sm:text-sm font-semibold text-blue-700">
                Premium Medical Guidance
              </span>
            </div>

            {/* HEADING */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-black leading-tight text-gray-900">
              Build Your
              <span className="block text-blue-600 mt-1 sm:mt-2">
                Medical Career
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                With Top Universities
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl leading-6 sm:leading-7 text-gray-600 max-w-2xl">
              Get complete guidance for MBBS admission in India & Abroad.
              From counseling to university selection — we help you at every step.
            </p>

            {/* FEATURES */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

              <div className="flex items-center gap-2 sm:gap-3">
                <FaCheckCircle className="text-green-500 text-sm sm:text-base flex-shrink-0" />
                <span className="text-gray-700 font-medium text-sm sm:text-base">
                  Expert Counselling
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <FaCheckCircle className="text-green-500 text-sm sm:text-base flex-shrink-0" />
                <span className="text-gray-700 font-medium text-sm sm:text-base">
                  Top Medical Universities
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <FaCheckCircle className="text-green-500 text-sm sm:text-base flex-shrink-0" />
                <span className="text-gray-700 font-medium text-sm sm:text-base">
                  Admission Assistance
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <FaCheckCircle className="text-green-500 text-sm sm:text-base flex-shrink-0" />
                <span className="text-gray-700 font-medium text-sm sm:text-base">
                  Visa & Documentation
                </span>
              </div>
            </div>

            {/* STATS */}
            <div className="flex flex-wrap gap-3 sm:gap-5 mt-6 sm:mt-10">

              <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white shadow-lg px-4 sm:px-5 py-3 sm:py-4 min-w-[140px] sm:min-w-[180px]">
                <div className="flex items-center gap-3 sm:gap-4">
                  
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-blue-600">
                    <FaUserGraduate className="text-white text-sm sm:text-lg" />
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900">
                      5000+
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      Students Guided
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white shadow-lg px-4 sm:px-5 py-3 sm:py-4 min-w-[140px] sm:min-w-[180px]">
                <div className="flex items-center gap-3 sm:gap-4">

                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-cyan-500">
                    <FaGlobeAsia className="text-white text-sm sm:text-lg" />
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900">
                      15+
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      Countries Available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-wrap sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-10">

              <button
                onClick={openPopup}
                className="
                  group
                  h-12 sm:h-14
                  px-6 sm:px-8
                  rounded-lg
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-bold
                  shadow-xl
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                  gap-3
                  hover:scale-[1.03]
                  text-sm sm:text-base
                  w-full sm:w-auto
                "
              >
                Get Free Consultation

                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 text-xs" />
              </button>

              <Link
              href="/colleges/mbbs-abroad"
               
              >
                <button  className="
                  h-12 sm:h-14
                  px-6 sm:px-8
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  text-gray-800
                  font-bold
                  hover:bg-gray-50
                  transition-all
                  duration-300
                  text-sm sm:text-base
                  w-full sm:w-auto
                ">

                Explore Universities
                </button>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >

            {/* MAIN IMAGE */}
            <div className="relative w-full max-w-[400px] sm:max-w-[520px]">

              <div className="overflow-hidden rounded-[25px] sm:rounded-[35px] shadow-2xl border border-gray-100 bg-white">

                <img
                  src="https://i.pinimg.com/1200x/bc/68/a0/bc68a03939708cf66e303d252a27da48.jpg"
                  alt="Medical Student"
                  className="h-[400px] sm:h-[500px] lg:h-[620px] w-full object-cover"
                />
              </div>

              {/* FLOATING CARD 1 */}
              <div className="absolute top-4 sm:top-6 -left-6 sm:-left-10 rounded-2xl sm:rounded-3xl bg-white shadow-2xl border border-gray-100 p-3 sm:p-5 w-[160px] sm:w-[220px] hidden sm:block">

                <div className="flex items-center gap-3 sm:gap-4">

                  <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-blue-600 flex items-center justify-center">
                    <FaUserGraduate className="text-white text-sm sm:text-xl" />
                  </div>

                  <div>
                    <h4 className="text-xl sm:text-3xl font-black text-gray-900">
                      5000+
                    </h4>

                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      Students Guided
                    </p>
                  </div>
                </div>
              </div>

              {/* FLOATING CARD 2 */}
              <div className="absolute bottom-4 sm:bottom-8 -right-6 sm:-right-8 rounded-2xl sm:rounded-3xl bg-white shadow-2xl border border-gray-100 p-3 sm:p-5 w-[170px] sm:w-[230px] hidden sm:block">

                <div className="flex items-center gap-3 sm:gap-4">

                  <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-cyan-500 flex items-center justify-center">
                    <FaGlobeAsia className="text-white text-sm sm:text-xl" />
                  </div>

                  <div>
                    <h4 className="text-xl sm:text-3xl font-black text-gray-900">
                      15+
                    </h4>

                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      Countries Available
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;