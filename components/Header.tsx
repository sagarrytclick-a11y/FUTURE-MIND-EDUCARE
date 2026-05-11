'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaEnvelope,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaPhoneAlt,
} from 'react-icons/fa';

import { usePopup } from '../contexts/PopupContext';
import Image from 'next/image';

interface College {
  id: number;
  name: string;
  city: string;
  image: string;
  fees?: string;
}

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

const Header = () => {
  const { openPopup } = usePopup();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredItemData, setHoveredItemData] = useState<
    State | Country | null
  >(null);
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);

  const [indiaStates, setIndiaStates] = useState<State[]>([]);
  const [abroadCountries, setAbroadCountries] = useState<Country[]>([]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    {
      name: 'MBBS India',
      href: '/colleges/mbbs-india',
      hasDropdown: true,
    },
    {
      name: 'MBBS Abroad',
      href: '/colleges/mbbs-abroad',
      hasDropdown: true,
    },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const fetchData = async (type: 'india' | 'abroad') => {
    try {
      const url =
        type === 'india' ? '/mbbs-india.json' : '/mbbs-abroad.json';

      const res = await fetch(url);
      const data = await res.json();

      if (type === 'india') {
        setIndiaStates(data.states);
        setHoveredItemData(data.states[0]);
      } else {
        setAbroadCountries(data.countries);
        setHoveredItemData(data.countries[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setActiveDropdown(name);

    if (name === 'MBBS India' && indiaStates.length === 0) {
      fetchData('india');
    }

    if (name === 'MBBS Abroad' && abroadCountries.length === 0) {
      fetchData('abroad');
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredItemData(null);
    }, 150);
  };

  const toggleMobileItem = (itemName: string) => {
    // Fetch data if needed when expanding MBBS Abroad
    if (itemName === 'MBBS Abroad' && abroadCountries.length === 0) {
      fetchData('abroad');
    }
    // Fetch data if needed when expanding MBBS India
    if (itemName === 'MBBS India' && indiaStates.length === 0) {
      fetchData('india');
    }
    
    setExpandedMobileItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

  // Set default hovered items when data is loaded
  useEffect(() => {
    if (indiaStates.length > 0) {
      const delhiState = indiaStates.find(state => state.name === 'Delhi');
      if (delhiState) {
        setHoveredItemData(delhiState);
      }
    }
  }, [indiaStates]);

  useEffect(() => {
    if (abroadCountries.length > 0) {
      const russiaCountry = abroadCountries.find(country => country.name === 'Russia');
      if (russiaCountry) {
        setHoveredItemData(russiaCountry);
      }
    }
  }, [abroadCountries]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* TOP BAR */}
      <div className="bg-[#0F172A] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* SOCIAL */}
          <div className="flex items-center gap-5">
            <FaInstagram className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer text-[15px]" />

            <FaFacebook className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer text-[15px]" />

            <FaLinkedin className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer text-[15px]" />
          </div>

          {/* CONTACT */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="tel:+919876543210"
              className="flex items-center text-[14px] font-medium text-gray-300 hover:text-white transition-all"
            >
              <FaPhoneAlt className="mr-2 text-blue-500" />
              +91 98765 43210
            </a>

            <a
              href="mailto:info@mbbsguide.com"
              className="flex items-center text-[14px] font-medium text-gray-300 hover:text-white transition-all"
            >
              <FaEnvelope className="mr-2 text-blue-500" />
              info@mbbsguide.com
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="max-w-[1400px] mx-auto px-4 h-[88px] flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/header.png"
                alt="FM Education"
                width={54}
                height={54}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="leading-tight">
              <h2 className="text-[24px] font-black tracking-tight text-[#111827] uppercase">
                FM Education
              </h2>

              <p className="text-[11px] tracking-[2px] uppercase font-semibold text-gray-500">
                Study MBBS Worldwide
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-10 h-full">
            {navLinks.map((item) => (
              <div
                key={item.name}
                className="relative h-full flex items-center group"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`relative flex items-center text-[15px] font-semibold transition-all duration-300 ${activeDropdown === item.name
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                    }`}
                >
                  {item.name}

                  {item.hasDropdown && (
                    <FaChevronDown className="ml-2 text-[10px]" />
                  )}

                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] bg-blue-600 transition-all duration-300 ${activeDropdown === item.name
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                      }`}
                  />
                </Link>

             {/* MEGA MENU */}
<AnimatePresence>
  {activeDropdown === item.name && item.hasDropdown && (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22 }}
      className="
        absolute
        top-full
        left-1/2
        -translate-x-1/2
        mt-[2px]
        z-[999]
      "
    >
      {/* WRAPPER */}
      <div className="relative flex items-start">

        {/* LEFT PANEL */}
        <div
          className="
            w-[300px]
            bg-white
            rounded-[22px]
            shadow-[0_20px_70px_rgba(0,0,0,0.10)]
            border
            border-gray-100
            overflow-hidden
          "
        >
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            {(item.name === 'MBBS India'
              ? indiaStates
              : abroadCountries
            ).map((loc: State | Country) => (
              <div
                key={loc.id}
                onMouseEnter={() => setHoveredItemData(loc)}
                className={`
                  h-[65px]
                  px-5
                  flex
                  items-center
                  justify-between
                  cursor-pointer
                  transition-all
                  duration-300
                  border-b
                  border-gray-100
                  ${
                    hoveredItemData?.id === loc.id
                      ? 'bg-blue-500'
                      : 'hover:bg-gray-50'
                  }
                `}
              >
                <span
                  className={`
                    text-[14px]
                    font-semibold
                    transition-all
                    duration-300
                    ${
                      hoveredItemData?.id === loc.id
                        ? 'text-white'
                        : 'text-[#111827]'
                    }
                  `}
                >
                  {item.name === 'MBBS India'
                    ? `MBBS in ${loc.name}`
                    : loc.name}
                </span>

                <FaChevronDown
                  className={`
                    text-[11px]
                    transition-all
                    duration-300
                    ${
                      hoveredItemData?.id === loc.id
                        ? 'rotate-[-90deg] text-white'
                        : 'rotate-[-90deg] text-gray-500'
                    }
                  `}
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <AnimatePresence>
          {hoveredItemData && (
            <motion.div
              key={hoveredItemData.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="
                absolute
                left-[302px]
                top-0
                w-[360px]
                bg-white
                rounded-[22px]
                shadow-[0_20px_70px_rgba(0,0,0,0.10)]
                border
                border-gray-100
                overflow-hidden
              "
            >
              <div className="space-y-3 max-h-[460px] overflow-y-auto custom-scrollbar">
                {hoveredItemData.colleges
                  ?.slice(0, 10)
                  .map((college: College) => {
                    const collegeSlug = college.name
                      .toLowerCase()
                      .replace(/[^a-z0-9\s]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-')
                      .replace(/^-|-$/g, '');

                    return (
                      <Link
                        key={college.id}
                        href={`/colleges/${collegeSlug}`}
                        className="
                          block
                          text-[14px]
                          p-4
                          font-medium
                          text-[#111827]
                          hover:bg-blue-500
                          hover:text-white
                          transition-all
                          duration-300
                          leading-snug
                        "
                      >
                        {college.name}
                      </Link>
                    );
                  })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            className="
              hidden
              lg:flex
              items-center
              justify-center
              px-7
              h-12
              rounded-lg
              bg-[#2563EB]
              text-white
              font-bold
              text-sm
              shadow-[0_10px_30px_rgba(37,99,235,0.25)]
              hover:shadow-[0_15px_40px_rgba(37,99,235,0.35)]
              hover:scale-[1.03]
              transition-all
              duration-300
            "
          >
            Get Free Consultation
          </button>

          {/* MOBILE BTN */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-2xl text-gray-700"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-y-auto max-h-[80vh]"
          >
            <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">
              <div className="border-b border-gray-200 pb-4 sm:pb-5">
                <a
                  href="tel:+919876543210"
                  className="flex items-center text-[14px] sm:text-[15px] font-semibold text-gray-700 mb-3 sm:mb-4"
                >
                  <FaPhoneAlt className="mr-3 text-blue-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">+91 98765 43210</span>
                </a>

                <a
                  href="mailto:info@mbbsguide.com"
                  className="flex items-center text-[14px] sm:text-[15px] font-semibold text-gray-700"
                >
                  <FaEnvelope className="mr-3 text-blue-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base break-words">info@mbbsguide.com</span>
                </a>
              </div>

              {navLinks.map((link) => (
                <div key={link.name}>
                  {!link.hasDropdown ? (
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-[15px] sm:text-[16px] font-semibold text-gray-800 hover:text-blue-600 transition-all py-2"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={() => toggleMobileItem(link.name)}
                        className="flex items-center justify-between w-full text-[15px] sm:text-[16px] font-semibold text-gray-800 hover:text-blue-600 transition-all py-2"
                      >
                        <span>{link.name}</span>
                        <FaChevronDown 
                          className={`text-[10px] transition-transform duration-300 ${
                            expandedMobileItems.includes(link.name) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {expandedMobileItems.includes(link.name) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-4 mt-2 space-y-2 overflow-hidden"
                          >
                            {link.name === 'MBBS India' && indiaStates.length > 0 && (
                              <div className="space-y-2">
                                {indiaStates.map((state) => (
                                  <div key={state.id} className="border-l-2 border-gray-200">
                                    <button
                                      onClick={() => toggleMobileItem(`state-${state.id}`)}
                                      className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-blue-600 py-2 px-3 transition-all"
                                    >
                                      <span>MBBS in {state.name}</span>
                                      <FaChevronDown 
                                        className={`text-[8px] transition-transform duration-300 ${
                                          expandedMobileItems.includes(`state-${state.id}`) ? 'rotate-180' : ''
                                        }`}
                                      />
                                    </button>
                                    
                                    <AnimatePresence>
                                      {expandedMobileItems.includes(`state-${state.id}`) && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          transition={{ duration: 0.25 }}
                                          className="ml-4 mt-1 space-y-1 overflow-hidden"
                                        >
                                          {state.colleges.slice(0, 5).map((college) => {
                                            const collegeSlug = college.name
                                              .toLowerCase()
                                              .replace(/[^a-z0-9\s]/g, '')
                                              .replace(/\s+/g, '-')
                                              .replace(/-+/g, '-')
                                              .replace(/^-|-$/g, '');

                                            return (
                                              <Link
                                                key={college.id}
                                                href={`/colleges/${collegeSlug}`}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block text-xs text-gray-600 hover:text-blue-600 py-1 px-3 transition-all"
                                              >
                                                • {college.name}
                                              </Link>
                                            );
                                          })}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {link.name === 'MBBS Abroad' && abroadCountries.length > 0 && (
                              <div className="space-y-2">
                                {abroadCountries.map((country) => (
                                  <div key={country.id} className="border-l-2 border-gray-200">
                                    <button
                                      onClick={() => toggleMobileItem(`country-${country.id}`)}
                                      className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-blue-600 py-2 px-3 transition-all"
                                    >
                                      <span>{country.name}</span>
                                      <FaChevronDown 
                                        className={`text-[8px] transition-transform duration-300 ${
                                          expandedMobileItems.includes(`country-${country.id}`) ? 'rotate-180' : ''
                                        }`}
                                      />
                                    </button>
                                    
                                    <AnimatePresence>
                                      {expandedMobileItems.includes(`country-${country.id}`) && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          transition={{ duration: 0.25 }}
                                          className="ml-4 mt-1 space-y-1 overflow-hidden"
                                        >
                                          {country.colleges.slice(0, 5).map((college) => {
                                            const collegeSlug = college.name
                                              .toLowerCase()
                                              .replace(/[^a-z0-9\s]/g, '')
                                              .replace(/\s+/g, '-')
                                              .replace(/-+/g, '-')
                                              .replace(/^-|-$/g, '');

                                            return (
                                              <Link
                                                key={college.id}
                                                href={`/colleges/${collegeSlug}`}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block text-xs text-gray-600 hover:text-blue-600 py-1 px-3 transition-all"
                                              >
                                                • {college.name}
                                              </Link>
                                            );
                                          })}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => {
                  openPopup();
                  setMobileMenuOpen(false);
                }}
                className="
                  w-full
                  h-12
                  rounded-xl
                  bg-blue-600
                  text-white
                  font-bold
                  shadow-lg
                  text-sm sm:text-base
                "
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
