"use client"
import React from 'react';
import SITE_IDENTITY from '../app/config/site_identity';

const SiteIdentity: React.FC = () => {
  return (
    <div className="bg-linear-to-r from-blue-900 to-blue-800 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {/* Logo and Company Name */}
          <div className="flex items-center justify-center mb-6">
            <img
              src={SITE_IDENTITY.logo.primary}
              alt={SITE_IDENTITY.name}
              className="h-16 w-auto mr-4"
            />
            <h1 className="text-4xl lg:text-5xl font-bold">
              {SITE_IDENTITY.name}
            </h1>
          </div>
          
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {SITE_IDENTITY.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Address Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 mr-3 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657a1 1 0 00-1.414 1.414L16 4.586a1 1 0 00-1.414 1.414 1.657v8a2 2 0 00-2 2-2h2.586l1.414 1.414a2 2 0 00-2 2-2v2.586l1.414 1.414a2 2 0 001.414 1.414 1.657z"/>
              </svg>
              <h3 className="text-xl font-semibold">Office Address</h3>
            </div>
            <p className="text-blue-100 leading-relaxed">
              {SITE_IDENTITY.address.building}, {SITE_IDENTITY.address.landmark},<br/>
              {SITE_IDENTITY.address.details},<br/>
              {SITE_IDENTITY.address.area}, {SITE_IDENTITY.address.city} {SITE_IDENTITY.address.pincode}
            </p>
          </div>

          {/* Contact Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 mr-3 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <h3 className="text-xl font-semibold">Contact Information</h3>
            </div>
            <div className="space-y-3 text-blue-100">
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {SITE_IDENTITY.contact.phone}
              </p>
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8a9 9 0 111.321 112.808 112.808 112.808 0 111.321 112.808 112.808 0 111.321 112.808zM3 8a9 9 0 111.321 112.808 112.808 112.808 0 111.321 112.808zM12 14l9 5.5 0 111.321 112.808 112.808 0 111.321 112.808zM8 12l0 4 0 111.321 112.808 112.808 0 111.321 112.808zM20 4v4a2 2 0 00-2 2-2h2.586l1.414 1.414a2 2 0 00-2 2-2v2.586l1.414 1.414a2 2 0 001.414 1.414 1.657z"/>
                </svg>
                {SITE_IDENTITY.contact.email}
              </p>
            </div>
          </div>

          {/* Office Hours Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 mr-3 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 4m0 0l-3-4m3 4H3"/>
              </svg>
              <h3 className="text-xl font-semibold">Office Hours</h3>
            </div>
            <div className="text-blue-100">
              <p>Monday - Saturday: {SITE_IDENTITY.officeHours.mondayToSaturday}</p>
              <p>Sunday: {SITE_IDENTITY.officeHours.sunday}</p>
            </div>
          </div>
        </div>

        {/* Google Maps Link */}
        <div className="mt-8 text-center">
          <a
            href={SITE_IDENTITY.contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657a1 1 0 00-1.414 1.414L16 4.586a1 1 0 00-1.414 1.414 1.657v8a2 2 0 00-2 2-2h2.586l1.414 1.414a2 2 0 00-2 2-2v2.586l1.414 1.414a2 2 0 001.414 1.414 1.657z"/>
            </svg>
            Get Directions on Google Maps
          </a>
        </div>

        {/* Statistics */}
        <div className="mt-12 text-center">
          <p className="text-blue-200 max-w-3xl mx-auto mb-6">
            {SITE_IDENTITY.name} is dedicated to providing comprehensive guidance and support 
            for medical education aspirants. Our expert counselors help students navigate the 
            complex admission process for MBBS and other medical courses in India and abroad.
          </p>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{SITE_IDENTITY.statistics.studentsCounselled}</div>
              <div className="text-blue-200">Students Counseled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{SITE_IDENTITY.statistics.yearsExperience}</div>
              <div className="text-blue-200">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{SITE_IDENTITY.statistics.partnerColleges}</div>
              <div className="text-blue-200">Partner Colleges</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteIdentity;
