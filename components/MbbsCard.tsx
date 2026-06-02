import Link from 'next/link'
import React from 'react'
import { FaCheckCircle, FaArrowRight, FaGraduationCap, FaGlobeAmericas, FaStethoscope, FaRupeeSign, FaUniversity, FaHospital, FaUserMd, FaBookMedical, FaClipboardCheck } from 'react-icons/fa'

const cardData = [
  {
    title: "MBBS in India",
    tagline: "Study in Your Homeland",
    description: "Explore 80+ NMC-approved medical colleges across India with affordable fees and NEET-based admissions.",
    href: "/colleges/mbbs-india",
    gradient: "from-blue-600 to-blue-700",
    lightBg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: "Most Popular",
    icon: FaGlobeAmericas,
    features: [
      { icon: FaUniversity, text: "80+ Colleges across India" },
      { icon: FaRupeeSign, text: "Fees from ₹1,000/year" },
      { icon: FaCheckCircle, text: "NMC & MCI recognized" },
      { icon: FaClipboardCheck, text: "NEET-based admissions" },
    ]
  },
  {
    title: "MBBS Abroad",
    tagline: "Global Medical Education",
    description: "Study at WHO & NMC approved universities across 15+ countries with English-medium programs and no donation.",
    href: "/colleges/mbbs-abroad",
    gradient: "from-emerald-600 to-emerald-700",
    lightBg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badge: "Budget Friendly",
    icon: FaGraduationCap,
    features: [
      { icon: FaGlobeAmericas, text: "15+ Countries worldwide" },
      { icon: FaHospital, text: "WHO & NMC approved" },
      { icon: FaBookMedical, text: "English medium programs" },
      { icon: FaCheckCircle, text: "No donation required" },
    ]
  },
  {
    title: "MD / MS",
    tagline: "Postgraduate Medical Specialization",
    description: "Pursue your dream specialization with expert NEET PG counseling guidance and top-ranked institutions across India.",
    href: "/colleges/md-ms",
    gradient: "from-violet-600 to-violet-700",
    lightBg: "bg-violet-50",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    badge: "New",
    icon: FaStethoscope,
    features: [
      { icon: FaUserMd, text: "50+ PG specializations" },
      { icon: FaHospital, text: "Top government & private hospitals" },
      { icon: FaClipboardCheck, text: "NEET PG counseling support" },
      { icon: FaCheckCircle, text: "Clinical & pre-clinical branches" },
    ]
  }
]

const MbbsCard = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <FaStethoscope className="text-xs" />
            Medical Pathways
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Choose Your <span className="text-blue-600">Medical Career</span> Path
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            From undergraduate to postgraduate — find the right medical program with expert guidance every step of the way
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cardData.map((card, index) => {
            const Icon = card.icon
            return (
              <Link key={index} href={card.href}>
                <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-1.5 h-full flex flex-col">
                  {/* Top Gradient Bar */}
                  <div className={`h-2 bg-gradient-to-r ${card.gradient}`} />

                  {/* Badge */}
                  <div className="absolute top-5 right-5 z-10">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${card.lightBg} ${card.iconColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Header with Icon */}
                  <div className="px-6 sm:px-8 pt-6 pb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${card.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`${card.iconColor} text-2xl`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-gray-900">{card.title}</h3>
                        <p className="text-sm text-gray-500">{card.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="px-6 sm:px-8 pb-2">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="px-6 sm:px-8 pb-6 flex-1">
                    <ul className="space-y-2.5">
                      {card.features.map((feature, i) => {
                        const FeatureIcon = feature.icon
                        return (
                          <li key={i} className="flex items-center gap-3">
                            <div className={`w-7 h-7 rounded-lg ${card.lightBg} flex items-center justify-center shrink-0`}>
                              <FeatureIcon className={`${card.iconColor} text-xs`} />
                            </div>
                            <span className="text-gray-700 text-sm">{feature.text}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  {/* CTA Footer */}
                  <div className={`px-6 sm:px-8 py-4 border-t border-gray-100 ${card.lightBg}`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${card.iconColor}`}>Explore {card.title}</span>
                      <div className={`w-8 h-8 ${card.iconBg} rounded-xl flex items-center justify-center group-hover:translate-x-1.5 group-hover:-translate-y-0.5 transition-all duration-300`}>
                        <FaArrowRight className={`${card.iconColor} text-sm`} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default MbbsCard
