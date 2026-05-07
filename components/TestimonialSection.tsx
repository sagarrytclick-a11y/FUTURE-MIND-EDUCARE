"use client"
import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

interface TestimonialItem {
  name: string;
  university: string;
  quote: string;
  image: string;
}

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const testimonials: TestimonialItem[] = [
    {
      name: "Sachin Sachdeva",
      university: "Tbilisi State Medical University, Georgia",
      quote: "Future Mind Educare made my dream of studying MBBS abroad come true. Their guidance throughout the admission process was exceptional, from university selection to visa assistance. I couldn't have done it without their support!",
      image: "https://i.pinimg.com/736x/dd/de/09/ddde094724373791608fd38b28d94739.jpg"
    },
    {
      name: "Rahul Verma",
      university: "Kazakhstan Medical University, Kazakhstan",
      quote: "The counseling I received from AR Group was invaluable. They helped me choose the right university based on my budget and preferences. The entire process was smooth and stress-free. Highly recommend their services!",
      image: "https://i.pinimg.com/736x/27/90/03/27900371354079f41e16751f2a320fdb.jpg"
    },
    {
      name: "Anjali Patel",
      university: "Davao Medical School Foundation, Philippines",
      quote: "Thanks to Future Mind Educare, I'm now pursuing my MBBS in the Philippines. Their expert counselors guided me through every step and ensured I got admission in a recognized university with excellent facilities.",
      image: "https://i.pinimg.com/736x/28/06/61/2806611f0d5d28ede2130650f6f96d71.jpg"
    } , 
    {
      name: "Raj Kumar",
      university: "Davao Medical School Foundation, Philippines",
      quote: "Thanks to Future Mind Educare, I'm now pursuing my MBBS in the Philippines. Their expert counselors guided me through every step and ensured I got admission in a recognized university with excellent facilities.",
      image: "https://i.pinimg.com/736x/e3/fd/17/e3fd175ad1c7cf2bf88aad354b854120.jpg"
    } , 
    {
      name: "Priya Sharma",
      university: "Davao Medical School Foundation, Philippines",
      quote: "Thanks to Future Mind Educare, I'm now pursuing my MBBS in the Philippines. Their expert counselors guided me through every step and ensured I got admission in a recognized university with excellent facilities.",
      image: "https://i.pinimg.com/736x/80/47/b3/8047b3f0d8b806aa726de8581d7a11b1.jpg"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, testimonials.length]);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsAutoPlay(false); // Stop auto-play when user manually navigates
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlay(false); // Stop auto-play when user manually navigates
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false); // Stop auto-play when user manually navigates
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">
            What Our Students Says About Us!
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from our successful students who are now pursuing their medical dreams 
            in top universities around the world with our guidance.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Main Testimonial Display */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
              {/* Quote Icons */}
              <div className="absolute top-4 left-4 text-6xl text-blue-100 opacity-50">
                <FaQuoteLeft />
              </div>
              <div className="absolute bottom-4 right-4 text-6xl text-blue-100 opacity-50">
                <FaQuoteRight />
              </div>

              {/* Current Testimonial */}
              <div className="relative z-10">
                {/* Student Image and Info */}
                <div className="flex items-center mb-8">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-20 h-20 rounded-full object-cover mr-6 border-4 border-blue-200 shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-gray-600 font-medium">
                      {testimonials[currentIndex].university}
                    </p>
                  </div>
                </div>
                
                {/* Quote */}
                <p className="text-gray-700 text-lg leading-relaxed italic mb-8">
                  {testimonials[currentIndex].quote}
                </p>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20"
                aria-label="Previous testimonial"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20"
                aria-label="Next testimonial"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              {isAutoPlay ? 'Pause Auto-play' : 'Resume Auto-play'}
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Join thousands of successful medical students who started their journey with Future Mind Educare. 
            Our personalized approach and expert guidance ensure you find the perfect path to your medical career.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            Read More Success Stories
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
