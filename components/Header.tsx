'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEnvelope,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaPhoneAlt,
  FaHeartbeat,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from 'react-icons/fa';

import { usePopup } from '../contexts/PopupContext';
import Image from 'next/image';
import { SITE_IDENTITY } from '../app/config/site_identity';

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
  slug?: string;
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
  const [mdmsStates, setMdmsStates] = useState<State[]>([]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  type NavLinkChild = { name: string; href: string };
  type NavLink = {
    name: string;
    label?: string;
    href?: string;
    hasDropdown?: boolean;
    /** compact dropdown instead of the wide mega menu */
    small?: boolean;
    children?: NavLinkChild[];
  };

  const navLinks: NavLink[] = [
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
    {
      name: 'MD/MS',
      label: 'MD / MS',
      href: '/colleges/md-ms',
      hasDropdown: true,
    },
    {
      name: 'Updates',
      href: '/blog',
      hasDropdown: true,
      small: true,
      children: [
        { name: 'Blog', href: '/blog' },
        { name: 'NEET UG Packages', href: '/neet-ug-packages' },
        { name: 'MBBS Abroad Packages', href: '/mbbs-abroad' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
  ];

  const fetchData = async (type: 'india' | 'abroad' | 'mdms') => {
    try {
      const url =
        type === 'india' ? '/mbbs-india.json' : type === 'abroad' ? '/mbbs-abroad.json' : '/md-ms.json';

      const res = await fetch(url);
      const data = await res.json();

      if (type === 'india') {
        // default mega-menu preview: Delhi, falling back to the first state
        const preferred =
          data.states.find((state: State) => state.name === 'Delhi') ??
          data.states[0];
        setIndiaStates(data.states);
        setHoveredItemData(preferred);
      } else if (type === 'abroad') {
        // default mega-menu preview: Russia, falling back to the first country
        const preferred =
          data.countries.find((country: Country) => country.name === 'Russia') ??
          data.countries[0];
        setAbroadCountries(data.countries);
        setHoveredItemData(preferred);
      } else {
        // Updated to use states from md-ms.json correctly
        setMdmsStates(data.states);
        setHoveredItemData(data.states[0]);
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

    if (name === 'MD/MS' && mdmsStates.length === 0) {
      fetchData('mdms');
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

    if (itemName === 'MD/MS' && mdmsStates.length === 0) {
      fetchData('mdms');
    }

    setExpandedMobileItems(prev =>
      prev.includes(itemName)
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

  // Publish the real header height to CSS so sticky bars and anchor scrolling
  // never leave a gap or slide under the header.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const publish = () => {
      const height = Math.ceil(header.getBoundingClientRect().height);
      if (height > 0) {
        document.documentElement.style.setProperty('--site-header-h', `${height}px`);
      }
    };

    publish();

    const observer = new ResizeObserver(publish);
    observer.observe(header);
    window.addEventListener('resize', publish);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', publish);
    };
  }, []);

  /** current-route pill, e.g. Home stays dark like the reference header */
  const isActiveLink = (href?: string) => {
    if (!href) return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full">
      {/* TOP STRIP — phone, email, socials */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 py-1.5 flex items-center justify-between">
          {/* CONTACT */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${SITE_IDENTITY.contact.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center text-xs font-semibold bg-brand-950 text-white rounded-full px-3 py-1"
            >
              <FaPhoneAlt className="mr-1.5 text-[10px]" />
              {SITE_IDENTITY.contact.phone}
            </a>

            <a
              href={`mailto:${SITE_IDENTITY.contact.email}`}
              className="hidden sm:flex items-center text-xs font-semibold bg-accent-100 text-accent-600 rounded-full px-3 py-1"
            >
              <FaEnvelope className="mr-1.5 text-[10px]" />
              {SITE_IDENTITY.contact.email}
            </a>
          </div>

          {/* SOCIAL */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-slate-500 hover:text-brand-950 transition-colors"
            >
              <FaInstagram className="text-xs" />
            </a>

            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="text-slate-500 hover:text-brand-950 transition-colors"
            >
              <FaFacebook className="text-xs" />
            </a>

            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="text-slate-500 hover:text-brand-950 transition-colors"
            >
              <FaLinkedin className="text-xs" />
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Image
                src="/header.png"
                alt="FM Education"
                width={40}
                height={40}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="leading-tight">
              <h2 className="text-lg font-extrabold tracking-tight text-brand-950 uppercase">
                FM Education
              </h2>

              <p className="text-[10px] tracking-[1.5px] uppercase font-semibold text-slate-500">
                Study MBBS Worldwide
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1 h-full">
            {navLinks.map((item) => {
              const isActive = isActiveLink(item.href);

              return (
              <div
                key={item.name}
                className="relative h-full flex items-center group"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href || '#'}
                  className={`relative flex items-center text-sm font-semibold transition-colors rounded-full px-4 py-2 ${
                    isActive
                      ? 'bg-brand-950 text-white'
                      : activeDropdown === item.name
                        ? 'bg-slate-100 text-brand-950'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-brand-950'
                    }`}
                >
                  {item.label || item.name}
                  {item.hasDropdown && (
                    <FaChevronDown className="ml-1.5 text-[10px]" />
                  )}
                </Link>

                {/* MEGA MENU */}
                <AnimatePresence>
                  {activeDropdown === item.name && item.hasDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.22 }}
                      className={`
        absolute
        top-full
        ${item.small ? 'left-0' : 'left-1/2 -translate-x-1/2'}
        mt-[2px]
        z-[999]
        ${item.small ? 'w-56' : 'w-[620px]'}
      `}
                    >
                      {item.small ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2">
                          {item.children?.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-4 py-2.5 text-sm font-semibold text-brand-950 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        /* WRAPPER FOR MEGA MENU */
                        <div className="relative flex items-start w-full">
                          {/* LEFT PANEL */}
                          <div
                            className="
            w-[280px]
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-slate-200
            overflow-hidden
            min-h-[360px]
          "
                          >
                            <div className="max-h-[440px] overflow-y-auto custom-scrollbar">
                              {(item.name === 'MBBS India'
                                ? indiaStates
                                : item.name === 'MBBS Abroad'
                                  ? abroadCountries
                                  : mdmsStates
                              ).map((loc: State | Country) => {
                                const isMdMs = item.name === 'MD/MS';
                                const Content = (
                                  <div
                                    className={`
                    h-12
                    px-4
                    flex
                    items-center
                    justify-between
                    cursor-pointer
                                    transition-colors
                                    border-b
                                    border-slate-200
                                    ${hoveredItemData?.id === loc.id
                                        ? 'bg-brand-950 text-white'
                                        : 'hover:bg-slate-100 text-brand-950'
                                      }
                  `}
                                  >
                                    <span className="text-sm font-medium">
                                      {item.name === 'MBBS India'
                                        ? `MBBS in ${loc.name}`
                                        : item.name === 'MD/MS'
                                          ? `MD/MS in ${loc.name}`
                                          : loc.name}
                                    </span>

                                    {!isMdMs && (
                                      <FaChevronDown
                                        className={`
                        text-[10px]
                        transition-transform
                                        ${hoveredItemData?.id === loc.id
                                          ? 'rotate-[-90deg] text-white'
                                          : 'rotate-[-90deg] text-slate-500'
                                        }
                      `}
                                      />
                                    )}
                                  </div>
                                );

                                return isMdMs ? (
                                  <Link
                                    key={loc.id}
                                    href={`/colleges/md-ms/${(loc as State).slug || loc.name.toLowerCase().replace(/\s+/g, '-')}`}
                                    onMouseEnter={() => setHoveredItemData(loc)}
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      setMobileMenuOpen(false);
                                    }}
                                  >
                                    {Content}
                                  </Link>
                                ) : (
                                  <div
                                    key={loc.id}
                                    onMouseEnter={() => setHoveredItemData(loc)}
                                  >
                                    {Content}
                                  </div>
                                );
                              })}
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
                left-[282px]
                top-0
                w-[336px]
                bg-white
                rounded-2xl
                shadow-sm
                border
                border-slate-200
                overflow-hidden
                min-h-[360px]
              "
                              >
                                <div className="space-y-1 max-h-[440px] overflow-y-auto custom-scrollbar p-2">
                                  {activeDropdown === 'MD/MS' && hoveredItemData && (
                                    <Link
                                      href={`/colleges/md-ms/${(hoveredItemData as State).slug || hoveredItemData.name.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="
                      block
                      text-sm
                      px-4
                      py-2.5
                      font-semibold
                      text-brand-950
                      hover:bg-accent-400 hover:text-brand-950
                      rounded-xl
                      transition-colors
                      border-b
                      border-blue-100
                    "
                                    >
                                      View All {hoveredItemData.name} MD/MS Details →
                                    </Link>
                                  )}
                                  {hoveredItemData.colleges && hoveredItemData.colleges.length > 0 ? (
                                    hoveredItemData.colleges.map((college: College) => {
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
                          text-sm
                          px-4
                          py-2.5
                          font-medium
                          text-brand-950
                          hover:bg-brand-950
                          hover:text-white
                          rounded-xl
                          transition-colors
                          leading-snug
                        "
                                        >
                                          {college.name}
                                        </Link>
                                      );
                                    })
                                  ) : (
                                    <div className="p-5 text-center text-gray-500 text-sm">
                                      No colleges found for this region.
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/neet-predictor"
              className="inline-flex items-center gap-2 h-10 pl-4 pr-1.5 rounded-full bg-teal-700 text-white text-sm font-bold hover:bg-teal-800 transition-colors"
            >
              <FaHeartbeat className="text-[13px]" />
              NEET Predictor
              <span className="ml-1 inline-flex items-center rounded-full bg-accent-400 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-brand-950">
                New
              </span>
            </Link>

            <button
              onClick={openPopup}
              className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-accent-400 text-brand-950 font-bold text-sm hover:bg-accent-500 transition-colors"
            >
              Get Guidance
            </button>
          </div>

          {/* MOBILE BTN */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-xl text-brand-950 p-1"
            aria-label="Toggle menu"
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
            className="lg:hidden bg-white border-b border-slate-200 overflow-y-auto max-h-[80vh]"
          >
            <div className="p-5 space-y-3">
              <div className="border-b border-slate-200 pb-4">
                <a
                  href={`tel:${SITE_IDENTITY.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center text-sm font-medium text-gray-600 mb-3"
                >
                  <FaPhoneAlt className="mr-2.5 text-brand-950 text-xs flex-shrink-0" />
                  <span>{SITE_IDENTITY.contact.phone}</span>
                </a>

                <a
                  href={`mailto:${SITE_IDENTITY.contact.email}`}
                  className="flex items-center text-sm font-medium text-gray-600"
                >
                  <FaEnvelope className="mr-2.5 text-brand-950 text-xs flex-shrink-0" />
                  <span className="break-words">{SITE_IDENTITY.contact.email}</span>
                </a>
              </div>

              {navLinks.map((link) => (
                <div key={link.name}>
                  {!link.hasDropdown ? (
                    <Link
                      href={link.href || '#'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm font-semibold text-brand-950 hover:bg-slate-100 rounded-full px-4 py-2 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={() => toggleMobileItem(link.name)}
                        className="flex items-center justify-between w-full text-sm font-semibold text-brand-950 hover:bg-slate-100 rounded-full px-4 py-2 transition-colors"
                      >
                        <span>{link.name}</span>
                        <FaChevronDown
                          className={`text-[10px] transition-transform duration-300 ${expandedMobileItems.includes(link.name) ? 'rotate-180' : ''
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
                            className="ml-4 mt-1 space-y-1 overflow-hidden"
                          >
                            {link.name === 'Updates' && link.children && (
                              <div className="space-y-1">
                                {link.children.map((child) => (
                                  <Link
                                    key={child.name}
                                    href={child.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-sm font-medium text-gray-700 hover:text-brand-900 py-2 px-3 transition-colors"
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                            {link.name === 'MBBS India' && indiaStates.length > 0 && (
                              <div className="space-y-1">
                                {indiaStates.map((state) => (
                                  <div key={state.id} className="border-l-2 border-gray-200">
                                    <button
                                      onClick={() => toggleMobileItem(`state-${state.id}`)}
                                      className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-brand-900 py-2 px-3 transition-colors"
                                    >
                                      <span>MBBS in {state.name}</span>
                                      <FaChevronDown
                                        className={`text-[8px] transition-transform duration-300 ${expandedMobileItems.includes(`state-${state.id}`) ? 'rotate-180' : ''
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
                                                className="block text-xs text-gray-600 hover:text-brand-900 py-1 px-3 transition-colors"
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
                              <div className="space-y-1">
                                {abroadCountries.map((country) => (
                                  <div key={country.id} className="border-l-2 border-gray-200">
                                    <button
                                      onClick={() => toggleMobileItem(`country-${country.id}`)}
                                      className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-brand-900 py-2 px-3 transition-colors"
                                    >
                                      <span>{country.name}</span>
                                      <FaChevronDown
                                        className={`text-[8px] transition-transform duration-300 ${expandedMobileItems.includes(`country-${country.id}`) ? 'rotate-180' : ''
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
                                                className="block text-xs text-gray-600 hover:text-brand-900 py-1 px-3 transition-colors"
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

                            {link.name === 'MD/MS' && mdmsStates.length > 0 && (
                              <div className="space-y-1">
                                {mdmsStates.map((state) => (
                                  <div key={state.id} className="border-l-2 border-gray-200">
                                    <button
                                      onClick={() => toggleMobileItem(`mdms-${state.id}`)}
                                      className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-brand-900 py-2 px-3 transition-colors"
                                    >
                                      <span>MD/MS in {state.name}</span>
                                      <FaChevronDown
                                        className={`text-[8px] transition-transform duration-300 ${expandedMobileItems.includes(`mdms-${state.id}`) ? 'rotate-180' : ''
                                          }`}
                                      />
                                    </button>

                                    <AnimatePresence>
                                      {expandedMobileItems.includes(`mdms-${state.id}`) && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          transition={{ duration: 0.25 }}
                                          className="ml-4 mt-1 space-y-1 overflow-hidden"
                                        >
                                          <Link
                                            href={`/colleges/md-ms/${state.slug || state.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block text-xs text-brand-950 font-semibold py-2 px-3 transition-colors"
                                          >
                                            View All Details for {state.name}
                                          </Link>
                                          {state.colleges && state.colleges.slice(0, 5).map((college: College) => {
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
                                                className="block text-xs text-gray-600 hover:text-brand-900 py-1 px-3"
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

              <Link
                href="/neet-predictor"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between gap-2 rounded-full bg-teal-700 px-4 py-2.5 text-sm font-bold text-white"
              >
                <span className="flex items-center gap-2">
                  <FaHeartbeat className="text-[13px]" />
                  NEET Predictor
                </span>
                <span className="inline-flex items-center rounded-full bg-accent-400 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-brand-950">
                  New
                </span>
              </Link>

              <button
                onClick={() => {
                  openPopup();
                  setMobileMenuOpen(false);
                }}
                className="
                  w-full
                  h-11
                  px-6
                  rounded-full
                  bg-accent-400
                  hover:bg-accent-500
                  text-brand-950
                  font-bold
                  text-sm
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
