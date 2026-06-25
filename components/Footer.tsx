"use client"
import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';
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

  const mbbsIndiaLinks = [
    { name: "MBBS In Delhi", href: "/colleges/mbbs-india?state=delhi" },
    { name: "MBBS In Maharashtra", href: "/colleges/mbbs-india?state=maharashtra" },
    { name: "MBBS In Uttar Pradesh", href: "/colleges/mbbs-india?state=uttar-pradesh" },
    { name: "MBBS In Karnataka", href: "/colleges/mbbs-india?state=karnataka" },
    { name: "MBBS In Tamil Nadu", href: "/colleges/mbbs-india?state=tamil-nadu" },
    { name: "MBBS In Kerala", href: "/colleges/mbbs-india?state=kerala" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      href: "https://facebook.com"
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      href: "https://twitter.com"
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      href: "https://linkedin.com"
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      href: "https://instagram.com"
    }
  ];

  return (
    <footer className="bg-[#071B3B] text-white pt-20 pb-8 px-4 relative overflow-hidden">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-lg"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/10 blur-3xl rounded-lg"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10 pb-14">

          {/* Company */}
          <div>
            <img
              src="/logo.png"
              alt="Future Mind Educare"
              className="h-16 w-auto mb-5"
            />

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              FUTURE MIND EDUCARE helps students achieve their dream of
              studying MBBS in India & Abroad with expert counseling,
              admission support, and visa guidance.
            </p>

            <button
              onClick={openPopup}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get Free Counseling
            </button>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">
              Useful Links
            </h3>

            <ul className="space-y-3">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* MBBS India */}
          <div>
            <h3 className="text-xl font-bold mb-6">
              MBBS in India
            </h3>

            <ul className="space-y-3">
              {mbbsIndiaLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">
              Contact Info
            </h3>

            <div className="space-y-5 text-sm">

              <div className="flex items-start gap-3">
                <div className="bg-blue-600/20 p-2 rounded-lg mt-1">
                  <FaMapMarkerAlt className="text-blue-400" />
                </div>

                <p className="text-gray-300 leading-relaxed">
                  B Wing-107, Rustomjee Central Park,
                  Andheri East, Mumbai - 400069
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-blue-600/20 p-2 rounded-lg">
                  <FaPhoneAlt className="text-blue-400" />
                </div>

                <p className="text-gray-300">
                  +91 9920798988
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-blue-600/20 p-2 rounded-lg">
                  <FaEnvelope className="text-blue-400" />
                </div>

                <p className="text-gray-300">
                  edufuturemind@gmail.com
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-8">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-11 h-11 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-lg">
                    {social.icon}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="py-10 border-b border-white/10">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
            <h4 className="text-2xl font-bold mb-4 text-white">
              Disclaimer
            </h4>

            <p className="text-gray-300 leading-relaxed text-sm">
              FUTURE MIND EDUCARE provides counseling and admission guidance
              services for MBBS aspirants. Admission depends on eligibility,
              merit, and seat availability. Students are advised to verify
              details directly from universities and official authorities.
            </p>

            <p className="text-gray-400 text-sm mt-4">
              We do not collect fees on behalf of universities. Beware of fraud
              and contact us directly for authentic guidance.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} FUTURE MIND EDUCARE. All Rights Reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Designed for Future Doctors ❤️
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;