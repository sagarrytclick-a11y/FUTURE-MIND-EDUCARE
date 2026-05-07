"use client";

import React from "react";
import {
  FaFileContract,
  FaShieldAlt,
  FaGavel,
  FaUserShield,
  FaArrowRight,
} from "react-icons/fa";

const TermsPage: React.FC = () => {
  const sections = [
    {
      icon: FaFileContract,
      title: "Terms of Service",
      content: [
        "By using FUTURE MIND EDUCARE services, you agree to follow all terms and policies mentioned on this website.",
        "These terms apply to all visitors, students, parents, and users accessing our services.",
        "If you disagree with any part of these terms, please discontinue using our platform.",
      ],
    },
    {
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

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#2563eb] py-24">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/20 blur-3xl rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm mb-6">
            FUTURE MIND EDUCARE
          </span>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Terms & <span className="text-cyan-300">Conditions</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-blue-100 leading-relaxed">
            Please read our terms carefully before using our services. These
            guidelines help ensure a safe and transparent experience for all
            students and parents.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Important Information
              </h2>

              <p className="text-gray-600 leading-relaxed max-w-3xl">
                By accessing this website and using our counseling services,
                you agree to comply with all applicable terms, policies, and
                legal requirements. Our mission is to provide transparent,
                ethical, and professional MBBS admission guidance.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 min-w-[250px] border border-blue-100">
              <p className="text-sm text-gray-500 mb-2">Last Updated</p>
              <h3 className="text-xl font-bold text-blue-700">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN TERMS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform">
                <section.icon />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {section.title}
              </h3>

              <div className="space-y-4">
                {section.content.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-2 w-2 h-2 rounded-full bg-blue-600 shrink-0"></div>
                    <p className="text-gray-600 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DETAILED TERMS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-cyan-600 px-8 py-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Detailed Policies</h2>
            <p className="text-blue-100">
              Additional policies regarding payments, refunds, privacy, and
              student responsibilities.
            </p>
          </div>

          <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            {additionalTerms.map((term, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <FaArrowRight size={14} />
                  </span>
                  {term.title}
                </h3>

                <div className="space-y-3">
                  {term.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-2 w-2 h-2 rounded-full bg-cyan-500 shrink-0"></div>
                      <p className="text-gray-600 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f172a] to-[#1d4ed8] p-10 md:p-14 text-white shadow-2xl">
          <div className="absolute right-0 top-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Need Help With Our Terms?
            </h2>

            <p className="text-blue-100 max-w-2xl leading-relaxed mb-8">
              Our support team is available to answer your questions related to
              admissions, policies, refunds, and counseling services.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <p className="text-sm text-blue-200 mb-1">Email</p>
                <h3 className="font-semibold text-lg">
                  info@futuremindeducare.com
                </h3>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <p className="text-sm text-blue-200 mb-1">Phone</p>
                <h3 className="font-semibold text-lg">
                  +91 98765 43210
                </h3>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <p className="text-sm text-blue-200 mb-1">Office</p>
                <h3 className="font-semibold text-lg">
                  Mumbai, Maharashtra
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;