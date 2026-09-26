"use client"
import React from 'react';
import { usePopup } from '../contexts/PopupContext';

const FloatingButton: React.FC = () => {
  const { openPopup } = usePopup();

  return (
    <button
      onClick={openPopup}
      aria-label="Get free consultation"
      className="fixed bottom-36 right-4 sm:right-5 z-40 w-11 h-11 flex items-center justify-center bg-brand-950 hover:bg-brand-900 text-white rounded-full shadow-sm transition-colors group"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-2.5 py-1.5 bg-brand-950 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Get Free Consultation
        <div className="absolute top-full right-4 -mt-1 w-2 h-2 bg-brand-950 transform rotate-45"></div>
      </div>
    </button>
  );
};

export default FloatingButton;
