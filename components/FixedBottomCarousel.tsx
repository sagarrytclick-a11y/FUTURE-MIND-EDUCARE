"use client";

import React from "react";
import { FaPaperPlane, FaArrowRight } from "react-icons/fa";

const FixedBottomCarousel: React.FC = () => {
  const states = [
    "Delhi",
    "Maharashtra",
    "Uttar Pradesh",
    "Karnataka",
    "Tamil Nadu",
    "Kerala",
    "Gujarat",
    "Rajasthan",
    "Madhya Pradesh",
    "West Bengal",
    "Punjab",
    "Bihar",
  ];

  const duplicatedStates = [
    ...states,
    ...states,
    ...states,
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="relative overflow-hidden border-t border-white/10 bg-brand-950/95 backdrop-blur-xl shadow-2xl">

          {/* Glow */}
          <div className="absolute -left-10 top-0 h-14 w-14 rounded-2xl bg-brand-900/20 blur-2xl"></div>
          <div className="absolute right-0 top-0 h-14 w-14 rounded-2xl bg-accent-400/20 blur-2xl"></div>

          <div className="relative py-1.5">
            <div className="overflow-hidden">
              <div className="flex animate-marquee gap-2 w-max px-2">
                {duplicatedStates.map((state, index) => (
                  <button
                    key={index}
                    className="group flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-white transition-colors hover:bg-brand-950 hover:border-brand-900"
                  >
                    {/* Icon */}
                    <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-white/10">
                      <FaPaperPlane className="text-[8px]" />
                    </div>

                    {/* Text */}
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-gray-300">
                        MBBS in
                      </span>

                      <span className="text-xs font-semibold text-white">
                        {state}
                      </span>
                    </div>

                    <FaArrowRight className="text-[8px] opacity-70 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }

          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-marquee {
          animation: marquee 18s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {
          .animate-marquee {
            animation: marquee 15s linear infinite;
          }
        }
      `}</style>
    </>
  );
};

export default FixedBottomCarousel;
