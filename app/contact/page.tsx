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
  FaStar,
} from "react-icons/fa";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";

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

  const socialLinks = [
    { icon: FaFacebookF, link: "#" },
    { icon: FaInstagram, link: "#" },
    { icon: FaTwitter, link: "#" },
    { icon: FaLinkedinIn, link: "#" },
    { icon: FaYoutube, link: "#" },
  ];

  const inputClass =
    "w-full h-11 px-5 rounded-full border border-slate-200 text-sm focus:border-brand-800 focus:ring-2 focus:ring-accent-100 outline-none transition-all bg-white";
  const labelClass = "block text-xs font-bold text-accent-600 uppercase tracking-wide mb-1.5";

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        align="center"
        variant="light"
        eyebrow="FUTURE MIND EDUCARE"
        title="Let's Build Your"
        highlight="Medical Career"
        description="Connect with expert counselors for MBBS admissions in India & Abroad. We guide you through counseling, admissions, visas, scholarships, and everything in between."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section spacing="md">
        {/* QUICK CONTACT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {[
            {
              icon: FaPhone,
              label: "Phone",
              value: SITE_IDENTITY.contact.phone,
              href: `tel:${SITE_IDENTITY.contact.phone.replace(/[^0-9+]/g, "")}`,
            },
            {
              icon: FaEnvelope,
              label: "Email",
              value: SITE_IDENTITY.contact.email,
              href: `mailto:${SITE_IDENTITY.contact.email}`,
            },
            {
              icon: FaMapMarkerAlt,
              label: "Office",
              value: `${SITE_IDENTITY.address.area}, ${SITE_IDENTITY.address.city}`,
            },
            {
              icon: FaClock,
              label: "Open Hours",
              value: `Mon - Sat : ${SITE_IDENTITY.officeHours.mondayToSaturday}`,
            },
          ].map((item) => {
            const Icon = item.icon;
            const inner = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-600 transition-colors duration-300 group-hover:bg-accent-400 group-hover:text-brand-950">
                  <Icon className="text-sm" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wide text-gray-500">
                    {item.label}
                  </span>
                  <span className="block text-sm font-bold text-brand-950 truncate">
                    {item.value}
                  </span>
                </span>
              </>
            );

            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-900 hover:shadow-lg"
              >
                {inner}
              </a>
            ) : (
              <div
                key={item.label}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-900 hover:shadow-lg"
              >
                {inner}
              </div>
            );
          })}
        </div>

        {/* Split: brand-950 info panel + form */}
        <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
          {/* Left info panel */}
          <aside className="flex flex-col rounded-3xl bg-brand-950 p-5 text-white">
            <h2 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg !text-white">Contact Information</h2>
            <p className="mt-1 text-sm leading-relaxed text-gray-300">
              Have questions about MBBS admissions? Our expert counselors will get back to you within 24 hours.
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-400 text-brand-950">
                  <FaPhone className="text-xs" />
                </span>
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-wide text-gray-400">Phone</span>
                  <span className="font-bold">{SITE_IDENTITY.contact.phone}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-400 text-brand-950">
                  <FaEnvelope className="text-xs" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-wide text-gray-400">Email</span>
                  <a
                    href={`mailto:${SITE_IDENTITY.contact.email}`}
                    className="block truncate font-bold transition-colors hover:text-accent-400"
                  >
                    {SITE_IDENTITY.contact.email}
                  </a>
                  <span className="mt-0.5 block text-xs text-gray-300">
                    Mon - Sat, {SITE_IDENTITY.officeHours.mondayToSaturday}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-400 text-brand-950">
                  <FaMapMarkerAlt className="text-xs" />
                </span>
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-wide text-gray-400">Address</span>
                  <span className="text-sm leading-relaxed text-gray-200">
                    {SITE_IDENTITY.address.area}, {SITE_IDENTITY.address.city}, Maharashtra - {SITE_IDENTITY.address.pincode}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-400 text-brand-950">
                  <FaClock className="text-xs" />
                </span>
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-wide text-gray-400">Office Hours</span>
                  <span className="block text-sm text-gray-200">Mon - Sat : {SITE_IDENTITY.officeHours.mondayToSaturday}</span>
                  <span className="block text-sm text-gray-200">Sunday : {SITE_IDENTITY.officeHours.sunday}</span>
                </span>
              </li>
            </ul>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  `${SITE_IDENTITY.address.building}, ${SITE_IDENTITY.address.landmark}, ${SITE_IDENTITY.address.area}, ${SITE_IDENTITY.address.city} ${SITE_IDENTITY.address.pincode}`
                )}&output=embed`}
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
                className="h-40 w-full"
              />
            </div>
            <a
              href={SITE_IDENTITY.contact.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-3 transition-colors duration-300 hover:border-accent-400 hover:bg-white/10"
            >
              <span>
                <span className="flex items-center gap-0.5 text-amber-400 text-[11px]">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </span>
                <span className="mt-0.5 block text-xs font-bold text-white">4.2 · 115 Google reviews</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-accent-400">
                Write a review
                <FaArrowRight className="text-[9px]" />
              </span>
            </a>

            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">Follow Us</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent-400 hover:text-brand-950"
                  >
                    <social.icon className="text-sm" />
                  </a>
                ))}
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href={`tel:${SITE_IDENTITY.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-brand-950 transition-colors hover:bg-accent-100"
                >
                  <FaPhone className="text-xs" /> Call Now
                </a>
                <a
                  href={`mailto:${SITE_IDENTITY.contact.email}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  <FaEnvelope className="text-xs" /> Mail Us
                </a>
              </div>
            </div>
          </aside>

          {/* Right form */}
          <div
            id="contact-form"
            className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm"
          >
            <SectionHeading
              align="center"
              eyebrow="Contact Us"
              title="Get in Touch"
              description="Fill out the form and our expert counselor will contact you within 24 hours."
              className="mb-5"
            />

            {submitStatus === "success" && (
              <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                Your inquiry has been submitted successfully.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                Something went wrong. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={inputClass}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="mbbs-abroad">MBBS Abroad</option>
                    <option value="mbbs-india">MBBS India</option>
                    <option value="neet-ug">NEET UG Counseling</option>
                    <option value="neet-pg">NEET PG Counseling</option>
                    <option value="general-inquiry">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>
                    NEET Score
                  </label>
                  <input
                    type="number"
                    name="neetScore"
                    min="0"
                    max="720"
                    value={formData.neetScore}
                    onChange={handleChange}
                    placeholder="Enter your NEET score (if applicable)"
                    className={inputClass}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent-400 text-sm font-bold text-brand-950 transition-all duration-300 hover:bg-accent-500 hover:shadow-lg disabled:opacity-70"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Inquiry
                    <FaArrowRight className="text-xs" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ContactPage;
