import Link from 'next/link'
import React from 'react'
import { FaGraduationCap, FaGlobeAmericas, FaBookMedical, FaClipboardCheck } from 'react-icons/fa'
import Section from '@/components/Section'
import SectionHeading from '@/components/SectionHeading'

const miniCards = [
  {
    title: "MBBS in India",
    desc: "80+ colleges • NEET based guidance and support",
    href: "/colleges/mbbs-india",
    icon: FaGlobeAmericas,
    tag: "India",
  },
  {
    title: "MBBS Abroad",
    desc: "15+ countries • English medium universities",
    href: "/colleges/mbbs-abroad",
    icon: FaGraduationCap,
    tag: "Abroad",
  },
  {
    title: "MD/MS in India",
    desc: "50+ colleges • NEET PG based counselling",
    href: "/colleges/md-ms",
    icon: FaBookMedical,
    tag: "PG",
  },
  {
    title: "NEET Counselling",
    desc: "Expert guidance • End to end support",
    href: "/neet-ug-packages",
    icon: FaClipboardCheck,
    tag: "NEET",
  },
]

const MbbsCard = () => {
  return (
    <Section spacing="md" className="bg-slate-50">
        <SectionHeading
          eyebrow="Medical Pathways"
          title={<>Choose Your MBBS Path</>}
          description="Explore medical colleges in India and abroad with comprehensive guidance and support"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {miniCards.map((card, index) => {
            const Icon = card.icon
            return (
              <Link key={index} href={card.href} className="block h-full">
                <div className="group h-full bg-white hover:bg-brand-950 border border-slate-200 hover:border-brand-900 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-accent-100 group-hover:bg-accent-400 rounded-lg w-10 h-10 flex items-center justify-center shrink-0 transition-colors duration-300">
                      <Icon className="text-accent-600 group-hover:text-brand-950 text-sm transition-all duration-300 group-hover:scale-110" />
                    </div>
                    <span className="bg-accent-100 text-accent-600 group-hover:bg-accent-400 group-hover:text-brand-950 text-[11px] font-bold uppercase rounded-full px-2.5 py-1 transition-colors duration-300">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="text-brand-950 group-hover:text-white font-bold leading-tight transition-colors duration-300">{card.title}</h3>
                  <p className="text-gray-600 group-hover:text-slate-300 text-sm mt-1 line-clamp-2 transition-colors duration-300">{card.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-950 group-hover:text-accent-400 transition-colors duration-300">
                    Explore <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
    </Section>
  )
}

export default MbbsCard
