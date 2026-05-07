"use client"
import React, { useState } from 'react';

const NeetDataSection: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  
  const neetData = {
    '2026': {
      totalCandidates: 1872912,
      appeared: 1820654,
      qualified: 1819415,
      cutoffs: {
        general: 720,
        sc: 640,
        st: 630,
        obc: 600,
        ews: 600,
        pwd: 600
      },
      statistics: {
        maleQualified: 1038900,
        femaleQualified: 780515,
        totalQualified: 1819415
      }
    }
  };

  const currentYearData = neetData[selectedYear as keyof typeof neetData];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            NEET UG Statistics & Data
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive NEET UG examination data including cutoff marks, qualified candidates, 
            and category-wise statistics for medical admissions.
          </p>
        </div>

        {/* Year Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <label className="text-sm font-medium text-gray-700 mr-4">Select Year:</label>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="2026">NEET 2026</option>
              <option value="2025">NEET 2025</option>
              <option value="2024">NEET 2024</option>
              <option value="2023">NEET 2023</option>
            </select>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Candidates Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-900 mb-2">
              {currentYearData.totalCandidates.toLocaleString('en-IN')}
            </div>
            <p className="text-gray-700 font-medium">Total Candidates</p>
          </div>

          {/* Appeared Candidates Card */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-900 mb-2">
              {currentYearData.appeared.toLocaleString('en-IN')}
            </div>
            <p className="text-gray-700 font-medium">Candidates Appeared</p>
          </div>

          {/* Qualified Candidates Card */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-900 mb-2">
              {currentYearData.qualified.toLocaleString('en-IN')}
            </div>
            <p className="text-gray-700 font-medium">Candidates Qualified</p>
          </div>

          {/* Gender-wise Statistics */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center lg:col-span-2">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-orange-900">
                  {currentYearData.statistics.maleQualified.toLocaleString('en-IN')}
                </span>
                <span className="text-gray-700 font-medium">Male Qualified</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-orange-900">
                  {currentYearData.statistics.femaleQualified.toLocaleString('en-IN')}
                </span>
                <span className="text-gray-700 font-medium">Female Qualified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cutoff Marks Section */}
        <div className="mt-12 bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            NEET {selectedYear} Category-wise Cutoff Marks
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800 mb-1">General</div>
              <div className="text-3xl font-bold text-blue-600">{currentYearData.cutoffs.general}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800 mb-1">SC</div>
              <div className="text-3xl font-bold text-blue-600">{currentYearData.cutoffs.sc}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800 mb-1">ST</div>
              <div className="text-3xl font-bold text-blue-600">{currentYearData.cutoffs.st}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800 mb-1">OBC</div>
              <div className="text-3xl font-bold text-blue-600">{currentYearData.cutoffs.obc}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800 mb-1">EWS</div>
              <div className="text-3xl font-bold text-blue-600">{currentYearData.cutoffs.ews}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800 mb-1">PWD</div>
              <div className="text-3xl font-bold text-blue-600">{currentYearData.cutoffs.pwd}</div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            This data helps students understand competition level and required scores for MBBS admissions. 
            Use our NEET rank predictor and counseling services to maximize your chances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              NEET Rank Predictor
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Counseling
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeetDataSection;
