"use client"
import React, { useState } from 'react';

const NavigationMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "NEET UG", href: "/neet-ug" },
    { name: "NEET PG", href: "/neet-pg" },
    { name: "MBBS India", href: "/mbbs-india" },
    { name: "MBBS Abroad", href: "/mbbs-abroad" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" }
  ];

  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/ar-group-logo.png"
              alt="Future Mind Educare"
              className="h-10 w-auto"
            />
            <span className="ml-3 text-xl font-bold">Future Mind Educare</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-200 p-2 rounded-md"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6z"/>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h12v6a2 2 0 00-2 2-2h2.586l1.414 1.414a2 2 0 00-2 2-2v2.586l1.414 1.414a2 2 0 00-2 2-2v2.586z"/>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-blue-900 shadow-2xl">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white text-xl font-bold">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-blue-200 p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6z"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationMenu;
