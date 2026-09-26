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
    <footer className="bg-brand-950 text-white pt-12 pb-6 px-4 relative overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Top stats strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-white/10 pb-8 mb-10 text-center">
          <div>
            <div className="text-2xl font-extrabold text-white">5000<span className="text-accent-400">+</span></div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-400">Students Counselled</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white">15<span className="text-accent-400">+</span></div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-400">Years Experience</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white">50<span className="text-accent-400">+</span></div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-400">Partner Colleges</div>
          </div>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-white/10 pb-10">

          {/* Company */}
          <div>
            <img
              src="/logo.png"
              alt="Future Mind Educare"
              className="h-12 w-auto mb-4"
            />

            <p className="text-slate-300 text-sm leading-relaxed mb-5">
              FUTURE MIND EDUCARE helps students achieve their dream of
              studying MBBS in India & Abroad with expert counseling,
              admission support, and visa guidance.
            </p>

            <button
              onClick={openPopup}
              className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-brand-950 hover:bg-brand-900 text-white text-sm font-bold transition-colors"
            >
              Get Free Counseling
            </button>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              Useful Links
            </h3>

            <ul className="space-y-2.5">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* MBBS India */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              MBBS in India
            </h3>

            <ul className="space-y-2.5">
              {mbbsIndiaLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              Contact Info
            </h3>

            <div className="space-y-4 text-sm">

              <div className="flex items-start gap-2.5">
                <div className="bg-white/10 p-2 rounded-xl mt-0.5">
                  <FaMapMarkerAlt className="text-accent-400 text-xs" />
                </div>

                <p className="text-slate-300 leading-relaxed text-sm">
                  B Wing-107, Rustomjee Central Park,
                  Andheri East, Mumbai - 400069
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="bg-white/10 p-2 rounded-xl">
                  <FaPhoneAlt className="text-accent-400 text-xs" />
                </div>

                <p className="text-slate-300 text-sm">
                  +91 9920798988
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="bg-white/10 p-2 rounded-xl">
                  <FaEnvelope className="text-accent-400 text-xs" />
                </div>

                <p className="text-slate-300 text-sm">
                  edufuturemind@gmail.com
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-2.5 mt-6">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-brand-950 transition-colors"
                >
                  <span className="text-sm">
                    {social.icon}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="py-8 border-b border-white/10">
          <div className="border border-white/15 rounded-2xl p-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              Disclaimer
            </h4>

            <p className="text-slate-300 leading-relaxed text-xs">
              FUTURE MIND EDUCARE provides counseling and admission guidance
              services for MBBS aspirants. Admission depends on eligibility,
              merit, and seat availability. Students are advised to verify
              details directly from universities and official authorities.
            </p>

            <p className="text-slate-400 text-xs mt-3">
              We do not collect fees on behalf of universities. Beware of fraud
              and contact us directly for authentic guidance.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-slate-400 text-xs text-center md:text-left">
            © {new Date().getFullYear()} FUTURE MIND EDUCARE. All Rights Reserved.
          </p>

          <p className="text-slate-500 text-xs">
            Designed for Future Doctors
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
