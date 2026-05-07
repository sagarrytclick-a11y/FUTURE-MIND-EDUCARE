"use client"
import Link from 'next/link';
import React from 'react';
import { FaGraduationCap, FaUsers, FaAward, FaClock, FaCheckCircle, FaQuoteLeft, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

const AboutPage: React.FC = () => {
  const stats = [
    { number: "5000+", label: "Students Placed", icon: FaUsers },
    { number: "100+", label: "Partner Colleges", icon: FaGraduationCap },
    { number: "15+", label: "Years Experience", icon: FaClock },
    { number: "98%", label: "Success Rate", icon: FaAward }
  ];

  const team = [
    {
      name: "Dr. Rajesh Kumar",
      position: "Founder & CEO",
      image: "/team/ceo.jpg",
      description: "MBBS, MD - 15+ years of experience in medical education counseling",
      expertise: ["MBBS Admissions", "NEET Counseling", "Career Guidance"]
    },
    {
      name: "Dr. Priya Sharma",
      position: "Academic Director",
      image: "/team/director.jpg",
      description: "MBBS, MS - Expert in medical college selection and admission procedures",
      expertise: ["College Selection", "Documentation", "Interview Prep"]
    },
    {
      name: "Mr. Amit Patel",
      position: "Operations Head",
      image: "/team/operations.jpg",
      description: "MBA - 10+ years in educational consultancy operations and management",
      expertise: ["Process Management", "Student Support", "Logistics"]
    },
    {
      name: "Ms. Sarah Johnson",
      position: "International Relations",
      image: "/team/international.jpg",
      description: "MA International Relations - Specialized in overseas medical education",
      expertise: ["MBBS Abroad", "Visa Assistance", "Global Partnerships"]
    }
  ];

  const testimonials = [
    {
      name: "Ananya Singh",
      course: "MBBS - AIIMS Delhi",
      quote: "FUTURE MIND EDUCARE guided me through the entire NEET counseling process. Their expertise helped me secure a seat in AIIMS Delhi.",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      course: "MBBS - Philippines",
      quote: "Thanks to their guidance, I'm now pursuing my MBBS dream in Philippines. The team handled everything perfectly.",
      rating: 5
    },
    {
      name: "Priya Nair",
      course: "MBBS - KMC Manipal",
      quote: "Professional and trustworthy service. They helped me choose the right college and assisted with all documentation.",
      rating: 5
    }
  ];

  const achievements = [
    "Mumbai's No. 1 MBBS Consultancy",
    "98% Student Satisfaction Rate",
    "5000+ Successful Placements",
    "100+ Partner Colleges Worldwide",
    "15+ Years of Experience",
    "24/7 Student Support System"
  ];

  const socialLinks = [
    { icon: FaFacebook, link: "#", color: "text-blue-600" },
    { icon: FaInstagram, link: "#", color: "text-pink-600" },
    { icon: FaTwitter, link: "#", color: "text-sky-400" },
    { icon: FaLinkedin, link: "#", color: "text-blue-700" },
    { icon: FaYoutube, link: "#", color: "text-red-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About FUTURE MIND EDUCARE</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Mumbai's trusted MBBS consultancy with 15+ years of experience in guiding medical aspirants to their dream careers
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2008, FUTURE MIND EDUCARE started with a simple mission: to help medical aspirants navigate the complex world of MBBS admissions. What began as a small counseling center in Mumbai has grown into one of India's most trusted medical education consultancies.
                </p>
                <p>
                  Over the past 15+ years, we have guided over 5000 students to secure admissions in prestigious medical colleges across India and abroad. Our expertise spans NEET counseling, college selection, documentation assistance, and complete admission support.
                </p>
                <p>
                  We believe that every deserving student should get the opportunity to pursue their dream of becoming a doctor. Our personalized approach, extensive network of partner colleges, and experienced team make us the preferred choice for MBBS aspirants.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
              <img src="https://i.pinimg.com/736x/db/3b/1a/db3b1a2d9ed8b906a294ec242cbf214d.jpg" alt="Our Journey" className="w-full h-full object-cover" />
             
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h3>
              <p className="text-blue-800">
                To provide comprehensive, ethical, and transparent guidance to medical aspirants, helping them secure admissions in the best medical colleges that match their aspirations, budget, and career goals.
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Our Vision</h3>
              <p className="text-green-800">
                To become the most trusted and preferred medical education consultancy in India, known for our student-centric approach, ethical practices, and exceptional success rates in MBBS admissions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recognized for excellence in medical education counseling and student success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4">
                <FaCheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                <span className="text-gray-700">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    

      {/* Testimonials Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our students who achieved their medical dreams with our guidance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <FaQuoteLeft className="w-8 h-8 text-blue-600 mb-4" />
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-blue-600">{testimonial.course}</div>
                  <div className="flex mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Medical Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful medical students who started their journey with FUTURE MIND EDUCARE
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Get Started Now
            </Link>
            <Link href="tel:+919876543210" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors">
              Call Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
