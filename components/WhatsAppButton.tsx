"use client"
import React from 'react';
import { MdOutlineWhatsapp } from "react-icons/md";
import { SITE_IDENTITY } from '../app/config/site_identity';

const WhatsAppButton: React.FC = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = SITE_IDENTITY.contact.phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent("Hi! I'm interested in MBBS admission guidance. Can you help me?");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed left-4 bottom-20 z-40 flex flex-col items-start sm:left-5">
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="relative w-11 h-11 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full shadow-sm transition-colors group"
        aria-label="Chat on WhatsApp"
      >
        <MdOutlineWhatsapp
          className="w-5 h-5 transition-transform group-hover:rotate-12"
        />

        {/* Tooltip */}
        <div className="absolute bottom-full left-0 mb-2 px-2.5 py-1 bg-brand-950 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </div>
      </button>
    </div>
  );
};

export default WhatsAppButton;
