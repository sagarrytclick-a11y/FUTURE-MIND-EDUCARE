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
    <div className="fixed right-6 bottom-24 z-40 flex flex-col items-end space-y-2">
      {/* Message above button */}
   
      
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 group"
        aria-label="Chat on WhatsApp"
      >
        <MdOutlineWhatsapp 
          className="w-6 h-6 transition-transform group-hover:rotate-12" 
        />  
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </div>
      </button>
    </div>
  );
};

export default WhatsAppButton;
