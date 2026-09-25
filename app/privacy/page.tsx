"use client";

import React from "react";
import {
  FaShieldAlt,
  FaLock,
  FaUserSecret,
  FaDatabase,
  FaCheckCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { SITE_IDENTITY } from "@/app/config/site_identity";

const PrivacyPage: React.FC = () => {
  const privacySections = [
    {
      id: "collect",
      icon: FaShieldAlt,
      title: "Information We Collect",
      content: [
        "Personal details like name, email, phone number and address",
        "Academic information including NEET score and qualifications",
        "Communication records from calls, emails and inquiries",
        "Website usage and analytics data",
        "Payment and transaction details for services"
      ],
    },
    {
      id: "use",
      icon: FaLock,
      title: "How We Use Your Information",
      content: [
        "Provide admission guidance and counseling",
        "Process applications and documentation",
        "Share important updates and notifications",
        "Improve our platform and services",
        "Maintain security and prevent misuse"
      ],
    },
    {
      id: "protection",
      icon: FaUserSecret,
      title: "Your Privacy Protection",
      content: [
        "Your data is encrypted and securely stored",
        "Only authorized staff can access information",
        "Regular security monitoring and updates",
        "Strict confidentiality practices",
        "No unauthorized sharing of personal data"
      ],
    },
    {
      id: "sharing",
      icon: FaDatabase,
      title: "Data Sharing Policy",
      content: [
        "We never sell your personal data",
        "Information is shared only for admission purposes",
        "Trusted service providers follow confidentiality rules",
        "Legal authorities may receive data if required by law",
        "Analytics data remains anonymous"
      ],
    },
  ];

  const policies = [
    {
      title: "Your Rights",
      points: [
        "Request access to your data",
        "Correct inaccurate information",
        "Request deletion of your information",
        "Opt out of marketing communication",
      ],
    },
    {
      title: "Cookies Policy",
      points: [
        "Cookies improve website functionality",
        "Analytics help us understand user behavior",
        "You can disable cookies in browser settings",
        "Some features may not work without cookies",
      ],
    },
    {
      title: "Data Retention",
      points: [
        "Data is stored only when necessary",
        "Inactive records are periodically removed",
        "Financial records are retained as per regulations",
        "Secure backups are maintained",
      ],
    },
  ];

  const toc = [
    { href: "#commitment", label: "Our Commitment" },
    ...privacySections.map((s) => ({ href: `#${s.id}`, label: s.title })),
    { href: "#rights", label: "Your Rights & Policies" },
    { href: "#contact", label: "Contact Support" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        align="center"
        variant="light"
        eyebrow="Your Data is Safe & Protected"
        title="Privacy"
        highlight="Policy"
        description="At FUTURE MIND EDUCARE, we value your trust and are committed to protecting your personal information with industry-standard security practices."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <Section spacing="md">
        {/* CENTERED TOC + doc sections */}
        <div className="mx-auto w-full max-w-4xl">
          <nav className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-600">On this page</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              {toc.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-accent-400 hover:bg-accent-100 hover:text-brand-950"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-600">
              Last Updated{" "}
              <span className="font-bold text-brand-950">
                {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </p>
          </nav>

          <div className="min-w-0">
            <div id="commitment" className="mt-6 scroll-mt-header rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center sm:p-6">
              <h2 className="mb-2 text-brand-950 font-extrabold tracking-tight text-lg sm:text-xl">Our Commitment to <span className="text-accent-600">Privacy</span></h2>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600">
                We understand the importance of your personal information and take
                every measure to ensure it remains protected. This Privacy Policy
                explains how we collect, use, and secure your data while providing
                educational counseling and admission support services.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {["Secure Servers", "Encrypted Data", "Confidential Handling", "Trusted Services"].map((item, index) => (
                  <span key={index} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600">
                    <FaCheckCircle className="text-xs text-accent-600" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {privacySections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="group scroll-mt-header rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-900 hover:shadow-lg"
                >
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-400 text-brand-950 transition-colors duration-300 group-hover:bg-brand-950 group-hover:text-white">
                    <section.icon className="text-base" />
                  </span>
                  <h3 className="mt-3 text-brand-950 font-extrabold tracking-tight text-base sm:text-lg">
                    {section.title}
                  </h3>
                  <ul className="mx-auto mt-2.5 max-w-md space-y-2 text-left">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"></span>
                        <p className="text-sm leading-relaxed text-gray-600">{item}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <section id="rights" className="mt-6 scroll-mt-header rounded-3xl border border-slate-200 bg-white p-5 text-center sm:p-6">
              <h2 className="text-brand-950 font-extrabold tracking-tight text-lg sm:text-xl">Your Rights &amp; <span className="text-accent-600">Policies</span></h2>
              <p className="mx-auto mt-1 max-w-2xl text-sm text-gray-600">We believe in transparency and giving users complete control over their personal information.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {policies.map((policy, index) => (
                  <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                    <h3 className="mb-2 text-sm font-extrabold tracking-tight text-brand-950">{policy.title}</h3>
                    <ul className="space-y-2">
                      {policy.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <FaCheckCircle className="mt-0.5 shrink-0 text-xs text-accent-600" />
                          <p className="text-sm text-gray-600">{point}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section id="contact" className="mt-6 scroll-mt-header rounded-3xl bg-brand-900 p-5 text-center text-white sm:p-6">
              <h2 className="mb-2 font-extrabold tracking-tight !text-white text-lg sm:text-xl">Have Questions About <span className="text-accent-400">Privacy?</span></h2>
              <p className="mx-auto mb-5 max-w-2xl text-sm leading-relaxed text-slate-300">
                Our support team is available to help you understand how your information is collected, stored, and protected.
              </p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <a
                  href={`mailto:${SITE_IDENTITY.contact.email}`}
                  className="rounded-2xl border border-white/20 bg-white/10 p-5 text-center transition-colors duration-300 hover:border-accent-400 hover:bg-white/15"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-400 text-brand-950">
                      <FaEnvelope />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-300">Email Support</p>
                      <h4 className="truncate text-sm font-bold">{SITE_IDENTITY.contact.email}</h4>
                    </div>
                  </div>
                </a>
                <a
                  href={`tel:+91${SITE_IDENTITY.contact.phone}`}
                  className="rounded-2xl border border-white/20 bg-white/10 p-5 text-center transition-colors duration-300 hover:border-accent-400 hover:bg-white/15"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-400 text-brand-950">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <p className="text-xs text-slate-300">Call Us</p>
                      <h4 className="text-sm font-bold">+91 {SITE_IDENTITY.contact.phone}</h4>
                    </div>
                  </div>
                </a>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-400 text-brand-950">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-xs text-slate-300">Office</p>
                      <h4 className="text-sm font-bold leading-snug">
                        {SITE_IDENTITY.address.area}, {SITE_IDENTITY.address.city} {SITE_IDENTITY.address.pincode}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PrivacyPage;
