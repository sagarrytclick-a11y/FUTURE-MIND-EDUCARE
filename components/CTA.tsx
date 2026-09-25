import React from 'react'
import Section from './Section'

const CTA = () => {
  return (
    <Section spacing="sm" className="bg-brand-950">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Your Journey to Medical Excellence Starts Here
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Comprehensive guidance for MBBS admissions in India and abroad — from application to admission.
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex shrink-0 items-center justify-center h-11 px-6 rounded-full bg-white text-brand-950 text-sm font-bold hover:bg-accent-100 transition-colors"
        >
          Get Free Counseling
        </a>
      </div>
    </Section>
  )
}

export default CTA
