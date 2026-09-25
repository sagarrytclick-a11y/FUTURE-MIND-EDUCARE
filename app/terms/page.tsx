"use client";

import React from "react";
import {
  FaFileContract,
  FaShieldAlt,
  FaGavel,
  FaUserShield,
  FaArrowRight,
} from "react-icons/fa";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { SITE_IDENTITY } from "@/app/config/site_identity";

const TermsPage: React.FC = () => {
  const sections = [
    {
      id: "service",
      icon: FaFileContract,
      title: "Terms of Service",
      content: [
        "By using FUTURE MIND EDUCARE services, you agree to follow all terms and policies mentioned on this website.",
        "These terms apply to all visitors, students, parents, and users accessing our services.",
        "If you disagree with any part of these terms, please discontinue using our platform.",
      ],
    },
    {
      id: "responsibilities",
      icon: FaUserShield,
      title: "User Responsibilities",
      content: [
        "Provide accurate educational and personal information.",
        "Submit valid documents during the admission process.",
        "Avoid misuse of our website, forms, or counseling services.",
        "Respect confidentiality and communication guidelines.",
      ],
    },
    {
      id: "services",
      icon: FaShieldAlt,
      title: "Service Terms",
      content: [
        "We provide MBBS admission guidance for India and abroad.",
        "Admission depends on eligibility, NEET score, documentation, and seat availability.",
        "We assist with counseling, college selection, and admission support.",
        "Service charges may vary depending on the selected program.",
      ],
    },
    {
      id: "disclaimer",
      icon: FaGavel,
      title: "Legal Disclaimer",
      content: [
        "All information on this website is for educational guidance purposes only.",
        "College fees, rankings, and admission policies may change without prior notice.",
        "Students are advised to verify details directly with universities.",
        "FUTURE MIND EDUCARE is not responsible for third-party policy changes.",
      ],
    },
  ];

  const additionalTerms = [
    {
      title: "Payment Policy",
      points: [
        "Payments must be completed as per the agreed schedule.",
        "Late payments may lead to delays in services.",
        "Processing fees are non-refundable once services begin.",
      ],
    },
    {
      title: "Privacy & Data",
      points: [
        "Your personal data is securely stored and protected.",
        "We never sell student information to third parties.",
        "Student details may only be shared with partner universities.",
      ],
    },
    {
      title: "Cancellation & Refund",
      points: [
        "Cancellation requests must be submitted in writing.",
        "Refunds are processed according to company policy.",
        "Certain service and registration charges are non-refundable.",
      ],
    },
    {
      title: "Intellectual Property",
      points: [
        "All website content belongs to FUTURE MIND EDUCARE.",
        "Unauthorized copying or reproduction is prohibited.",
        "Brand assets and logos are legally protected.",
      ],
    },
  ];

  const toc = [
    { href: "#overview", label: "Overview" },
    ...sections.map((s) => ({ href: `#${s.id}`, label: s.title })),
    { href: "#policies", label: "Detailed Policies" },
    { href: "#help", label: "Need Help?" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        align="center"
        variant="light"
        eyebrow="FUTURE MIND EDUCARE"
        title="Terms &"
        highlight="Conditions"
        description="Please read our terms carefully before using our services. These guidelines help ensure a safe and transparent experience for all students and parents."
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]}
      />

      <Section spacing="md">
        {/* CENTERED TOC + doc sections */}
        <div>
          <div className="mx-auto w-full max-w-4xl">
            {/* CENTERED TOC PILLS */}
            <nav className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-600">Contents</p>
              <ol className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {toc.map((item, i) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="flex items-baseline gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-accent-400 hover:bg-accent-100 hover:text-brand-950"
                    >
                      <span className="text-xs font-bold text-accent-600">{String(i + 1).padStart(2, "0")}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-xs text-gray-600">
                Last Updated{" "}
                <span className="font-bold text-brand-950">
                  {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </p>
            </nav>

            <div className="min-w-0">
            <div id="overview" className="mt-6 scroll-mt-header rounded-3xl border border-slate-200 bg-white p-5 text-center sm:p-6">
              <h2 className="text-brand-950 font-extrabold tracking-tight text-lg sm:text-xl mb-2">Important Information</h2>
              <p className="mx-auto max-w-2xl text-sm text-gray-600 leading-relaxed">
                By accessing this website and using our counseling services, you agree to comply with all applicable terms, policies, and legal requirements. Our mission is to provide transparent, ethical, and professional MBBS admission guidance.
              </p>
            </div>

            <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {sections.map((section, index) => (
                <li
                  key={section.id}
                  id={section.id}
                  className="group scroll-mt-header rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-900 hover:shadow-lg"
                >
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-400 text-sm font-extrabold text-brand-950 transition-colors duration-300 group-hover:bg-brand-950 group-hover:text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-3 flex items-center justify-center gap-2 text-brand-950 font-extrabold tracking-tight text-base sm:text-lg">
                    <section.icon className="text-sm text-accent-600" />
                    {section.title}
                  </h3>
                  <ul className="mx-auto mt-2.5 max-w-md space-y-2 text-left">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"></span>
                        <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <div id="policies" className="mt-6 scroll-mt-header overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="bg-brand-900 px-5 py-4 text-center text-white">
                <h2 className="font-extrabold tracking-tight !text-white text-lg sm:text-xl">Detailed Policies</h2>
                <p className="mx-auto mt-1 max-w-2xl text-sm text-slate-300">Additional policies regarding payments, refunds, privacy, and student responsibilities.</p>
              </div>
              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                {additionalTerms.map((term, index) => (
                  <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                    <h3 className="mb-2 flex items-center justify-center gap-2 text-sm font-extrabold tracking-tight text-brand-950">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-100 text-brand-950">
                        <FaArrowRight size={12} />
                      </span>
                      {term.title}
                    </h3>
                    <ul className="space-y-2">
                      {term.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-950"></span>
                          <p className="text-sm text-gray-600 leading-relaxed">{point}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div id="help" className="mt-6 scroll-mt-header rounded-3xl bg-brand-950 p-5 text-center text-white sm:p-6">
              <h2 className="mb-2 font-extrabold tracking-tight !text-white text-lg sm:text-xl">Need Help With Our <span className="text-accent-400">Terms?</span></h2>
              <p className="mx-auto mb-5 max-w-2xl text-sm leading-relaxed text-slate-300">
                Our support team is available to answer your questions related to admissions, policies, refunds, and counseling services.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <a
                  href={`mailto:${SITE_IDENTITY.contact.email}`}
                  className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center transition-colors duration-300 hover:border-accent-400 hover:bg-white/15"
                >
                  <p className="mb-0.5 text-xs text-gray-300">Email</p>
                  <h3 className="truncate text-sm font-bold">{SITE_IDENTITY.contact.email}</h3>
                </a>
                <a
                  href={`tel:+91${SITE_IDENTITY.contact.phone}`}
                  className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center transition-colors duration-300 hover:border-accent-400 hover:bg-white/15"
                >
                  <p className="mb-0.5 text-xs text-gray-300">Phone</p>
                  <h3 className="text-sm font-bold">+91 {SITE_IDENTITY.contact.phone}</h3>
                </a>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center">
                  <p className="mb-0.5 text-xs text-gray-300">Office</p>
                  <h3 className="text-sm font-bold leading-snug">
                    {SITE_IDENTITY.address.building}, {SITE_IDENTITY.address.landmark},<br />
                    {SITE_IDENTITY.address.area}, {SITE_IDENTITY.address.city} {SITE_IDENTITY.address.pincode}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-300">
                    Mon - Sat: {SITE_IDENTITY.officeHours.mondayToSaturday}
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default TermsPage;
