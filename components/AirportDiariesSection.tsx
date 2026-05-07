"use client"
import React from 'react';
import { usePopup } from '../contexts/PopupContext';

interface DiaryItem {
  id: number;
  image: string;
  caption: string;
  location: string;
}

const AirportDiariesSection: React.FC = () => {
  const { openPopup, updateFormData } = usePopup();

  const handleViewMoreStories = () => {
    // Navigate to more stories or expand current section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareJourney = () => {
    // Pre-fill form with journey sharing context
    updateFormData({
      courseInterest: 'Share My Journey - Airport Diary'
    });
    openPopup();
  };
  const diaries: DiaryItem[] = [
    {
      id: 1,
      image: "https://www.theeducationabroad.com/uploads/gallery/departure1.webp",
      caption: "Students ready to fly to Georgia",
      location: "Indira Gandhi International Airport, Delhi"
    },
    {
      id: 2,
      image: "https://www.ruseducation.in/wp-content/uploads/2023/09/Departure-of-Indian-Students-for-Russia-to-study-MBBS-at-OrSMU-4.webp",
      caption: "MBBS aspirants heading to Philippines",
      location: "Chhatrapati Shivaji Maharaj International Airport, Mumbai"
    },
    {
      id: 3,
      image: "https://www.ruseducation.in/wp-content/uploads/2022/09/batch-3-departs-to-join-mbbs-in-russia-2.webp",
      caption: "Future doctors departing for Kazakhstan",
      location: "Kempegowda International Airport, Bengaluru"
    },
    {
      id: 4,
      image: "https://www.ruseducation.in/wp-content/uploads/2022/01/2-78.webp",
      caption: "Medical students bound for Russia",
      location: "Netaji Subhash Chandra Bose International Airport, Kolkata"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Airport Diaries
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Follow the journeys of our students as they embark on their medical education abroad. 
            These moments capture the excitement and dreams of future doctors taking their first steps.
          </p>
        </div>

        {/* Diaries Grid - 2x2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {diaries.map((diary, index) => (
            <div
              key={diary.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-80">
                <img
                  src={diary.image}
                  alt={diary.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content Overlay - Appears on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">
                      {diary.caption}
                    </h3>
                    <p className="text-sm text-gray-200 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {diary.location}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Static Caption - Always Visible */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent">
                <div className="text-white">
                  <p className="text-sm font-medium">
                    {diary.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Every year, hundreds of students trust Future Mind Educare to guide them to prestigious 
            medical universities worldwide. These airport diaries are just the beginning of their 
            remarkable journey toward becoming healthcare professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleViewMoreStories}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View More Stories
            </button>
            <button 
              onClick={handleShareJourney}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
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