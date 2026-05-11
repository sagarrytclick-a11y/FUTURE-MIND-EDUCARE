"use client"
import Link from 'next/link';
import React from 'react';
import { 
  FaGraduationCap, 
  FaUsers, 
  FaAward, 
  FaClock, 
  FaCheckCircle, 
  FaQuoteLeft,
  FaArrowRight
} from 'react-icons/fa';

const AboutPage: React.FC = () => {
  const stats = [
    { number: "5000+", label: "Students Placed", icon: FaUsers },
    { number: "100+", label: "Partner Colleges", icon: FaGraduationCap },
    { number: "15+", label: "Years Experience", icon: FaClock },
    { number: "98%", label: "Success Rate", icon: FaAward }
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

  const achievements = [
    "5000+ Successful Placements",
    "100+ Partner Colleges",
    "15+ Years Experience",
    "98% Success Rate",
    "Expert Counseling Team",
    "Complete Admission Support"
  ];

  return (
    <div className="bg-white overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-lg blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-300 rounded-lg blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT */}
            <div>
              <span className="inline-block bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-6">
                Trusted MBBS Consultancy
              </span>

              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                Building Future
                <span className="block text-orange-400">
                  Doctors Since 2008
                </span>
              </h1>

              <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-2xl">
                FUTURE MIND EDUCARE has helped thousands of students secure
                admissions in top medical colleges across India and abroad with
                expert counseling and complete admission support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  Start Your Journey
                  <FaArrowRight className="ml-2" />
                </Link>

                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                >
                  Explore Blogs
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://i.pinimg.com/736x/db/3b/1a/db3b1a2d9ed8b906a294ec242cbf214d.jpg"
                  alt="About Future Mind Educare"
                  className="w-full h-[500px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    5000+ Students Guided
                  </h3>
                  <p className="text-blue-100 text-sm">
                    Your trusted partner for MBBS admissions in India & Abroad.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 flex items-center justify-center mb-5">
                  <stat.icon className="text-3xl text-blue-700" />
                </div>

                <h3 className="text-4xl font-black text-gray-900 mb-2">
                  {stat.number}
                </h3>

                <p className="text-gray-600 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-sm">
                Our Story
              </span>

              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mt-4 mb-8 leading-tight">
                Helping Students Achieve Their Medical Dreams
              </h2>

              <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
                <p>
                  FUTURE MIND EDUCARE started with a mission to simplify MBBS
                  admissions for students who dream of becoming doctors.
                </p>

                <p>
                  With years of experience and trusted partnerships with top
                  medical universities, we provide complete support from
                  counseling to final admission.
                </p>

                <p>
                  Our dedicated team ensures every student receives
                  personalized guidance according to their budget, preferences,
                  and career goals.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {achievements.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <FaCheckCircle className="text-green-500 text-2xl mb-4" />

                  <p className="font-semibold text-gray-800 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-14">
            <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-sm">
              Testimonials
            </span>

            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mt-4">
              Student Success Stories
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <FaQuoteLeft className="text-4xl text-blue-200 mb-6" />

                <p className="text-gray-600 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>

                <div className="border-t pt-5">
                  <h3 className="font-bold text-lg text-gray-900">
                    {testimonial.name}
                  </h3>

                  <p className="text-blue-600 text-sm font-medium mb-3">
                    {testimonial.course}
                  </p>

                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="max-w-5xl mx-auto px-4 text-center">

          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Ready To Start Your MBBS Journey?
          </h2>

          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
            Connect with our expert counselors today and get personalized
            guidance for MBBS admissions in India and Abroad.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
            >
              Get Free Counseling
            </Link>

            <Link
              href="tel:+917076909090"
              className="border border-white/30 hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300"
            >
              Call Now
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;