"use client"
import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

const PopupModal = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 7000) 

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      {/* 
          Container: Changed bg to #1E212B (Surface) 
          max-w-md ensures it doesn't get too wide on desktop while fitting mobile.
      */}
      <div className="relative bg-[#1E212B] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Close Button: Updated to use #4A90E2 for a themed look */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-[#12141D] border border-[#94A3B8]/20 rounded-full flex items-center justify-center shadow-lg hover:bg-[#4A90E2] group transition-colors duration-200"
          aria-label="Close modal"
        >
          <FaTimes className="text-[#F8FAFC] group-hover:text-white text-sm" />
        </button>

        {/* Image Container */}
        <div className="w-full flex justify-center items-center">
          <img 
            src="/banner.png"
            alt="Promotion Banner"
            /* 
               Changes made:
               1. Removed max-w-sm to let it fill the max-w-md container.
               2. Changed object-cover to object-contain to prevent "cutting" or cropping.
               3. Set height to auto or h-full to respect the image's original aspect ratio.
            */
            className="w-full h-auto max-h-[80vh] object-contain block"
          />
        </div>
      </div>
    </div>
  )
}

export default PopupModal