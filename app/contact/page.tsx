"use client"
import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'mbbs-abroad',
    neetScore: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
        neetScore: formData.neetScore
      };
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', service: 'mbbs-abroad', neetScore: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Phone",
      details: ["+91 98765 43210", "+91 87654 32109"],
      color: "text-blue-600"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      details: ["info@futuremindeducare.com", "admission@futuremindeducare.com"],
      color: "text-green-600"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      details: ["123, MG Road, Andheri West", "Mumbai, Maharashtra 400058"],
      color: "text-red-600"
    },
    {
      icon: FaClock,
      title: "Working Hours",
      details: ["Monday - Saturday: 9:00 AM - 7:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
      color: "text-purple-600"
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, link: "#", color: "text-blue-600" },
    { icon: FaInstagram, link: "#", color: "text-pink-600" },
    { icon: FaTwitter, link: "#", color: "text-sky-400" },
    { icon: FaLinkedin, link: "#", color: "text-blue-700" },
    { icon: FaYoutube, link: "#", color: "text-red-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get in touch with FUTURE MIND EDUCARE for expert MBBS admission guidance and counseling
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4`}>
                <info.icon className={`w-8 h-8 ${info.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
              <div className="space-y-1">
                {info.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="text-gray-600 text-sm">{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                Something went wrong. Please try again later.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your NEET score (if applicable)"
                  min="0"
                  max="720"
                />
              </div>

              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24">
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

          {/* Map and Additional Info */}
          <div className="space-y-8">
            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Location</h3>
              <div className="rounded-lg overflow-hidden h-64">
                <iframe
                  src="https://share.google/wy9AJuMuQVABHu5eV"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Quick Help?</h3>
              <p className="text-gray-600 mb-6">
                Call us directly for immediate assistance with MBBS admissions and counseling.
              </p>
              <div className="space-y-4">
                <a href="tel:+919876543210" className="flex items-center space-x-3 text-blue-600 hover:text-blue-700">
                  <FaPhone className="w-5 h-5" />
                  <span className="font-semibold">+91 98765 43210</span>
                </a>
                <a href="mailto:info@futuremindeducare.com" className="flex items-center space-x-3 text-green-600 hover:text-green-700">
                  <FaEnvelope className="w-5 h-5" />
                  <span className="font-semibold">info@futuremindeducare.com</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
              <p className="text-gray-600 mb-6">
                Stay updated with latest MBBS admission news and updates.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${social.color} hover:bg-gray-200 transition-colors`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
