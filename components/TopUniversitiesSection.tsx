"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import CollegeCardImage from "@/components/CollegeCardImage";

interface UniversityItem {
  name: string;
  description: string;
  image: string;
  city?: string;
  fees?: string;
  ranking?: string;
  type?: string;
  slug?: string;
  id?: number;
}

interface CollegeData {
  id: number;
  name: string;
  city: string;
  fees: string;
  seats: number;
  recognition: string;
  ranking: string;
  type: string;
  image: string;
}

interface StateData {
  id: number;
  name: string;
  image: string;
  description: string;
  colleges: CollegeData[];
}

interface MbbsData {
  states: StateData[];
}

const TopUniversitiesSection: React.FC = () => {
  const [universities, setUniversities] = useState<UniversityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch("/mbbs-india.json");

        if (!response.ok) {
          throw new Error("Failed to fetch university data");
        }

        const data: MbbsData = await response.json();

        const topUniversities: UniversityItem[] = [];
        const seenUniversities = new Set<string>();

        data.states.forEach((state) => {
          state.colleges.forEach((college) => {
            if (
              topUniversities.length < 6 &&
              !seenUniversities.has(college.name)
            ) {
              const slug = college.name
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, "")
                .replace(/\s+/g, "-");

              topUniversities.push({
                name: college.name,
                description: `${college.type} medical college with ${college.seats} seats and ${college.recognition} recognition.`,
                image: college.image,
                city: college.city,
                fees: college.fees,
                ranking: college.ranking,
                type: college.type,
                slug,
                id: college.id,
              });

              seenUniversities.add(college.name);
            }
          });
        });

        setUniversities(topUniversities.slice(0, 6));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  return (
    <Section spacing="md" className="relative bg-white overflow-hidden">
      <div className="relative z-10">
        <SectionHeading
          eyebrow="Top Medical Colleges"
          title={
            <>
              Top MBBS <span className="text-accent-600">Universities In India</span>
            </>
          }
          description="Discover India's leading medical universities with world-class education and excellent career opportunities."
        />

        {loading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-12 w-12 rounded-full border-4 border-gray-200 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* 3-COL IMAGE CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {universities.map((university, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/colleges/${university.slug}`}
                    className="group block bg-white border border-slate-200 hover:border-brand-900 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <CollegeCardImage
                        src={university.image}
                        alt={university.name}
                        width={640}
                        height={352}
                        className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        {university.type && (
                          <span className="bg-slate-100 text-slate-600 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">
                            {university.type}
                          </span>
                        )}
                        {university.ranking && (
                          <span className="bg-accent-100 text-accent-600 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">
                            {university.ranking}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-brand-950 leading-snug line-clamp-2 min-h-[2.75rem]">
                        {university.name}
                      </h3>
                      {university.city && (
                        <p className="flex items-center gap-1.5 text-gray-600 text-sm mt-1.5 pb-2 border-b border-slate-100">
                          <FaMapMarkerAlt className="text-[11px] text-accent-500 shrink-0" />
                          <span className="truncate">{university.city}</span>
                        </p>
                      )}
                      {university.fees && (
                        <p className="mt-2 text-sm font-extrabold text-brand-950">
                          {university.fees}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Link
                href="/colleges/mbbs-abroad"
                className="inline-flex items-center bg-brand-950 hover:bg-brand-900 text-white font-bold rounded-full h-11 px-6 text-sm transition-colors"
              >
                View All Universities
              </Link>
            </div>

          
          </>
        )}
      </div>
    </Section>
  );
};

export default TopUniversitiesSection;
