"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUniversity,
  FaUserGraduate,
  FaGlobeAsia,
  FaUsers,
  FaAward,
  FaBookOpen,
} from "react-icons/fa";

interface StatItem {
  number: string;
  label: string;
  icon: React.ReactNode;
}

const ProgressInNumbers: React.FC = () => {
  const [counters, setCounters] = useState<{ [key: string]: number }>({});

  const stats: StatItem[] = [
    {
      number: "14+",
      label: "Franchise",
      icon: <FaUniversity />,
    },
    {
      number: "19",
      label: "Years Experience",
      icon: <FaAward />,
    },
    {
      number: "50+",
      label: "Expert Counselors",
      icon: <FaUsers />,
    },
    {
      number: "110",
      label: "Courses",
      icon: <FaBookOpen />,
    },
    {
      number: "150+",
      label: "MOU Signed Colleges",
      icon: <FaGlobeAsia />,
    },
    {
      number: "4000+",
      label: "Students Counseled",
      icon: <FaUserGraduate />,
    },
  ];

  useEffect(() => {
    const targetValues: { [key: string]: number } = {
      "14+": 14,
      "19": 19,
      "50+": 50,
      "110": 110,
      "150+": 150,
      "4000+": 4000,
    };

    Object.entries(targetValues).forEach(([key, target]) => {
      let start = 0;

      const duration = 2000;
      const increment = target / 60;

      const timer = setInterval(() => {
        start += increment;

        if (start >= target) {
          start = target;
          clearInterval(timer);
        }

        setCounters((prev) => ({
          ...prev,
          [key]: Math.floor(start),
        }));
      }, duration / 60);
    });
  }, []);

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-[#F8FAFC] overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#f8fafc,#ffffff)]" />

      {/* TOP LIGHT */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] sm:w-[400px] sm:h-[200px] lg:w-[500px] lg:h-[250px] bg-blue-100 blur-2xl sm:blur-3xl opacity-30 sm:opacity-40 rounded-full" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4 sm:mb-6">
            <span className="text-blue-700 text-xs font-bold tracking-widest uppercase">
              Our Achievements
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            Our Progress In
            <span className="text-blue-600 block"> Numbers</span>
          </h2>

          {/* TEXT */}
          <p className="mt-3 sm:mt-5 text-slate-500 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 font-medium">
            Trusted by thousands of students for MBBS admissions across India
            and abroad with expert guidance and successful placements.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="
                group
                relative
                bg-white
                border
                border-slate-200
                rounded-[20px] sm:rounded-[24px] lg:rounded-[30px]
                p-5 sm:p-6 lg:p-8
                overflow-hidden
                hover:border-blue-100
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]
                transition-all
                duration-500
                text-center
              "
            >
              {/* TOP LINE */}
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* ICON */}
              <div
                className="
                  w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16
                  rounded-xl sm:rounded-2xl lg:rounded-2xl
                  bg-blue-50
                  text-blue-600
                  flex
                  items-center
                  justify-center
                  text-lg sm:text-xl lg:text-2xl
                  mb-4 sm:mb-5 lg:mb-6
                  group-hover:bg-blue-600
                  group-hover:text-white
                  transition-all
                  duration-300
                  mx-auto
                "
              >
                {stat.icon}
              </div>

              {/* NUMBER */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {stat.number.includes("+")
                  ? `${counters[stat.number] || 0}+`
                  : counters[stat.number] || 0}
              </h3>

              {/* LABEL */}
              <p className="mt-2 sm:mt-3 text-slate-500 text-sm sm:text-base font-semibold">
                {stat.label}
              </p>

              {/* HOVER LIGHT */}
              <div className="absolute -bottom-16 -right-16 sm:-bottom-20 sm:-right-20 lg:-bottom-24 lg:-right-24 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-blue-100 rounded-full blur-2xl sm:blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgressInNumbers;