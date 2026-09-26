"use client"
import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import Image from "next/image";

const PopupModal = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 20000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      {/*
          Compact promo modal: rounded-2xl, max-w-sm, consistent with site modals.
      */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in duration-300">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-gray-900/80 border border-white/20 rounded-xl flex items-center justify-center shadow-lg hover:bg-brand-950 group transition-colors duration-200"
          aria-label="Close modal"
        >
          <FaTimes className="text-white text-xs" />
        </button>

        {/* Image Container */}
        <div className="w-full flex justify-center items-center">
          <Image
            src="/banner.png"
            alt="Future Mind Educare admission offer - free MBBS counselling"
            width={800}
            height={1000}
            sizes="(max-width: 640px) 90vw, 384px"
            className="w-full h-auto max-h-[75vh] object-contain block"
          />
        </div>
      </div>
    </div>
  )
}

export default PopupModal
