"use client"
import React, { useState } from 'react';
import { usePopup } from '../contexts/PopupContext';
import { FaUser, FaEnvelope, FaPhoneAlt, FaGraduationCap } from "react-icons/fa";
import {
  EnquiryErrors,
  getFirstError,
  normalizeMobile,
  normalizeNeetScore,
  validateEnquiry,
} from "@/lib/validation";

const ContactPopup: React.FC = () => {
  const { isOpen, closePopup, formData, updateFormData, resetForm } = usePopup();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const validation = validateEnquiry(
      {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        courseInterest: formData.courseInterest,
        neetScore: formData.neetScore,
      },
      { neetRequired: true }
    );

    if (!validation.ok) {
      setErrors(validation.errors);
      setSubmitError(getFirstError(validation.errors));
      setSubmitStatus('error');
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validation.data),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setSubmitStatus('success');

        setTimeout(() => {
          closePopup();
          resetForm();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        if (result.errors) setErrors(result.errors);
        setSubmitError(result.error || 'Something went wrong. Please try again.');
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error(error);
      setSubmitError('Network error. Please check your connection and try again.');
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
    const sanitized =
      field === 'mobile'
        ? normalizeMobile(value).slice(0, 10)
        : field === 'neetScore'
          ? normalizeNeetScore(value).replace(/\D/g, '').slice(0, 3)
          : value;

    updateFormData({ [field]: sanitized });
    setErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev));
    setSubmitError('');
  };

  if (!isOpen) return null;

  const fieldWrap = (hasError?: string) =>
    `flex items-center rounded-xl bg-gray-50 px-3.5 focus-within:bg-white focus-within:ring-2 transition-colors ${
      hasError
        ? 'focus-within:ring-red-400'
        : 'focus-within:ring-brand-900/20'
    }`;
  const fieldInput = "h-11 w-full bg-transparent px-2.5 text-sm outline-none placeholder:text-gray-400";
  const labelClass = "mb-1.5 block text-xs font-semibold text-gray-700";
  const errorTextClass = "mt-1.5 text-xs font-medium text-red-600";

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

          <p className="mt-1 text-sm text-brand-100">
            Fill your details and our expert counsellor will contact you shortly.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 p-5 max-h-[75vh] overflow-y-auto"
        >

          {/* Name */}
          <div>
            <label className={labelClass} htmlFor="popup-name">
              Full Name
            </label>

            <div className={fieldWrap(errors.name)}>
              <FaUser className="text-gray-400 text-xs shrink-0" />

              <input
                id="popup-name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  handleInputChange('name', e.target.value)
                }
                autoComplete="name"
                maxLength={80}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'popup-name-error' : undefined}
                placeholder="Enter your full name"
                className={fieldInput}
              />
            </div>
            {errors.name && (
              <p id="popup-name-error" className={errorTextClass}>{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className={labelClass} htmlFor="popup-email">
              Email Address
            </label>

            <div className={fieldWrap(errors.email)}>
              <FaEnvelope className="text-gray-400 text-xs shrink-0" />

              <input
                id="popup-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  handleInputChange('email', e.target.value)
                }
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'popup-email-error' : undefined}
                placeholder="example@gmail.com"
                className={fieldInput}
              />
            </div>
            {errors.email && (
              <p id="popup-email-error" className={errorTextClass}>{errors.email}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className={labelClass} htmlFor="popup-mobile">
              Mobile Number
            </label>

            <div className={fieldWrap(errors.mobile)}>
              <FaPhoneAlt className="text-gray-400 text-xs shrink-0" />

              <input
                id="popup-mobile"
                type="tel"
                value={formData.mobile}
                onChange={(e) =>
                  handleInputChange('mobile', e.target.value)
                }
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                aria-invalid={Boolean(errors.mobile)}
                aria-describedby={errors.mobile ? 'popup-mobile-error' : undefined}
                placeholder="9876543210"
                className={fieldInput}
              />
            </div>
            {errors.mobile && (
              <p id="popup-mobile-error" className={errorTextClass}>{errors.mobile}</p>
            )}
          </div>

          {/* Course */}
          <div>
            <label className={labelClass} htmlFor="popup-course">
              Course Interested
            </label>

            <div className={fieldWrap(errors.courseInterest)}>
              <FaGraduationCap className="text-gray-400 text-xs shrink-0" />

              <select
                id="popup-course"
                value={formData.courseInterest}
                onChange={(e) =>
                  handleInputChange('courseInterest', e.target.value)
                }
                aria-invalid={Boolean(errors.courseInterest)}
                aria-describedby={errors.courseInterest ? 'popup-course-error' : undefined}
                className={`${fieldInput} bg-transparent`}
              >
                <option value="">Select Course</option>
                <option value="mbbs-india">MBBS India</option>
                <option value="mbbs-abroad">MBBS Abroad</option>
                <option value="md-ms-bds">MD / MS / BDS</option>
              </select>
            </div>
            {errors.courseInterest && (
              <p id="popup-course-error" className={errorTextClass}>{errors.courseInterest}</p>
            )}
          </div>

          {/* NEET */}
          <div>
            <label className={labelClass} htmlFor="popup-neet">
              NEET Score
            </label>

            <input
              id="popup-neet"
              type="number"
              min={0}
              max={720}
              step={1}
              inputMode="numeric"
              value={formData.neetScore}
              onChange={(e) =>
                handleInputChange('neetScore', e.target.value)
              }
              aria-invalid={Boolean(errors.neetScore)}
              aria-describedby={errors.neetScore ? 'popup-neet-error' : undefined}
              placeholder="Enter your score (out of 720)"
              className={`h-11 w-full rounded-xl bg-gray-50 px-3.5 text-sm outline-none placeholder:text-gray-400 transition-all focus:bg-white focus:ring-2 ${
                errors.neetScore
                  ? 'focus:ring-red-400'
                  : 'focus:ring-brand-900/20'
              }`}
            />
            {errors.neetScore && (
              <p id="popup-neet-error" className={errorTextClass}>{errors.neetScore}</p>
            )}
          </div>

          {submitError && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-700">
              {submitError}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-brand-950 px-6 text-brand-950 text-sm font-semibold disabled:opacity-70"
          >
            {isSubmitting
              ? 'Submitting...'
              : submitStatus === 'success'
              ? 'Submitted Successfully ✓'
              : submitStatus === 'error'
              ? 'Something Went Wrong'
              : 'Get Free Consultation'}
          </button>

      
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
