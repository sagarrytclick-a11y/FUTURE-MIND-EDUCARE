import Link from 'next/link'
import React from 'react'
import { FaHospital, FaPlane, FaCheckCircle, FaArrowRight, FaGraduationCap, FaGlobe, FaUserMd, FaRupeeSign } from 'react-icons/fa'

const MbbsCard = () => {
  return (
   <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Choose Your <span className="text-blue-600">MBBS Journey</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore medical colleges in India and abroad with comprehensive guidance and support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* MBBS India Card */}
            <Link href="/colleges/mbbs-india">
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-5xl font-black mb-2 flex items-center justify-center">
                        <FaGlobe className="text-6xl" />
                      </div>
                      <h3 className="text-2xl font-bold">MBBS in India</h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaHospital className="text-blue-600 text-lg" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Study in Your Homeland</h4>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 mt-1 text-sm" />
                      <span className="text-gray-700">80+ Medical Colleges across 4+ states</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 mt-1 text-sm" />
                      <span className="text-gray-700">Affordable fees from <FaRupeeSign className="inline text-xs" />1,000/year</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 mt-1 text-sm" />
                      <span className="text-gray-700">NMC & MCI recognized institutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 mt-1 text-sm" />
                      <span className="text-gray-700">NEET-based admissions</span>
                    </li>
                  </ul>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Explore opportunities</span>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                      <span>View Colleges</span>
                      <FaArrowRight className="text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* MBBS Abroad Card */}
            <Link href="/colleges/mbbs-abroad">
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-5xl font-black mb-2 flex items-center justify-center">
                        <FaPlane className="text-6xl" />
                      </div>
                      <h3 className="text-2xl font-bold">MBBS Abroad</h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaGraduationCap className="text-blue-600 text-lg" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Global Medical Education</h4>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 mt-1 text-sm" />
                      <span className="text-gray-700">Study in 15+ countries worldwide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 mt-1 text-sm" />
                      <span className="text-gray-700">WHO & NMC approved universities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 mt-1 text-sm" />
                      <span className="text-gray-700">English medium programs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 mt-1 text-sm" />
                      <span className="text-gray-700">No donation required</span>
                    </li>
                  </ul>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Discover global options</span>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                      <span>View Colleges</span>
                      <FaArrowRight className="text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
  )
}

export default MbbsCard
