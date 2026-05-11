"use client"

import React from 'react';
import { usePopup } from '../contexts/PopupContext';
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaPlaneDeparture,
} from 'react-icons/fa';

interface DiaryItem {
  id: number;
  image: string;
  caption: string;
  location: string;
}

const AirportDiariesSection: React.FC = () => {
  const { openPopup, updateFormData } = usePopup();

  const handleViewMoreStories = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleShareJourney = () => {
    updateFormData({
      courseInterest: 'Share My Journey - Airport Diary',
    });

    openPopup();
  };

  const diaries: DiaryItem[] = [
    {
      id: 1,
      image:
        'https://www.theeducationabroad.com/uploads/gallery/departure1.webp',
      caption: 'Students Ready to Fly to Georgia',
      location: 'Indira Gandhi International Airport, Delhi',
    },
    {
      id: 2,
      image:
        'https://www.ruseducation.in/wp-content/uploads/2023/09/Departure-of-Indian-Students-for-Russia-to-study-MBBS-at-OrSMU-4.webp',
      caption: 'MBBS Aspirants Heading to Philippines',
      location:
        'Chhatrapati Shivaji Maharaj International Airport, Mumbai',
    },
    {
      id: 3,
      image:
        'https://www.ruseducation.in/wp-content/uploads/2022/09/batch-3-departs-to-join-mbbs-in-russia-2.webp',
      caption: 'Future Doctors Departing for Kazakhstan',
      location: 'Kempegowda International Airport, Bengaluru',
    },
    {
      id: 4,
      image:
        'https://www.ruseducation.in/wp-content/uploads/2022/01/2-78.webp',
      caption: 'Medical Students Bound for Russia',
      location:
        'Netaji Subhash Chandra Bose International Airport, Kolkata',
    },
  ];

  return (
    <section className="py-20 px-4 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-lg
              bg-blue-50
              border
              border-blue-100
              mb-5
            "
          >
            <FaPlaneDeparture className="text-blue-600 text-sm" />

            <span className="text-blue-700 text-xs font-bold tracking-[0.2em] uppercase">
              Student Departures
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Airport
            <span className="text-blue-600"> Diaries</span>
          </h2>

          <p className="mt-5 text-slate-500 text-lg leading-8">
            Witness the unforgettable moments when our students begin their
            MBBS journey abroad and step closer to becoming future doctors.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {diaries.map((diary) => (
            <div
              key={diary.id}
              className="
                group
                relative
                overflow-hidden
                rounded-[30px]
                h-[420px]
                shadow-lg
                hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]
                transition-all
                duration-500
              "
            >
              {/* IMAGE */}
              <img
                src={diary.image}
                alt={diary.caption}
                className="
                  w-full
                  h-full
                  object-cover
                  group-hover:scale-110
                  transition-transform
                  duration-700
                "
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* TOP TAG */}
              <div className="absolute top-5 left-5">
                <span
                  className="
                    bg-white/15
                    backdrop-blur-md
                    border
                    border-white/20
                    text-white
                    text-[11px]
                    font-bold
                    px-4
                    py-2
                    rounded-lg
                    tracking-wider
                    uppercase
                  "
                >
                  MBBS Abroad
                </span>
              </div>

              {/* CONTENT */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-7
                  translate-y-4
                  group-hover:translate-y-0
                  transition-transform
                  duration-500
                "
              >
                <h3 className="text-2xl font-black text-white leading-snug mb-4">
                  {diary.caption}
                </h3>

                <div className="flex items-start gap-3 text-gray-200 mb-5">
                  <FaMapMarkerAlt className="mt-1 text-blue-400 shrink-0" />

                  <p className="text-sm leading-6">
                    {diary.location}
                  </p>
                </div>

                {/* BUTTON */}
                <button
                  onClick={handleShareJourney}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-5
                    py-3
                    rounded-lg
                    text-sm
                    font-bold
                    transition-all
                    duration-300
                    group/btn
                  "
                >
                  Start Your Journey

                  <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CONTENT */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-slate-500 text-lg leading-8 mb-8">
            Hundreds of students trust Future Mind Educare every year to guide
            them toward globally recognized medical universities. These airport
            moments are the beginning of life-changing success stories.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleViewMoreStories}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-8
                py-4
                rounded-lg
                font-bold
                shadow-lg
                transition-all
                duration-300
                hover:scale-105
              "
            >
              View More Stories
            </button>

            <button
              onClick={handleShareJourney}
              className="
                border
                border-slate-300
                bg-white
                hover:bg-slate-100
                text-slate-800
                px-8
                py-4
                rounded-lg
                font-bold
                transition-all
                duration-300
              "
            >
              Share Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirportDiariesSection;