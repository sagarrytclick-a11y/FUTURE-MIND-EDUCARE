"use client"
import React from 'react';
import { FaFileContract, FaShieldAlt, FaGavel, FaUserShield } from 'react-icons/fa';

const TermsPage: React.FC = () => {
  const sections = [
    {
      icon: FaFileContract,
      title: "Terms of Service",
      content: [
        "By accessing and using FUTURE MIND EDUCARE's website and services, you accept and agree to be bound by the terms and provision of this agreement.",
        "These Terms and Conditions apply to all users of the Service, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.",
        "If you do not agree with any of these terms, you are prohibited from using or accessing this site."
      ]
    },
    {
      icon: FaUserShield,
      title: "User Responsibilities",
      content: [
        "Users must provide accurate and complete information when using our counseling services.",
        "Users must not share false or misleading information about their academic qualifications.",
        "Users must cooperate with our team during the admission process and provide necessary documents in a timely manner.",
        "Users must respect the confidentiality of our processes and not share proprietary information with third parties."
      ]
    },
    {
      icon: FaShieldAlt,
      title: "Service Terms",
      content: [
        "FUTURE MIND EDUCARE provides counseling and guidance services for MBBS admissions in India and abroad.",
        "Our services include college selection assistance, application guidance, documentation support, and counseling.",
        "We do not guarantee admission to any specific college or university. Admission is subject to merit, eligibility criteria, and seat availability.",
        "Our fees are non-refundable once services have been rendered, except as specified in our refund policy."
      ]
    },
    {
      icon: FaGavel,
      title: "Legal Disclaimers",
      content: [
        "The information provided on our website is for general informational purposes only.",
        "We do not guarantee the accuracy, completeness, or reliability of any information provided.",
        "We are not responsible for any errors or omissions in the content of our website.",
        "Users must verify all information directly with the respective colleges and universities."
      ]
    }
  ];

  const additionalTerms = [
    {
      title: "Payment Terms",
      points: [
        "All fees must be paid as per the payment schedule agreed upon at the time of enrollment.",
        "Payments can be made through bank transfer, check, or online payment methods.",
        "Late payments may attract additional charges as per our policy.",
        "Service fees are non-refundable except in cases specified in our refund policy."
      ]
    },
    {
      title: "Privacy Policy",
      points: [
        "We collect and use personal information as described in our Privacy Policy.",
        "User information is kept confidential and not shared with third parties without consent.",
        "We implement appropriate security measures to protect user data.",
        "Users have the right to access and modify their personal information."
      ]
    },
    {
      title: "Cancellation Policy",
      points: [
        "Users can cancel services within 7 days of enrollment for a full refund.",
        "Cancellations after 7 days are subject to a cancellation fee as per our policy.",
        "No refunds will be provided after services have been rendered.",
        "Refund processing may take 15-20 working days."
      ]
    },
    {
      title: "Intellectual Property",
      points: [
        "All content on this website is the property of FUTURE MIND EDUCARE.",
        "Users may not reproduce, distribute, or create derivative works without permission.",
        "Our brand name, logo, and trademarks are protected under intellectual property laws.",
        "Unauthorized use of our intellectual property may result in legal action."
      ]
    },
    {
      title: "Limitation of Liability",
      points: [
        "FUTURE MIND EDUCARE shall not be liable for any direct, indirect, or consequential damages.",
        "Our liability is limited to the amount paid for our services.",
        "We are not responsible for delays or failures in admission processes beyond our control.",
        "Users agree to indemnify us against any claims arising from their use of our services."
      ]
    },
    {
      title: "Dispute Resolution",
      points: [
        "Any disputes shall be resolved through mutual discussion and negotiation.",
        "If disputes cannot be resolved amicably, they shall be subject to Mumbai jurisdiction.",
        "Users agree to attempt alternative dispute resolution before legal action.",
        "Legal proceedings, if any, shall be conducted in Mumbai courts only."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Please read our terms and conditions carefully before using our services
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to FUTURE MIND EDUCARE. These Terms and Conditions govern your use of our website and services. 
            By accessing or using our services, you agree to be bound by these terms. Please read them carefully 
            as they contain important information about your rights and obligations.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Main Terms Sections */}
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <section.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <div className="space-y-3">
                  {section.content.map((point, pointIndex) => (
                    <p key={pointIndex} className="text-gray-600 leading-relaxed">
                      {point}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Additional Terms */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Detailed Terms</h3>
          <div className="space-y-8">
            {additionalTerms.map((term, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">{term.title}</h4>
                <ul className="space-y-2">
                  {term.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Questions About Our Terms?</h3>
          <p className="text-blue-800 mb-6">
            If you have any questions about these Terms and Conditions, please don't hesitate to contact us.
          </p>
          <div className="space-y-2 text-blue-800">
            <p><strong>Email:</strong> info@futuremindeducare.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> 123, MG Road, Andheri West, Mumbai - 400058</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
