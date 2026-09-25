"use client"
import Link from 'next/link';
import React from 'react';
import {
  FaArrowRight,
  FaCheckCircle,
  FaQuoteLeft,
  FaStar
} from 'react-icons/fa';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import { SITE_IDENTITY } from '@/app/config/site_identity';

const AboutPage: React.FC = () => {
  const stats = [
    { number: "5000+", label: "Students Placed" },
    { number: "100+", label: "Partner Colleges" },
    { number: "15+", label: "Years Experience" },
    { number: "98%", label: "Success Rate" }
  ];

  const testimonials = [
    {
      name: "Ananya Singh",
      course: "MBBS - AIIMS Delhi",
      quote:
        "FUTURE MIND EDUCARE guided me through the entire NEET counseling process.",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      course: "MBBS - Philippines",
      quote:
        "Thanks to their guidance, I'm now pursuing my MBBS dream abroad.",
      rating: 5
    },
    {
      name: "Priya Nair",
      course: "MBBS - KMC Manipal",
      quote:
        "Professional and trustworthy service with excellent support.",
      rating: 5
    }
  ];

  const journey = [
    {
      step: "01",
      title: "Our Beginning — Simplifying Admissions",
      text: "FUTURE MIND EDUCARE started with a mission to simplify MBBS admissions for students who dream of becoming doctors.",
    },
    {
      step: "02",
      title: "Trusted Partnerships",
      text: "With years of experience and trusted partnerships with top medical universities, we provide complete support from counseling to final admission.",
    },
    {
      step: "03",
      title: "Personalized Guidance",
      text: "Our dedicated team ensures every student receives personalized guidance according to their budget, preferences, and career goals.",
    },
    {
      step: "04",
      title: "Complete Admission Support",
      text: "From NEET counseling and documentation to visa support and reporting — 5000+ placements with a 98% success rate.",
    },
  ];

  const trustPoints = [
    "5000+ Successful Placements",
    "100+ Partner Colleges",
    "15+ Years Experience",
    "98% Success Rate",
    "Expert Counseling Team",
    "Complete Admission Support",
  ];

  return (
    <div className="bg-white">
      <PageHero
        align="center"
        variant="tinted"
        eyebrow="Trusted MBBS Consultancy"
        title="Building Future"
        highlight="Doctors Since 2008"
        description="FUTURE MIND EDUCARE has helped thousands of students secure admissions in top medical colleges across India and abroad with expert counseling and complete admission support."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* STAT CARDS */}
      <Section spacing="sm" className="!pt-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-slate-200 bg-white px-4 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg"
            >
              <p className="text-2xl sm:text-3xl font-extrabold leading-none tracking-tight text-accent-600">
                {stat.number}
              </p>
              <p className="mt-1.5 text-xs font-semibold text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section spacing="md">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Helping Students Achieve Their Medical Dreams"
              className="mb-5"
            />

            {/* JOURNEY CARD GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {journey.map((item) => (
                <div
                  key={item.step}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-900 hover:shadow-xl"
                >
                  <span className="absolute -right-2 -top-3 text-6xl font-extrabold leading-none text-slate-100 transition-colors duration-300 group-hover:text-accent-100">
                    {item.step}
                  </span>

                  <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent-400 text-xs font-extrabold text-brand-950">
                    {item.step}
                  </span>

                  <h3 className="relative mt-3 text-brand-950 font-extrabold tracking-tight text-base leading-snug transition-colors duration-300 group-hover:text-accent-600">
                    {item.title}
                  </h3>
                  <p className="relative mt-1.5 text-sm leading-relaxed text-gray-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-950 px-6 text-sm font-bold text-white transition-colors hover:bg-brand-900"
              >
                Start Your Journey
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex h-11 items-center justify-center rounded-full border border-accent-400 bg-accent-400 px-6 text-sm font-bold text-brand-950 transition-colors hover:bg-accent-500"
              >
                Explore Blogs
              </Link>
            </div>
          </div>

          {/* TRUST RAIL */}
          <aside className="h-fit overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm lg:sticky top-header-gap">
            <div className="bg-brand-950 px-5 py-4">
              <h3 className="font-extrabold tracking-tight text-base text-white">
                Why families <span className="text-accent-400">trust us</span>
              </h3>
            </div>

            <ul className="grid grid-cols-1 gap-2 p-4">
              {trustPoints.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-accent-400"
                >
                  <FaCheckCircle className="shrink-0 text-[11px] text-accent-600" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="px-4 pb-4">
              <a
                href={SITE_IDENTITY.contact.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-3.5 py-3 transition-colors duration-300 hover:border-brand-900"
              >
                <span className="flex items-center gap-0.5 text-amber-400 text-[11px]">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </span>
                <span className="text-xs font-semibold text-gray-600">
                  4.2 · 115 Google reviews
                </span>
                <FaArrowRight className="shrink-0 text-[10px] text-accent-600" />
              </a>
            </div>
          </aside>
        </div>
      </Section>

      <Section spacing="md" className="bg-slate-50">
        <SectionHeading
          eyebrow="Testimonials"
          title="Student Success Stories"
        />

        {/* TESTIMONIAL CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-900 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <FaQuoteLeft className="text-xl text-slate-200 transition-colors duration-300 group-hover:text-accent-400" />
                <span className="flex items-center gap-0.5 text-[11px] text-amber-400">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </span>
              </div>

              <blockquote className="mt-2 flex-1 text-sm italic leading-relaxed text-gray-600">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              <figcaption className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
                <span className="text-sm font-extrabold tracking-tight text-brand-950">
                  {testimonial.name}
                </span>
                <span className="rounded-full bg-accent-100 px-2.5 py-1 text-[11px] font-bold uppercase text-accent-600">
                  {testimonial.course}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section spacing="md" className="bg-brand-900">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-extrabold tracking-tight !text-white text-xl sm:text-2xl">
            Ready To Start Your <span className="text-accent-400">MBBS Journey?</span>
          </h2>
          <p className="mx-auto mt-2 mb-6 max-w-2xl text-sm leading-relaxed text-slate-300">
            Connect with our expert counselors today and get personalized
            guidance for MBBS admissions in India and Abroad.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row justify-center">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full bg-accent-400 px-6 text-sm font-bold text-brand-950 transition-colors hover:bg-accent-500"
            >
              Get Free Counseling
            </Link>
            <Link
              href="tel:+919920798988"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Call Now
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default AboutPage;
