"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaUniversity,
  FaComments,
  FaPlaneDeparture,
  FaUserGraduate,
  FaGlobeAsia,
  FaShieldAlt,
} from "react-icons/fa";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  position: "left" | "right";
}

const ServicesSection: React.FC = () => {
  const services: ServiceItem[] = [
    {
      title: "100% Admission Assistance",
      description:
        "Complete support from university selection to documentation and admission process for a smooth journey.",
      icon: <FaUniversity />,
      position: "left",
    },
    {
      title: "Free Career Counseling",
      description:
        "Expert guidance for students and parents to choose the best MBBS destination and career path.",
      icon: <FaComments />,
      position: "left",
    },
    {
      title: "95% Visa Success Rate",
      description:
        "Professional visa assistance with proper documentation and travel support for students.",
      icon: <FaPlaneDeparture />,
      position: "left",
    },
    {
      title: "University & Course Selection",
      description:
        "We help students choose the best medical universities according to their goals and budget.",
      icon: <FaUserGraduate />,
      position: "right",
    },
    {
      title: "Personalized Guidance",
      description:
        "Customized counseling and one-to-one mentorship for every student throughout the process.",
      icon: <FaShieldAlt />,
      position: "right",
    },
    {
      title: "Pre-Departure Support",
      description:
        "Complete assistance before departure including accommodation, travel, and student orientation.",
      icon: <FaGlobeAsia />,
      position: "right",
    },
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff,#f8fafc)]" />

      {/* LIGHT EFFECT */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-100 blur-3xl opacity-30 rounded-full" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          
          {/* BADGE */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="text-blue-700 text-xs font-bold tracking-widest uppercase">
              Our Premium Services
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            Services At
            <span className="text-blue-600"> Future Mind Educare</span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-6 text-slate-500 text-base md:text-lg leading-8 font-medium">
            We provide complete MBBS admission guidance for students planning to
            study in India or abroad with trusted support at every step.
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          
          {/* LEFT SERVICES */}
          <div className="space-y-6">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="
                    group
                    bg-white
                    border
                    border-slate-200
                    rounded-[28px]
                    p-6
                    hover:border-blue-100
                    hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                    transition-all
                    duration-500
                  "
                >
                  <div className="flex items-start gap-5">
                    
                    {/* ICON */}
                    <div
                      className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-blue-50
                        text-blue-600
                        flex
                        items-center
                        justify-center
                        text-xl
                        shrink-0
                        group-hover:bg-blue-600
                        group-hover:text-white
                        transition-all
                        duration-300
                      "
                    >
                      {service.icon}
                    </div>

                    {/* TEXT */}
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-3">
                        {service.title}
                      </h3>

                      <p className="text-slate-500 leading-7 text-sm font-medium">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* CENTER IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            {/* GLOW */}
            <div className="absolute inset-0 bg-blue-100 blur-3xl opacity-40 rounded-full" />

            {/* IMAGE CARD */}
            <div className="relative bg-white rounded-[36px] border border-slate-200 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
              
              <img
                src="/docter.png"
                alt="Doctor"
                className="w-full max-w-[400px] object-cover"
              />

              {/* FLOATING CARD */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-2xl px-6 py-4 border border-slate-100 w-[85%]">
                <h3 className="text-lg font-black text-slate-900 text-center">
                  Trusted MBBS Guidance
                </h3>

                <p className="text-sm text-slate-500 text-center mt-2 font-medium">
                  Expert counseling & admission support for medical aspirants.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SERVICES */}
          <div className="space-y-6">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="
                    group
                    bg-white
                    border
                    border-slate-200
                    rounded-[28px]
                    p-6
                    hover:border-blue-100
                    hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                    transition-all
                    duration-500
                  "
                >
                  <div className="flex items-start gap-5">
                    
                    {/* ICON */}
                    <div
                      className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-blue-50
                        text-blue-600
                        flex
                        items-center
                        justify-center
                        text-xl
                        shrink-0
                        group-hover:bg-blue-600
                        group-hover:text-white
                        transition-all
                        duration-300
                      "
                    >
                      {service.icon}
                    </div>

                    {/* TEXT */}
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-3">
                        {service.title}
                      </h3>

                      <p className="text-slate-500 leading-7 text-sm font-medium">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;