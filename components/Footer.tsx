"use client"
import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { usePopup } from '../contexts/PopupContext';
import Link from 'next/link';

const Footer: React.FC = () => {
  const { openPopup } = usePopup();
  const usefulLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" }
  ];

  const mbbsAbroadLinks = [
    { name: "Study MBBS In Kazakhstan", href: "/country/kazakhstan" },
    { name: "Study MBBS In Bangladesh", href: "/country/bangladesh" },
    { name: "Study MBBS In Georgia", href: "/country/georgia" },
    { name: "Study MBBS In Philippines", href: "/country/philippines" },
    { name: "Study MBBS In Russia", href: "/country/russia" },
    { name: "Study MBBS In Uzbekistan", href: "/country/uzbekistan" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: <FaFacebook />, href: "https://facebook.com/futuremindeducare" },
    { name: "Twitter", icon: <FaTwitter />, href: "https://twitter.com/futuremindeducare" },
    { name: "LinkedIn", icon: <FaLinkedin />, href: "https://linkedin.com/company/futuremindeducare" },
    { name: "Instagram", icon: <FaInstagram />, href: "https://instagram.com/futuremindeducare" }
  ];

  return (
    <footer className="bg-blue-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            {/* Logo */}
            <img
              src="/logo.png"
              alt="FUTURE MIND EDUCARE"
              className="h-25 object-contain w-auto"
            />
            
            {/* Description */}
            <p className="text-blue-100 text-sm leading-relaxed">
              Welcome to FUTURE MIND EDUCARE, your trusted partner for MBBS admissions 
              in India and abroad. We provide comprehensive guidance and support to help 
              aspiring medical students achieve their dreams from our Mumbai office.
            </p>
            
            {/* Get Guidance Button */}
            <button 
              onClick={openPopup}
              className="flex items-center bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
            >
              Get Guidance
            </button>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: MBBS Abroad */}
          <div>
            <h3 className="text-lg font-bold mb-4">MBBS Abroad</h3>
            <ul className="space-y-2">
              {mbbsAbroadLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4">Get In Touch</h3>
            
            {/* Contact Information */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <span className="mr-2">📍</span>
                <span className="text-blue-100">
                  B WING-107, Rustomjee Central Park, Near Western Express Highway Metro Station, Opp Kanakia Wall Street, Andheri East, Mumbai 400069
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📞</span>
                <span className="text-blue-100">+91-7076909090</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✉️</span>
                <span className="text-blue-100">info@futuremindeducare.com</span>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3 pt-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
                  aria-label={social.name}
                >
                  <span className="text-lg text-white">{social.icon}</span>
                </Link>
              ))}
            </div>
            
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-blue-800">
          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold mb-3 text-white">Disclaimer</h4>
            <p className="text-blue-100 text-sm leading-relaxed">
              FUTURE MIND EDUCARE provides counseling and guidance services for MBBS admissions. We do not guarantee admission to any specific college or university. 
              Admission is subject to merit, eligibility criteria, and seat availability of respective institutions. 
              Information provided on our website is for general informational purposes only. 
              Users are advised to verify all information directly with the concerned colleges/universities. 
              We are not responsible for any decisions made based on the information provided.
            </p>
            <p className="text-blue-100 text-sm leading-relaxed mt-3">
              <strong>Important:</strong> All fees paid to FUTURE MIND EDUCARE are for counseling and guidance services only. 
              We do not collect any fees on behalf of colleges/universities. 
              Please be aware of fraudulent activities and report any suspicious behavior immediately.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-blue-200 text-sm">
            © {new Date().getFullYear()} FUTURE MIND EDUCARE. All rights reserved.
          </p>
          <p className="text-blue-300 text-xs mt-2">
            Designed with ❤️ for medical aspirants
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
