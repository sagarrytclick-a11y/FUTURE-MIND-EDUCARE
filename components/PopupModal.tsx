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
    <div className="fixed inset-0 z-50 flex items-center justify-center  ">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <FaTimes className="text-gray-600 text-lg" />
        </button>

        {/* Image Container */}
        <div className="relative">
          <img 
            src="/banner.png"
            alt="Banner"
            className="w-full h-110 object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default PopupModal
