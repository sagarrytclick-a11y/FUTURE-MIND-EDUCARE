"use client"
import React, { useState } from 'react';
import { usePopup } from '../contexts/PopupContext';
import { FaUser, FaEnvelope, FaPhoneAlt, FaGraduationCap, FaShieldAlt, FaStar } from "react-icons/fa";
import { SITE_IDENTITY } from "@/app/config/site_identity";

const ContactPopup: React.FC = () => {
  const { isOpen, closePopup, formData, updateFormData, resetForm } = usePopup();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');

        setTimeout(() => {
          closePopup();
          resetForm();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }
  };

  const handleInputChange = (
    field: 'name' | 'email' | 'mobile' | 'courseInterest' | 'neetScore',
    value: string
  ) => {
    updateFormData({ [field]: value });
  };

  if (!isOpen) return null;

  const fieldWrap =
    "flex items-center rounded-xl border border-gray-200 bg-gray-50 px-3.5 focus-within:border-brand-900 focus-within:bg-white transition-colors";
  const fieldInput = "h-11 w-full bg-transparent px-2.5 text-sm outline-none placeholder:text-gray-400";
  const labelClass = "mb-1.5 block text-xs font-semibold text-gray-700";

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={closePopup}
      />

      {/* Popup */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] animate-popup">

        {/* Header */}
        <div className="relative overflow-hidden bg-brand-950 px-5 py-5 text-white">

          <div className="absolute -top-10 right-0 h-32 w-32 rounded-2xl bg-white/10 blur-3xl"></div>

          <button
            onClick={closePopup}
            aria-label="Close"
            className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 backdrop-blur hover:bg-white/25 transition text-sm"
          >
            ✕
          </button>

          <h2 className="text-xl font-extrabold tracking-tight">
            Free MBBS Counselling
          </h2>

          <p className="mt-1 text-sm text-blue-100">
            Fill your details and our expert counsellor will contact you shortly.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-5 max-h-[75vh] overflow-y-auto"
        >

          {/* Name */}
          <div>
            <label className={labelClass}>
              Full Name
            </label>

            <div className={fieldWrap}>
              <FaUser className="text-gray-400 text-xs shrink-0" />

              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  handleInputChange('name', e.target.value)
                }
                placeholder="Enter your full name"
                className={fieldInput}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>
              Email Address
            </label>

            <div className={fieldWrap}>
              <FaEnvelope className="text-gray-400 text-xs shrink-0" />

              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  handleInputChange('email', e.target.value)
                }
                placeholder="example@gmail.com"
                className={fieldInput}
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className={labelClass}>
              Mobile Number
            </label>

            <div className={fieldWrap}>
              <FaPhoneAlt className="text-gray-400 text-xs shrink-0" />

              <input
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) =>
                  handleInputChange('mobile', e.target.value)
                }
                placeholder="+91 9876543210"
                className={fieldInput}
              />
            </div>
          </div>

          {/* Course */}
          <div>
            <label className={labelClass}>
              Course Interested
            </label>

            <div className={fieldWrap}>
              <FaGraduationCap className="text-gray-400 text-xs shrink-0" />

              <select
                required
                value={formData.courseInterest}
                onChange={(e) =>
                  handleInputChange('courseInterest', e.target.value)
                }
                className={`${fieldInput} bg-transparent`}
              >
                <option value="">Select Course</option>
                <option value="mbbs-india">MBBS India</option>
                <option value="mbbs-abroad">MBBS Abroad</option>
                <option value="md-ms-bds">MD / MS / BDS</option>
              </select>
            </div>
          </div>

          {/* NEET */}
          <div>
            <label className={labelClass}>
              NEET Score
            </label>

            <input
              type="number"
              required
              min="0"
              max="720"
              value={formData.neetScore}
              onChange={(e) =>
                handleInputChange('neetScore', e.target.value)
              }
              placeholder="Enter your score"
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm outline-none focus:border-brand-800 focus:bg-white transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand-950 hover:bg-brand-900 px-6 text-white text-sm font-semibold shadow-md transition-colors disabled:opacity-70"
          >
            {isSubmitting
              ? 'Submitting...'
              : submitStatus === 'success'
              ? 'Submitted Successfully ✓'
              : submitStatus === 'error'
              ? 'Something Went Wrong'
              : 'Get Free Consultation'}
          </button>

          {/* TRUST STRIP — replaces filler consent text */}
          <div className="rounded-2xl border border-accent-100 bg-accent-100/40 px-3.5 py-3 text-center">
            <p className="flex items-center justify-center gap-1.5 text-xs font-bold text-brand-950">
              <FaShieldAlt className="text-[11px] text-accent-600" />
              100% confidential — no spam, ever
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-gray-600">
              Your details are only used by our MBBS counselors to help you.
            </p>
            <a
              href={SITE_IDENTITY.contact.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600 transition-colors hover:text-brand-950"
            >
              <span className="flex items-center gap-0.5 text-amber-400">
                <FaStar className="text-[9px]" />
                <FaStar className="text-[9px]" />
                <FaStar className="text-[9px]" />
                <FaStar className="text-[9px]" />
                <FaStar className="text-[9px]" />
              </span>
              4.2 · 115 Google reviews
            </a>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes popup {
          0% {
            opacity: 0;
            transform: scale(0.92) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-popup {
          animation: popup 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default ContactPopup;
