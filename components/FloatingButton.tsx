"use client"
import React from 'react';
import { usePopup } from '../contexts/PopupContext';

const FloatingButton: React.FC = () => {
  const { openPopup } = usePopup();

  return (
    <button
      onClick={openPopup}
      className="fixed bottom-40 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Get Free Consultation
        <div className="absolute top-full right-4 -mt-1 w-2 h-2 bg-gray-900 transform rotate-45"></div>
      </div>
    </button>
  );
};

export default FloatingButton;
