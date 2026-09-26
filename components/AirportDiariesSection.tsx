"use client"

import React from 'react';
import { usePopup } from '../contexts/PopupContext';
import {
  FaMapMarkerAlt,
} from 'react-icons/fa';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import Image from "next/image";

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
    <Section spacing="md" className="bg-white overflow-hidden">
      <SectionHeading
        eyebrow="Student Departures"
        title={
          <>
            Airport <span className="text-accent-600">Diaries</span>
          </>
        }
        description="Unforgettable moments when our students begin their MBBS journey abroad."
      />

      {/* 4-COL GALLERY TILES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {diaries.map((diary) => (
          <button
            key={diary.id}
            onClick={handleShareJourney}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 hover:border-brand-900 h-48 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-800"
          >
            <Image
              src={diary.image}
              alt={diary.caption}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-brand-950/10 group-hover:from-brand-950 group-hover:via-brand-950/60 transition-colors duration-300" />
            <div className="absolute top-2.5 left-2.5">
              <span className="inline-flex items-center gap-1 bg-accent-400 text-brand-950 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">
                <FaMapMarkerAlt className="text-[10px]" />
                {diary.caption.split(' ').pop()}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="font-bold text-white leading-snug line-clamp-1 text-sm">
                {diary.caption}
              </h3>
              <p className="text-gray-200 text-xs leading-5 line-clamp-1 mt-1">
                {diary.location}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* BOTTOM CONTENT */}
      <div className="mt-6 text-center max-w-2xl mx-auto">
        <p className="text-gray-600 text-sm leading-6 mb-4">
          Hundreds of students trust Future Mind Educare every year. These
          airport moments are the beginning of life-changing success stories.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleViewMoreStories}
            className="bg-brand-950 hover:bg-brand-900 text-white h-11 px-6 rounded-full text-sm font-bold shadow-lg transition-all duration-300 hover:scale-105"
          >
            View More Stories
          </button>

          <button
            onClick={handleShareJourney}
            className="bg-accent-400 text-brand-950 hover:bg-accent-500 border border-accent-400 h-11 px-6 rounded-full text-sm font-bold transition-all duration-300"
          >
            Share Your Journey
          </button>
        </div>
      </div>
    </Section>
  );
};

export default AirportDiariesSection;
