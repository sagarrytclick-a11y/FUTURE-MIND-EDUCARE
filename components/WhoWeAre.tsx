'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaUserGraduate,
  FaGlobeAsia,
  FaUniversity,
  FaArrowRight,
} from 'react-icons/fa';

const WhoWeAre: React.FC = () => {
  const stats = [
    {
      icon: <FaUserGraduate />,
      number: '5000+',
      label: 'Students Guided',
    },
    {
      icon: <FaGlobeAsia />,
      number: '15+',
      label: 'Countries',
    },
    {
      icon: <FaUniversity />,
      number: '100+',
      label: 'Medical Universities',
    },
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff,#f8fafc)]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-start order-2 lg:order-1"
          >
            {/* MAIN IMAGE */}
            <div className="relative w-full max-w-[400px] sm:max-w-[450px] lg:max-w-[520px]">
              
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-blue-100 rounded-full blur-2xl sm:blur-3xl opacity-50 sm:opacity-60" />

              <div className="relative overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-white">
                <img
                  src="https://argroupofeducation.com/wp-content/uploads/2024/04/doctors-images.png"
                  alt="Future Mind Educare Team"
                  className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover"
                />
              </div>

              {/* FLOATING CARD */}
              <div className="absolute -bottom-4 -right-3 sm:-bottom-6 sm:-right-4 lg:-bottom-8 lg:-right-5 bg-white rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] p-3 sm:p-4 lg:p-5 shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-slate-100">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">
                  10+
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Years Experience
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-2xl order-1 lg:order-2"
          >
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4 sm:mb-6">
              <span className="text-blue-700 text-xs font-bold tracking-wide uppercase">
                About Future Mind Educare
              </span>
            </div>

            {/* HEADING */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Guiding Future
              <span className="text-blue-600 block"> Medical Professionals</span>
            </h2>

            {/* DESCRIPTION */}
            <div className="mt-4 sm:mt-6 lg:mt-7 space-y-4 sm:space-y-5">
              <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 font-medium">
                Future Mind Educare is a trusted educational consultancy helping
                aspiring students secure MBBS admissions in top medical
                universities across India and abroad.
              </p>

              <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 font-medium">
                Our experienced counselors provide complete guidance from
                university selection and admission process to documentation,
                visa assistance, and career counseling.
              </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8 lg:mt-10">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="
                    bg-white
                    border
                    border-slate-200
                    rounded-[16px] sm:rounded-[20px] lg:rounded-[24px]
                    p-4 sm:p-5
                    hover:border-blue-100
                    hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                    transition-all
                    duration-300
                    text-center
                  "
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-600 text-white flex items-center justify-center text-sm sm:text-lg mb-3 sm:mb-4 mx-auto">
                    {item.icon}
                  </div>

                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900">
                    {item.number}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <button
              className="
                group
                mt-6 sm:mt-8 lg:mt-10
                h-12 sm:h-13
                px-5 sm:px-6 lg:px-7
                rounded-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-bold
                text-xs sm:text-sm
                shadow-[0_10px_25px_rgba(37,99,235,0.25)]
                transition-all
                duration-300
                flex
                items-center
                justify-center
                gap-2 sm:gap-3
                hover:scale-[1.02]
                w-full sm:w-auto
              "
            >
              Learn More About Us

              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;