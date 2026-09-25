"use client";

import React from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaUniversity,
} from "react-icons/fa";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";

interface CountryItem {
  id: number;
  name: string;
  flag: string;
  image: string;
  description: string;
  universities: number;
  courses: string;
}

const TopCountriesSection: React.FC = () => {
  const [countries, setCountries] = React.useState<CountryItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("/mbbs-abroad.json");

        if (!response.ok) {
          throw new Error("Failed to fetch country data");
        }

        const data = await response.json();

        const transformedCountries: CountryItem[] = data.countries.map(
          (country: any) => ({
            id: country.id,
            name: country.name,
            flag: country.flag,
            image: country.image,
            description: country.description,
            universities: country.universities,
            courses: country.courses,
          })
        );

        setCountries(transformedCountries);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load country data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const getCountrySlug = (countryName: string): string => {
    return countryName.toLowerCase().replace(/\s+/g, "-");
  };

  if (loading) {
    return (
      <Section spacing="md" className="bg-slate-50">
        <div className="text-center">
          <div className="inline-block h-10 w-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto"></div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight mt-4">
            Loading Countries...
          </h2>
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section spacing="md" className="bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight mb-2">
            Something Went Wrong
          </h2>

          <p className="text-red-500 text-sm font-medium">{error}</p>
        </div>
      </Section>
    );
  }

  return (
    <Section spacing="md" className="relative bg-slate-50 overflow-hidden">
      <div className="relative z-10">
        <SectionHeading
          eyebrow="Global MBBS Destinations"
          title={<>Top Countries For <span className="text-accent-600">MBBS Abroad</span></>}
          description="Explore world-class medical universities with affordable tuition fees and global recognition."
        />

        {/* AUTO-SCROLLING COUNTRY ROW — infinite marquee, pauses on hover */}
        <div className="marquee-viewport -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="marquee-track gap-4">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex gap-4 pr-4" aria-hidden={copy === 1}>
                {countries.map((country) => (
                  <Link
                    key={`${copy}-${country.id}`}
                    href={`/country/${getCountrySlug(country.name)}`}
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="group block w-[240px] shrink-0"
                  >
                    <div className="h-full bg-white hover:bg-brand-950 border border-slate-200 hover:border-brand-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      {/* IMAGE */}
                      <div className="relative h-28 overflow-hidden">
                        <img
                          src={country.image}
                          alt={country.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2.5 inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full pl-1 pr-2.5 py-1">
                          <img
                            src={country.flag}
                            alt={country.name}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                        </span>
                      </div>

                      {/* BODY — name + count + View link */}
                      <div className="p-3">
                        <h3 className="text-brand-950 group-hover:text-white font-bold leading-tight truncate transition-colors duration-300">
                          {country.name}
                        </h3>
                        <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 group-hover:text-slate-300 transition-colors duration-300">
                          <FaUniversity className="text-brand-950 group-hover:text-accent-400 text-xs shrink-0 transition-colors duration-300" />
                          {country.universities} Universities
                        </p>
                        <span className="mt-1.5 inline-flex items-center gap-1 text-sm font-bold text-brand-950 group-hover:text-accent-400 transition-colors duration-300">
                          View <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="flex justify-center mt-6">
          <Link
            href="/colleges/mbbs-abroad"
            className="group inline-flex items-center gap-2 bg-brand-950 hover:bg-brand-900 text-white font-bold h-11 px-6 rounded-full text-sm transition-colors duration-300"
          >
            View All Countries
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 text-xs" />
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default TopCountriesSection;
