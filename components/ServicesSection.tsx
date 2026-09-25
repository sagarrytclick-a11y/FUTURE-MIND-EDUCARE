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
  FaArrowRight,
} from "react-icons/fa";
import { usePopup } from "@/contexts/PopupContext";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServicesSection: React.FC = () => {
  const { openPopup } = usePopup();

  const services: ServiceItem[] = [
    {
      title: "100% Admission Assistance",
      description:
        "Complete support from university selection to documentation and admission.",
      icon: <FaUniversity />,
    },
    {
      title: "Free Career Counseling",
      description:
        "Expert guidance to choose the best MBBS destination and career path.",
      icon: <FaComments />,
    },
    {
      title: "95% Visa Success Rate",
      description:
        "Professional visa assistance with documentation and travel support.",
      icon: <FaPlaneDeparture />,
    },
    {
      title: "University & Course Selection",
      description:
        "Choose the best medical universities matched to goals and budget.",
      icon: <FaUserGraduate />,
    },
    {
      title: "Personalized Guidance",
      description:
        "One-to-one mentorship for every student throughout the process.",
      icon: <FaShieldAlt />,
    },
    {
      title: "Pre-Departure Support",
      description:
        "Accommodation, travel and orientation assistance before departure.",
      icon: <FaGlobeAsia />,
    },
  ];

  return (
    <Section spacing="md" className="relative bg-white overflow-hidden">

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 sm:gap-8 items-start">
        {/* LEFT STICKY */}
        <div className="lg:sticky top-header-gap">
          <SectionHeading
            align="left"
            className="!mb-0"
            eyebrow="Our Premium Services"
            title={
              <>
                Services At <span className="text-accent-600">Future Mind Educare</span>
              </>
            }
            description="Complete MBBS admission guidance for India and abroad, with trusted support at every step."
          />
          <button
            onClick={openPopup}
            className="group mt-4 inline-flex items-center gap-2 bg-brand-950 hover:bg-brand-900 text-white font-bold h-11 px-6 rounded-full text-sm transition-colors duration-300"
          >
            Get Free Counseling
            <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* RIGHT COMPACT CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-3.5 hover:bg-brand-950 hover:border-brand-900 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-lg bg-accent-100 group-hover:bg-accent-400 text-brand-950 group-hover:text-brand-950 flex items-center justify-center text-sm shrink-0 transition-colors duration-300">
                {service.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-brand-950 group-hover:text-white font-bold text-sm leading-snug transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 group-hover:text-slate-300 text-xs leading-5 mt-0.5 line-clamp-2 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
              <FaArrowRight className="ml-auto mt-1 text-slate-300 group-hover:text-accent-400 transition-all duration-300 text-[10px] shrink-0 group-hover:translate-x-0.5" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ServicesSection;
