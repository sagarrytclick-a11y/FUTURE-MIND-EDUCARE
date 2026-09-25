"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaAward,
  FaUserGraduate,
  FaUniversity,
  FaUsers,
} from "react-icons/fa";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";

interface StatItem {
  number: string;
  label: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const ProgressInNumbers: React.FC = () => {
  const [counters, setCounters] = useState<{ [key: string]: number }>({});

  const stats: StatItem[] = [
    { number: "19", label: "Years Experience", icon: <FaAward /> },
    {
      number: "4000+",
      label: "Students Counseled",
      icon: <FaUserGraduate />,
      highlight: true,
    },
    { number: "150+", label: "MOU Signed Colleges", icon: <FaUniversity /> },
    { number: "50+", label: "Expert Counselors", icon: <FaUsers /> },
  ];

  useEffect(() => {
    const targetValues: { [key: string]: number } = {
      "19": 19,
      "4000+": 4000,
      "150+": 150,
      "50+": 50,
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
    <Section spacing="md" className="relative bg-white overflow-hidden">
      <div className="relative z-10">
        <SectionHeading
          eyebrow="Our Achievements"
          title={<>Our Progress In Numbers</>}
          description="Trusted by thousands of students for MBBS admissions across India and abroad."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="group bg-white border border-slate-200 hover:bg-brand-950 hover:border-brand-900 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5"
            >
              <div className="border border-slate-200 group-hover:border-accent-400 rounded-lg w-10 h-10 flex items-center justify-center text-slate-500 group-hover:text-brand-950 group-hover:bg-accent-400 text-base mb-3 transition-colors duration-300">
                {stat.icon}
              </div>
              <p
                className={`text-3xl font-extrabold tracking-tight leading-none transition-colors duration-300 ${
                  stat.highlight
                    ? "text-accent-600 group-hover:text-accent-400"
                    : "text-brand-950 group-hover:text-white"
                }`}
              >
                {stat.number.includes("+")
                  ? `${counters[stat.number] || 0}+`
                  : counters[stat.number] || 0}
              </p>
              <p className="mt-2 text-xs font-medium text-gray-600 group-hover:text-slate-300 transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ProgressInNumbers;
