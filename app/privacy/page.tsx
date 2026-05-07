"use client"
import React from 'react';
import { FaShieldAlt, FaLock, FaUserSecret, FaDatabase, FaCookie, FaEyeSlash } from 'react-icons/fa';

const PrivacyPage: React.FC = () => {
  const privacySections = [
    {
      icon: FaShieldAlt,
      title: "Information We Collect",
      content: [
        "Personal Information: Name, email, phone number, address, and educational qualifications",
        "Academic Information: NEET scores, academic records, and educational background",
        "Communication Data: Emails, phone calls, and messages exchanged with our team",
        "Usage Data: Website interactions, pages visited, and time spent on our platform",
        "Payment Information: Bank details, transaction records, and payment history"
      ]
    },
    {
      icon: FaLock,
      title: "How We Use Your Information",
      content: [
        "Provide personalized counseling and guidance services",
        "Process admission applications and documentation",
        "Communicate important updates and information",
        "Improve our services and user experience",
        "Comply with legal and regulatory requirements"
      ]
    },
    {
      icon: FaUserSecret,
      title: "Data Protection Measures",
      content: [
        "SSL encryption for all data transmissions",
        "Secure servers with restricted access",
        "Regular security audits and updates",
        "Employee training on data protection",
        "Compliance with data protection regulations"
      ]
    },
    {
      icon: FaDatabase,
      title: "Data Sharing Policy",
      content: [
        "We do not sell or rent your personal information to third parties",
        "Information is shared only with partner colleges for admission purposes",
        "Data may be shared with service providers under strict confidentiality agreements",
        "Government authorities may be provided information as required by law",
        "Analytics tools may collect anonymous usage data"
      ]
    }
  ];

  const rightsAndPolicies = [
    {
      title: "Your Rights",
      points: [
        "Access to your personal information",
        "Correction of inaccurate data",
        "Deletion of your information upon request",
        "Restriction of data processing",
        "Data portability to other services",
        "Objection to marketing communications"
      ]
    },
    {
      title: "Cookies Policy",
      points: [
        "We use essential cookies for website functionality",
        "Analytics cookies help us improve user experience",
        "Marketing cookies personalize content and advertisements",
        "You can control cookie preferences through browser settings",
        "Disabling cookies may affect website functionality",
        "Cookie consent is obtained upon first visit"
      ]
    },
    {
      title: "Data Retention",
      points: [
        "Personal information is retained only as long as necessary",
        "Student records are kept for 7 years after graduation",
        "Financial records are maintained for 10 years as required",
        "Inactive accounts are deleted after 2 years",
        "Data is securely destroyed when no longer needed",
        "Backup copies are maintained for disaster recovery"
      ]
    },
    {
      title: "Third-Party Services",
      points: [
        "Payment gateways for secure transactions",
        "Email services for communication",
        "Cloud storage for data backup",
        "Analytics platforms for website optimization",
        "Social media integration for marketing",
        "All third parties undergo security vetting"
      ]
    },
    {
      title: "Children's Privacy",
      points: [
        "Our services are intended for users 18 years and above",
        "We do not knowingly collect information from minors",
        "Parental consent is required for users under 18",
        "Special protection is provided for minor data",
        "Educational institutions may provide consent on behalf of students",
        "We comply with children's online privacy protection laws"
      ]
    },
    {
      title: "International Data Transfer",
      points: [
        "Data may be transferred to countries where partner colleges are located",
        "International transfers comply with applicable laws",
        "Adequate protection measures are in place for cross-border data",
        "Standard contractual clauses are used for international transfers",
        "Data subjects are informed of international transfers",
        "EU data transfers follow GDPR requirements"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Privacy Commitment</h2>
          <p className="text-gray-600 leading-relaxed">
            At FUTURE MIND EDUCARE, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            By using our services, you agree to the collection and use of information in accordance with this policy.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Main Privacy Sections */}
        {privacySections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <section.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.content.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                      <span className="text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Rights and Policies */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Your Rights and Our Policies</h3>
          <div className="space-y-8">
            {rightsAndPolicies.map((policy, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">{policy.title}</h4>
                <ul className="space-y-2">
                  {policy.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                      <span className="text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Security Measures */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
              <FaLock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Security Measures</h3>
              <p className="text-gray-600 mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Technical Security</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 256-bit SSL encryption</li>
                    <li>• Secure server infrastructure</li>
                    <li>• Regular security updates</li>
                    <li>• Intrusion detection systems</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Administrative Security</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Employee background checks</li>
                    <li>• Regular security training</li>
                    <li>• Access control policies</li>
                    <li>• Confidentiality agreements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Privacy Questions?</h3>
          <p className="text-blue-800 mb-6">
            If you have any questions about this Privacy Policy or want to exercise your data rights, please contact us.
          </p>
          <div className="space-y-2 text-blue-800">
            <p><strong>Privacy Officer:</strong> privacy@futuremindeducare.com</p>
            <p><strong>General Contact:</strong> info@futuremindeducare.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> 123, MG Road, Andheri West, Mumbai - 400058</p>
          </div>
          <p className="text-blue-800 mt-4 text-sm">
            We will respond to your privacy inquiries within 7 working days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
