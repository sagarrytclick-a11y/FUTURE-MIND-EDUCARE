"use client";

import React, { useState } from "react";
import { SITE_IDENTITY } from "../config/site_identity";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaArrowRight,
  FaUserGraduate,
} from "react-icons/fa";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "mbbs-abroad",
    neetScore: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        courseInterest: formData.service,
        neetScore: formData.neetScore,
      };

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus("success");

        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "mbbs-abroad",
          neetScore: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Call Us",
      details: [SITE_IDENTITY.contact.phone],
      bg: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: [
        SITE_IDENTITY.contact.email,
        "admission@futuremindeducare.com",
      ],
      bg: "from-emerald-500 to-green-500",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Office",
      details: [
        `${SITE_IDENTITY.address.area}, ${SITE_IDENTITY.address.city}`,
        `Maharashtra - ${SITE_IDENTITY.address.pincode}`,
      ],
      bg: "from-rose-500 to-red-500",
    },
    {
      icon: FaClock,
      title: "Working Hours",
      details: [
        `Mon - Sat : ${SITE_IDENTITY.officeHours.mondayToSaturday}`,
        `Sunday : ${SITE_IDENTITY.officeHours.sunday}`,
      ],
      bg: "from-violet-500 to-purple-500",
    },
  ];

  const socialLinks = [
    {
      icon: FaFacebookF,
      link: "#",
      hover: "hover:bg-blue-600",
    },
    {
      icon: FaInstagram,
      link: "#",
      hover: "hover:bg-pink-600",
    },
    {
      icon: FaTwitter,
      link: "#",
      hover: "hover:bg-sky-500",
    },
    {
      icon: FaLinkedinIn,
      link: "#",
      hover: "hover:bg-blue-700",
    },
    {
      icon: FaYoutube,
      link: "#",
      hover: "hover:bg-red-600",
    },
  ];

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-lg blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-lg blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* LEFT */}
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-5 py-2 rounded-lg text-sm font-medium backdrop-blur-md mb-6">
                <FaUserGraduate />
                FUTURE MIND EDUCARE
              </span>

              <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
                Let’s Build Your
                <span className="block text-cyan-300">
                  Medical Career
                </span>
              </h1>

              <p className="text-lg text-blue-100 leading-relaxed max-w-xl mb-8">
                Connect with expert counselors for MBBS admissions in India &
                Abroad. We guide you through counseling, admissions, visas,
                scholarships, and everything in between.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${SITE_IDENTITY.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="bg-white text-[#0B2447] hover:bg-cyan-300 px-7 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-xl"
                >
                  Call Now
                </a>

                <a
                  href="#contact-form"
                  className="border border-white/30 hover:bg-white/10 px-7 py-4 rounded-2xl font-semibold transition-all duration-300"
                >
                  Get Free Counseling
                </a>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="relative">
              <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-5">
                  {contactInfo.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/10 rounded-2xl p-5 border border-white/10 hover:scale-105 transition-all duration-300"
                    >
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.bg} flex items-center justify-center mb-4`}
                      >
                        <item.icon className="text-white text-xl" />
                      </div>

                      <h3 className="font-bold text-lg mb-2">
                        {item.title}
                      </h3>

                      {item.details.map((detail, i) => (
                        <p
                          key={i}
                          className="text-sm text-blue-100 leading-relaxed"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-10">
          {/* FORM */}
          <div
            id="contact-form"
            className="bg-white rounded-[32px] p-8 md:p-10 shadow-xl border border-gray-100"
          >
            <div className="mb-8">
              <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
                Contact Form
              </span>

              <h2 className="text-4xl font-black text-gray-900 mt-2 mb-4">
                Get Free MBBS Counseling
              </h2>

              <p className="text-gray-600 leading-relaxed">
                Fill out the form and our expert counselor will contact you
                within 24 hours.
              </p>
            </div>

            {submitStatus === "success" && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-2xl">
                Your inquiry has been submitted successfully.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl">
                Something went wrong. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your number"
                    className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Interested In
                  </label>

                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  >
                    <option value="mbbs-abroad">MBBS Abroad</option>
                    <option value="mbbs-india">MBBS India</option>
                    <option value="neet-ug">NEET UG Counseling</option>
                    <option value="neet-pg">NEET PG Counseling</option>
                    <option value="general-inquiry">
                      General Inquiry
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    NEET Score
                  </label>

                  <input
                    type="number"
                    name="neetScore"
                    min="0"
                    max="720"
                    value={formData.neetScore}
                    onChange={handleChange}
                    placeholder="e.g. 620"
                    className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.01] transition-all duration-300 text-white font-bold shadow-xl flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Inquiry
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">
            {/* MAP */}
            <div className="bg-white rounded-[32px] p-6 shadow-xl border border-gray-100 overflow-hidden">
              <h3 className="text-2xl font-black text-gray-900 mb-4">
                Visit Our Office
              </h3>

              <div className="rounded-3xl overflow-hidden h-[350px]">
                <iframe
                  src="https://www.google.com/maps?q=Mumbai&output=embed"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  style={{ border: 0 }}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* QUICK CONTACT */}
            <div className="bg-gradient-to-br from-[#071952] to-[#19376D] rounded-[32px] p-8 text-white shadow-2xl">
              <h3 className="text-3xl font-black mb-4">
                Need Immediate Help?
              </h3>

              <p className="text-blue-100 mb-8 leading-relaxed">
                Speak directly with our MBBS admission experts for quick
                counseling support.
              </p>

              <div className="space-y-5">
                <a
                  href={`tel:${SITE_IDENTITY.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-4 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                    <FaPhone />
                  </div>

                  <div>
                    <p className="text-sm text-blue-200">Call Us</p>
                    <h4 className="font-bold text-lg">
                      {SITE_IDENTITY.contact.phone}
                    </h4>
                  </div>
                </a>

                <a
                  href={`mailto:${SITE_IDENTITY.contact.email}`}
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-4 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center">
                    <FaEnvelope />
                  </div>

                  <div>
                    <p className="text-sm text-blue-200">Mail Us</p>
                    <h4 className="font-bold text-lg">
                      {SITE_IDENTITY.contact.email}
                    </h4>
                  </div>
                </a>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="bg-white rounded-[32px] p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                Follow Us
              </h3>

              <p className="text-gray-600 mb-6">
                Stay updated with MBBS admissions, NEET counseling, and medical
                career tips.
              </p>

              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className={`w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700 ${social.hover} hover:text-white transition-all duration-300 hover:-translate-y-1`}
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;