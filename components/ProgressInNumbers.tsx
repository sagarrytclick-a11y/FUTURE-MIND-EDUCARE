"use client"
import React, { useState, useEffect } from 'react';

interface StatItem {
  number: string;
  label: string;
  icon: React.ReactNode;
}

const ProgressInNumbers: React.FC = () => {
  const [counters, setCounters] = useState<{ [key: string]: number }>({});
  const [isVisible, setIsVisible] = useState(false);

  const stats: StatItem[] = [
    { 
      number: "14+", 
      label: "Franchise", 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      number: "19", 
      label: "Year of Experience", 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 4m0 0l-3-4m3 4H3" />
        </svg>
      )
    },
    { 
      number: "50+", 
      label: "Expert Counselors", 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      number: "110", 
      label: "Courses", 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    { 
      number: "150+", 
      label: "MOU Signed Colleges", 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      number: "4000+", 
      label: "Students Counseled", 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Animate counters when component becomes visible
    const timer = setTimeout(() => {
      const targetValues: { [key: string]: number } = {
        "14+": 14,
        "19": 19,
        "50+": 50,
        "110": 110,
        "150+": 150,
        "4000+": 4000
      };

      const newCounters: { [key: string]: number } = {};
      
      Object.entries(targetValues).forEach(([key, target]) => {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(counter);
          }
          newCounters[key] = Math.floor(current);
          setCounters({ ...newCounters });
        }, duration / steps);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
          Our Progress in Numbers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Icon */}
              <div className="flex justify-center items-center mb-4 text-blue-600">
                {stat.icon}
              </div>
              
              {/* Number */}
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {stat.number.includes('+') ? (
                  <>
                    {counters[stat.number] || 0}+
                  </>
                ) : (
                  counters[stat.number] || 0
                )}
              </div>
              
              {/* Label */}
              <div className="text-gray-600 text-sm lg:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgressInNumbers;
