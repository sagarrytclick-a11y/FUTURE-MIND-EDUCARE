"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaGlobeAsia,
  FaUniversity,
} from "react-icons/fa";

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
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-slate-900">
            Loading Countries...
          </h2>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-4">
            Something Went Wrong
          </h2>

          <p className="text-red-500 font-medium">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 bg-[#F8FAFC] overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#f8fafc,#ffffff)]" />

      {/* LIGHT EFFECT */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-100 blur-3xl opacity-40 rounded-full" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <FaGlobeAsia className="text-blue-600 text-sm" />

            <span className="text-blue-700 text-xs font-bold tracking-widest uppercase">
              Global MBBS Destinations
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            Top Countries For
            <span className="text-blue-600"> MBBS Abroad</span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-6 text-slate-500 text-base md:text-lg leading-8 font-medium">
            Explore world-class medical universities with affordable tuition
            fees, global recognition, and outstanding career opportunities.
          </p>
        </div>

        {/* COUNTRIES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {countries.map((country, index) => (
            <motion.div
              key={country.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
            >
              <Link
                href={`/country/${getCountrySlug(country.name)}`}
                className="group block h-full"
              >
                <div
                  className="
                    relative
                    h-full
                    bg-white
                    border
                    border-slate-200
                    rounded-[32px]
                    overflow-hidden
                    hover:border-blue-100
                    hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]
                    transition-all
                    duration-500
                  "
                >
                  {/* TOP LINE */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />

                  {/* IMAGE */}
                  <div className="relative h-[240px] overflow-hidden">
                    <img
                      src={country.image}
                      alt={country.name}
                      className="
                        w-full
                        h-full
                        object-cover
                        group-hover:scale-110
                        transition-transform
                        duration-700
                      "
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* UNIVERSITIES */}
                    <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                      <div className="flex items-center gap-2">
                        <FaUniversity className="text-blue-600 text-xs" />

                        <span className="text-xs font-bold text-slate-800">
                          {country.universities} Universities
                        </span>
                      </div>
                    </div>

                    {/* COUNTRY NAME */}
                    <div className="absolute bottom-5 left-5 flex items-center gap-3">
                      <img
                        src={country.flag}
                        alt={country.name}
                        className="w-10 h-7 rounded-md object-cover border border-white/20 shadow-md"
                      />

                      <h3 className="text-2xl font-black text-white">
                        {country.name}
                      </h3>
                    </div>
                  </div>

                  {/* CONTENT */}
                  {/* CONTENT */}
<div className="p-7 flex flex-col">
  
  {/* DESCRIPTION */}
  <p className="text-slate-500 leading-7 text-sm font-medium">
    {country.description}
  </p>

  {/* COURSE TAG */}
  <div className="mt-5">
    <span className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-bold px-4 py-2 rounded-full border border-blue-100">
      {country.courses}
    </span>
  </div>

  {/* BUTTON */}
  <div
    className="
      mt-6
      flex
      items-center
      justify-between
      border-t
      border-slate-100
      pt-5
    "
  >
    <span className="text-slate-900 font-black text-sm">
      View Country
    </span>

    <div
      className="
        w-11
        h-11
        rounded-2xl
        bg-slate-100
        group-hover:bg-blue-600
        flex
        items-center
        justify-center
        transition-all
        duration-300
      "
    >
      <FaArrowRight className="text-slate-500 group-hover:text-white transition-colors duration-300 text-sm" />
    </div>
  </div>
</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="flex justify-center mt-16">
          <Link
            href="/colleges/mbbs-abroad"
            className="
              group
              inline-flex
              items-center
              gap-3
              bg-blue-600
              hover:bg-blue-700
              text-white
              h-14
              px-8
              rounded-full
              font-bold
              text-sm
              shadow-[0_15px_35px_rgba(37,99,235,0.25)]
              transition-all
              duration-300
              hover:scale-[1.03]
            "
          >
            View All Countries

            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopCountriesSection;