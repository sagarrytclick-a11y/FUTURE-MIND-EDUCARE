"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegCalendarAlt,
  FaRegClock,
} from 'react-icons/fa';

interface BlogItem {
  id: number;
  title: string;
  description: string;
  image: string;
  overlayText: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

const BlogSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  const CARDS_PER_VIEW = 3;

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await fetch('/blogs.json');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const featuredBlogs = useMemo(() => blogs.slice(0, 9), [blogs]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev + CARDS_PER_VIEW >= featuredBlogs.length
        ? 0
        : prev + CARDS_PER_VIEW
    );
  }, [featuredBlogs.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(0, featuredBlogs.length - CARDS_PER_VIEW)
        : prev - CARDS_PER_VIEW
    );
  }, [featuredBlogs.length]);

  useEffect(() => {
    if (!isAutoPlay || showAllBlogs || featuredBlogs.length === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, showAllBlogs, featuredBlogs.length, handleNext]);

  if (loading) {
    return (
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block h-12 w-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
        </div>
      </section>
    );
  }

  const BlogCard = ({ blog }: { blog: BlogItem }) => {
    return (
      <div
        className="
          group
          bg-white
          rounded-[28px]
          overflow-hidden
          border
          border-slate-200
          hover:border-blue-200
          transition-all
          duration-500
          hover:-translate-y-2
          hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]
          flex
          flex-col
          h-full
        "
      >
        {/* IMAGE */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white text-[11px] font-bold px-4 py-1.5 rounded-lg uppercase tracking-wider shadow-lg">
              {blog.category}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col flex-1">
          {/* META */}
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
            <span className="flex items-center gap-2">
              <FaRegCalendarAlt className="text-blue-600" />
              {blog.date}
            </span>

            <span className="flex items-center gap-2">
              <FaRegClock className="text-blue-600" />
              {blog.readTime}
            </span>
          </div>

          {/* TITLE */}
          <h3
            className="
              text-xl
              font-black
              text-slate-900
              leading-snug
              mb-3
              line-clamp-2
              group-hover:text-blue-600
              transition-colors
            "
          >
            {blog.title}
          </h3>

          {/* DESC */}
          <p className="text-slate-600 text-sm leading-7 line-clamp-3 mb-6">
            {blog.description}
          </p>

          {/* FOOTER */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {blog.tags.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="
                    text-[11px]
                    font-semibold
                    text-blue-700
                    bg-blue-50
                    px-3
                    py-1
                    rounded-lg
                  "
                >
                  #{tag}
                </span>
              ))}
            </div>

            <button
              className="
                flex
                items-center
                gap-2
                text-blue-600
                font-bold
                text-sm
                group/btn
              "
            >
              Read More

              <span className="group-hover/btn:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 px-4 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <span
              className="
                inline-block
                text-blue-600
                bg-blue-50
                border
                border-blue-100
                px-4
                py-2
                rounded-lg
                text-xs
                font-bold
                tracking-[0.2em]
                uppercase
                mb-5
              "
            >
              Latest Articles
            </span>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Explore Our
              <span className="text-blue-600"> MBBS Blogs</span>
            </h2>

            <p className="mt-5 text-slate-500 text-lg leading-8">
              Get the latest updates, admission guidance, university insights,
              and MBBS abroad tips from our experts.
            </p>
          </div>

          {/* NAV BUTTONS */}
          {!showAllBlogs && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsAutoPlay(false);
                  handlePrev();
                }}
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-white
                  border
                  border-slate-200
                  hover:border-blue-200
                  flex
                  items-center
                  justify-center
                  text-slate-700
                  hover:text-blue-600
                  shadow-sm
                  transition-all
                  duration-300
                "
              >
                <FaChevronLeft />
              </button>

              <button
                onClick={() => {
                  setIsAutoPlay(false);
                  handleNext();
                }}
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-blue-600
                  hover:bg-blue-700
                  flex
                  items-center
                  justify-center
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                "
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        {/* BLOG GRID */}
        {!showAllBlogs ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs
              .slice(currentIndex, currentIndex + CARDS_PER_VIEW)
              .map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

        {/* BUTTON */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => setShowAllBlogs(!showAllBlogs)}
            className="
              px-8
              py-4
              rounded-lg
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-bold
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
            "
          >
            {showAllBlogs
              ? 'Show Featured Blogs'
              : `View All ${blogs.length} Blogs`}
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(BlogSection);