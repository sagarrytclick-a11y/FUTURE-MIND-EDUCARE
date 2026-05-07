"use client"
import React, { useState } from 'react';
import { usePopup } from '../contexts/PopupContext';
import { FaUser, FaEnvelope, FaPhoneAlt, FaGraduationCap } from "react-icons/fa";

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

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={closePopup}
      />

      {/* Popup */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] animate-popup">

        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-7 py-7 text-white">

          <div className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

          <button
            onClick={closePopup}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur hover:bg-white/25 transition"
          >
            ✕
          </button>

          <h2 className="text-3xl font-bold">
            Free MBBS Counselling
          </h2>

          <p className="mt-2 text-sm text-blue-100">
            Fill your details and our expert counsellor will contact you shortly.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-7 max-h-[75vh] overflow-y-auto"
        >

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Full Name
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
              <FaUser className="text-gray-400" />

              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  handleInputChange('name', e.target.value)
                }
                placeholder="Enter your full name"
                className="h-12 w-full bg-transparent px-3 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
              <FaEnvelope className="text-gray-400" />

              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  handleInputChange('email', e.target.value)
                }
                placeholder="example@gmail.com"
                className="h-12 w-full bg-transparent px-3 outline-none"
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Mobile Number
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
              <FaPhoneAlt className="text-gray-400" />

              <input
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) =>
                  handleInputChange('mobile', e.target.value)
                }
                placeholder="+91 9876543210"
                className="h-12 w-full bg-transparent px-3 outline-none"
              />
            </div>
          </div>

          {/* Course */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Course Interested
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
              <FaGraduationCap className="text-gray-400" />

              <select
                required
                value={formData.courseInterest}
                onChange={(e) =>
                  handleInputChange('courseInterest', e.target.value)
                }
                className="h-12 w-full bg-transparent px-3 outline-none"
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
            <label className="mb-2 block text-sm font-semibold text-gray-700">
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
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-13 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-300 disabled:opacity-70"
          >
            {isSubmitting
              ? 'Submitting...'
              : submitStatus === 'success'
              ? 'Submitted Successfully ✓'
              : submitStatus === 'error'
              ? 'Something Went Wrong'
              : 'Get Free Consultation'}
          </button>

          <p className="text-center text-xs leading-relaxed text-gray-500">
            By continuing, you agree to our privacy policy and terms & conditions.
          </p>
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