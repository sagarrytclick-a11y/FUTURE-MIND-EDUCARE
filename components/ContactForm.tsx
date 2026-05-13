"use client"
import React, { useState } from 'react';
import { SITE_IDENTITY } from '../app/config/site_identity';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: 'mbbs-abroad',
    neetScore: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('🚀 Form submission started');
    console.log('📋 Form data:', formData);
    
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        courseInterest: formData.service,
        neetScore: formData.neetScore,
        message: formData.message
      };
      
      console.log('📤 Sending payload:', payload);
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('📬 Response status:', response.status);
      const data = await response.json();
      console.log('📬 Response data:', data);

      if (response.ok) {
        console.log('✅ Form submitted successfully');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          service: 'mbbs-abroad',
          neetScore: ''
        });
        alert('Thank you for your inquiry! We will contact you within 24 hours.');
      } else {
        console.error('❌ Form submission failed:', data.error);
        alert(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('❌ Form submission error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
      console.log('🏁 Form submission process ended');
    }
  };

  return (
    <section className="py-12 sm:py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Have questions about MBBS admissions? Fill out the form below and 
            our expert counselors will get back to you with personalized guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Interest
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="mbbs-abroad">MBBS Abroad</option>
                  <option value="mbbs-india">MBBS India</option>
                  <option value="neet-ug">NEET UG Counseling</option>
                  <option value="neet-pg">NEET PG Counseling</option>
                  <option value="general-inquiry">General Inquiry</option>
                </select>
              </div>

              {/* NEET Score Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NEET Score
                </label>
                <input
                  type="number"
                  name="neetScore"
                  value={formData.neetScore}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter your NEET score (if applicable)"
                  min="0"
                  max="720"
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                  placeholder="Tell us about your MBBS admission requirements..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 rounded-full" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 4-8v4a8 8 0 0-8 8zm0 4a8 8 0 0 8 4z"/>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  'Submit Inquiry'
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-900 text-white rounded-xl p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact Information</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <div>
                  <p className="font-semibold text-sm sm:text-base">Phone:</p>
                  <p className="text-blue-200 text-sm sm:text-base break-words">{SITE_IDENTITY.contact.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <div>
                  <p className="font-semibold text-sm sm:text-base">Email:</p>
                  <p className="text-blue-200 text-sm sm:text-base break-words">{SITE_IDENTITY.contact.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <p className="font-semibold text-sm sm:text-base">Address:</p>
                  <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
                    {SITE_IDENTITY.address.building}, {SITE_IDENTITY.address.landmark}, {SITE_IDENTITY.address.area}, {SITE_IDENTITY.address.city} - {SITE_IDENTITY.address.pincode}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Office Hours */}
            <div className="pt-4 sm:pt-6 border-t border-blue-800">
              <h4 className="font-semibold mb-2 text-sm sm:text-base">Office Hours</h4>
              <p className="text-blue-200 text-sm sm:text-base">Monday - Saturday: {SITE_IDENTITY.officeHours.mondayToSaturday}</p>
              <p className="text-blue-200 text-sm sm:text-base">Sunday: {SITE_IDENTITY.officeHours.sunday}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
