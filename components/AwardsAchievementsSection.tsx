"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaAward, FaArrowRight } from "react-icons/fa";
import { usePopup } from "../contexts/PopupContext";

const AwardsAchievementsSection: React.FC = () => {
  const { openPopup } = usePopup();

  return (
    <section className="relative py-20 overflow-hidden bg-[#121826]">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a,#121826,#1e293b)]" />

      {/* LIGHT EFFECT */}
      <div className="absolute top-10 left-20 w-[300px] h-[300px] bg-blue-600/20 blur-3xl rounded-lg" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-blue-500/10 blur-3xl rounded-lg" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative flex items-center">
              
              {/* CERTIFICATE 1 */}
              <motion.div
                whileHover={{ rotate: 3, y: -8 }}
                transition={{ duration: 0.3 }}
                className="
                  relative
                  z-20
                  rounded-[28px]
                  overflow-hidden
                  border
                  border-white/10
                  shadow-[0_25px_60px_rgba(0,0,0,0.35)]
                "
              >
                <img
                  src="/paper/image-1.png"
                  alt="Award Certificate"
                  className="w-[230px] md:w-[260px] object-cover"
                />
              </motion.div>

              {/* CERTIFICATE 2 */}
              <motion.div
                whileHover={{ rotate: -3, y: -8 }}
                transition={{ duration: 0.3 }}
                className="
                  relative
                  -ml-12
                  mt-14
                  rounded-[28px]
                  overflow-hidden
                  border
                  border-white/10
                  shadow-[0_25px_60px_rgba(0,0,0,0.35)]
                "
              >
                <img
                  src="/paper/image-2.png"
                  alt="Achievement Certificate"
                  className="w-[230px] md:w-[260px] object-cover"
                />
              </motion.div>

              {/* FLOATING BADGE */}
              <div
                className="
                  absolute
                  -bottom-5
                  left-1/2
                  -translate-x-1/2
                  bg-white
                  rounded-2xl
                  px-6
                  py-4
                  shadow-2xl
                  border
                  border-slate-100
                  flex
                  items-center
                  gap-4
                  z-30
                "
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                  <FaAward />
                </div>

                <div>
                  <h4 className="text-slate-900 font-black text-lg leading-none">
                    19+ Years
                  </h4>

                  <p className="text-slate-500 text-sm font-medium mt-1">
                    Trusted Excellence
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 mb-6">
              <FaAward className="text-blue-400 text-sm" />

              <span className="text-blue-300 text-xs font-bold tracking-widest uppercase">
                Awards & Recognition
              </span>
            </div>

            {/* TITLE */}
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              Our
              <span className="text-blue-500"> Achievements</span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-6 text-slate-300 text-base md:text-lg leading-8 font-medium max-w-xl">
              With over 19 years of experience, Future Mind Educare has helped
              thousands of aspiring medical students secure admissions in top
              medical universities across India and abroad.
            </p>

            <p className="mt-5 text-slate-400 leading-8 text-sm md:text-base">
              Our dedication, transparency, and student-first approach have made
              us one of the most trusted education consultancies for MBBS
              admissions.
            </p>

            {/* BUTTON */}
            <button
              onClick={openPopup}
              className="
                group
                mt-10
                inline-flex
                items-center
                gap-3
                bg-blue-600
                hover:bg-blue-700
                text-white
                h-14
                px-8
                rounded-lg
                font-bold
                text-sm
                shadow-[0_15px_40px_rgba(37,99,235,0.30)]
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
    </section>
  );
};

export default AwardsAchievementsSection;