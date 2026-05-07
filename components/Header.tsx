'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaInstagram, FaFacebook, FaLinkedin,
  FaEnvelope, FaChevronDown, FaBars, FaTimes, FaPhoneAlt
} from 'react-icons/fa';
import { usePopup } from '../contexts/PopupContext';
import Image from 'next/image';

interface State {
  id: number;
  name: string;
  image: string;
  description: string;
  colleges: College[];
}

interface Country {
  id: number;
  name: string;
  flag: string;
  image: string;
  description: string;
  universities: number;
  courses: string;
  colleges: College[];
}

interface College {
  id: number;
  name: string;
  city: string;
  fees: string;
  image: string;
}

const Header = () => {
  const { openPopup } = usePopup();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredItemData, setHoveredItemData] = useState<State | Country | null>(null);
  
  const [indiaStates, setIndiaStates] = useState<State[]>([]);
  const [abroadCountries, setAbroadCountries] = useState<Country[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Brand Colors
  const colors = {
    primary: '#2563EB',
    secondary: '#2563EB',
    bgDark: '#12141D', // High-end dark from your palette
    textMuted: '#94A3B8'
  };

  // 1. Navigation Configuration
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'MBBS India', href: '/colleges/mbbs-india', hasDropdown: true },
    { name: 'MBBS Abroad', href: '/colleges/mbbs-abroad', hasDropdown: true },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const fetchData = async (type: 'india' | 'abroad') => {
    try {
      const url = type === 'india' ? '/mbbs-india.json' : '/mbbs-abroad.json';
      const res = await fetch(url);
      const data = await res.json();
      if (type === 'india') {
        setIndiaStates(data.states.slice(0, 8));
        setHoveredItemData(data.states[0]);
      } else {
        setAbroadCountries(data.countries.slice(0, 8));
        setHoveredItemData(data.countries[0]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
    if (name === 'MBBS India' && indiaStates.length === 0) fetchData('india');
    if (name === 'MBBS Abroad' && abroadCountries.length === 0) fetchData('abroad');
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredItemData(null);
    }, 200);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div style={{ backgroundColor: colors.bgDark }} className="py-3 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center text-md space-x-4">
            <FaInstagram className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
            <FaFacebook className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
            <FaLinkedin className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
          </div>
          <div className="hidden text-md md:flex items-center space-x-6 font-medium" style={{ color: colors.textMuted }}>
            <a href="tel:+919876543210" className="flex items-center hover:text-white transition-colors">
              <FaPhoneAlt className="mr-2" style={{ color: colors.secondary }} /> +91 98765 43210
            </a>
            <a href="mailto:info@mbbsguide.com" className="flex items-center hover:text-white transition-colors">
              <FaEnvelope className="mr-2" style={{ color: colors.secondary }} /> info@mbbsguide.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="FM Education" width={50} height={50} />
            <span className="text-xl font-bold tracking-tight text-gray-900 uppercase">
             FM EDUCATION
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((item) => (
              <div 
                key={item.name} 
                className="relative py-7"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link 
                  href={item.href}
                  className={`flex items-center font-semibold transition-colors ${activeDropdown === item.name ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  {item.name}
                  {item.hasDropdown && <FaChevronDown className="ml-1 text-[10px]" />}
                </Link>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {activeDropdown === item.name && item.hasDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-[78px] left-[-150px] w-[700px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex"
                    >
                      {/* Left Sidebar */}
                      <div className="w-1/3 bg-gray-50 p-4 border-r border-gray-100">
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Select Location</p>
                        <div className="space-y-1">
                          {(item.name === 'MBBS India' ? indiaStates : abroadCountries).map((loc: State | Country) => (
                            <div
                              key={loc.id}
                              onMouseEnter={() => setHoveredItemData(loc)}
                              className={`p-3 rounded-xl cursor-pointer transition-all flex items-center ${hoveredItemData?.id === loc.id ? 'bg-white shadow-md' : 'hover:bg-gray-100'}`}
                            >
                              <img src={loc.image || (loc as any).flag} alt={loc.name} className="w-6 h-4 rounded-sm mr-3 object-cover" />
                              <span className={`text-sm font-medium ${hoveredItemData?.id === loc.id ? 'text-blue-600' : 'text-gray-700'}`}>{loc.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Panel */}
                      <div className="w-2/3 p-6 bg-white">
                        {hoveredItemData ? (
                          <motion.div key={hoveredItemData.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-bold text-lg text-gray-900">Top Colleges in {hoveredItemData.name}</h3>
                              <Link href={item.href} className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all">View All</Link>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                              {hoveredItemData.colleges?.slice(0, 4).map((college: College) => {
                                const collegeSlug = college.name
                                  .toLowerCase()
                                  .replace(/[^a-z0-9\s]/g, '')
                                  .replace(/\s+/g, '-')
                                  .replace(/-+/g, '-')
                                  .replace(/^-|-$/g, '');
                                
                                return (
                                <Link href={`/colleges/${collegeSlug}`} key={college.id} className="group flex items-center p-2 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50/50 transition-all">
                                  <img src={college.image} alt={college.name} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                                  <div className="ml-3 text-left">
                                    <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 line-clamp-1">{college.name}</p>
                                    <p className="text-[11px] text-gray-500 font-medium">{college.city} • <span className="text-blue-500">{college.fees}</span></p>
                                  </div>
                                </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        ) : (
                          <div className="h-full flex items-center justify-center text-gray-400 italic text-sm">Select a location to view details</div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA */}
          <button
            onClick={openPopup}
            style={{ backgroundColor: colors.primary }}
            className="hidden lg:block text-white px-7 py-2.5 rounded-full font-bold shadow-lg hover:scale-105 transition-transform active:scale-95"
          >
            Get Consultation
          </button>

          {/* Mobile Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-2xl text-gray-700">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Contact Info for Mobile */}
              <div className="border-b border-gray-200 pb-4">
                <a href="tel:+919876543210" className="flex items-center text-lg font-semibold text-gray-700 hover:text-blue-600 mb-3">
                  <FaPhoneAlt className="mr-3 text-blue-600" /> +91 98765 43210
                </a>
                <a href="mailto:info@mbbsguide.com" className="flex items-center text-lg font-semibold text-gray-700 hover:text-blue-600">
                  <FaEnvelope className="mr-3 text-blue-600" /> info@mbbsguide.com
                </a>
              </div>
              
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-semibold text-gray-700 hover:text-blue-600"
                >
                  {link.name}
                </Link>
              ))}
              <button 
                onClick={() => { openPopup(); setMobileMenuOpen(false); }}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold"
              >
                Get Free Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;