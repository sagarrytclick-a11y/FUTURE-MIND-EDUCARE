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
} from "react-icons/fa";

const PrivacyPage: React.FC = () => {
  const privacySections = [
    {
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

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')] bg-cover"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg mb-6">
              <FaLock className="text-cyan-300" />
              <span className="text-sm font-medium">
                Your Data is Safe & Protected
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              Privacy <span className="text-cyan-300">Policy</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              At FUTURE MIND EDUCARE, we value your trust and are committed to
              protecting your personal information with industry-standard
              security practices.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl px-6 py-4">
                <h3 className="text-2xl font-bold">100%</h3>
                <p className="text-sm text-blue-100">Secure Data Handling</p>
              </div>

              <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl px-6 py-4">
                <h3 className="text-2xl font-bold">24/7</h3>
                <p className="text-sm text-blue-100">Security Monitoring</p>
              </div>

              <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl px-6 py-4">
                <h3 className="text-2xl font-bold">SSL</h3>
                <p className="text-sm text-blue-100">Encrypted Platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 -mt-14 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-5">
            Our Commitment to Privacy
          </h2>

          <p className="text-gray-600 leading-relaxed text-lg">
            We understand the importance of your personal information and take
            every measure to ensure it remains protected. This Privacy Policy
            explains how we collect, use, and secure your data while providing
            educational counseling and admission support services.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {[
              "Secure Servers",
              "Encrypted Data",
              "Confidential Handling",
              "Trusted Services",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold"
              >
                <FaCheckCircle />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {privacySections.map((section, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-6">
                <section.icon className="text-3xl text-blue-700" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-5">
                {section.title}
              </h3>

              <div className="space-y-4">
                {section.content.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="mt-2 w-2.5 h-2.5 rounded-lg bg-cyan-500 shrink-0"></span>
                    <p className="text-gray-600 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Policies Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
              Policies & Rights
            </span>

            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Your Rights & Policies
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              We believe in transparency and giving users complete control over
              their personal information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {policies.map((policy, index) => (
              <div
                key={index}
                className="bg-[#f8fbff] border border-blue-100 rounded-3xl p-8 hover:shadow-xl transition duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {policy.title}
                </h3>

                <div className="space-y-4">
                  {policy.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                      <p className="text-gray-600">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-800 to-cyan-700 rounded-[32px] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-lg blur-3xl"></div>

            <div className="relative z-10">
              <span className="inline-block bg-white/10 border border-white/20 px-4 py-2 rounded-lg text-sm font-semibold mb-5">
                Need Assistance?
              </span>

              <h2 className="text-4xl font-black mb-5">
                Have Questions About Privacy?
              </h2>

              <p className="text-blue-100 max-w-2xl text-lg leading-relaxed mb-10">
                Our support team is available to help you understand how your
                information is collected, stored, and protected.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <FaEnvelope className="text-xl" />
                    </div>

                    <div>
                      <p className="text-sm text-blue-100">Email Support</p>
                      <h4 className="font-bold text-lg">
                        privacy@futuremindeducare.com
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <FaPhoneAlt className="text-xl" />
                    </div>

                    <div>
                      <p className="text-sm text-blue-100">Call Us</p>
                      <h4 className="font-bold text-lg">
                        +91 98765 43210
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-blue-100 text-sm mt-8">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;