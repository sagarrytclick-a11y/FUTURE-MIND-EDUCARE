"use client"
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import { SkeletonGrid, SkeletonHeading } from "@/components/Skeleton";
import CollegeCardImage from "@/components/CollegeCardImage";

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

  useEffect(() => {
    let cancelled = false;

    const loadBlogs = async () => {
      try {
        const response = await fetch('/blogs.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!cancelled && data.blogs) {
          setBlogs(data.blogs);
        }
      } catch (error) {
        if (!cancelled) console.error('Error fetching blogs:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadBlogs();

    return () => {
      cancelled = true;
    };
  }, []);

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
      <Section spacing="md" className="bg-slate-50">
        <SkeletonHeading />
        <SkeletonGrid count={3} cols={3} className="mt-6" />
      </Section>
    );
  }

  const BlogCard = ({ blog }: { blog: BlogItem }) => {
    return (
      <Link
        href={`/blog/${blog.id}`}
        className="group bg-white hover:bg-brand-950 border border-slate-200 hover:border-brand-900 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
      >
        <div className="relative h-44 w-full overflow-hidden bg-slate-100">
          <CollegeCardImage
            src={blog.image}
            alt={blog.title}
            width={640}
            height={352}
            className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-2.5 left-2.5 bg-accent-400 text-brand-950 text-[11px] font-bold uppercase rounded-full px-2.5 py-1 shadow-sm">
            {blog.category}
          </span>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <p className="text-[11px] uppercase text-gray-400 group-hover:text-slate-400 font-semibold tracking-wide transition-colors duration-300">
            {blog.date} · {blog.readTime}
          </p>
          <h3 className="mt-1.5 font-bold text-brand-950 group-hover:text-white leading-snug line-clamp-2 transition-colors duration-300">
            {blog.title}
          </h3>
          <p className="text-gray-600 group-hover:text-slate-300 text-sm leading-6 line-clamp-2 mt-1.5 transition-colors duration-300">
            {blog.description}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-brand-950 group-hover:text-accent-400 font-semibold text-sm transition-colors duration-300">
            Read article
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    );
  };

  return (
    <Section spacing="md" className="bg-slate-50 overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
        <SectionHeading
          align="left"
          className="!mb-0"
          eyebrow="Latest Articles"
          title={
            <>
              Explore Our <span className="text-accent-600">MBBS Blogs</span>
            </>
          }
          description="Latest updates, admission guidance, university insights, and MBBS abroad tips."
        />

        {/* NAV BUTTONS */}
        {!showAllBlogs && (
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                setIsAutoPlay(false);
                handlePrev();
              }}
              aria-label="Previous blogs"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-brand-900 flex items-center justify-center text-slate-700 hover:text-brand-900 shadow-sm transition-all duration-300 text-sm"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={() => {
                setIsAutoPlay(false);
                handleNext();
              }}
              aria-label="Next blogs"
              className="w-10 h-10 rounded-full bg-brand-950 hover:bg-brand-900 flex items-center justify-center text-white shadow-lg transition-all duration-300 text-sm"
            >
              <FaChevronRight />
            </button>

            <Link
              href="/blog"
              className="ml-1 inline-flex h-10 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 text-xs font-bold uppercase tracking-wide text-brand-950 shadow-sm transition-all duration-300 hover:border-brand-900 hover:bg-accent-100"
            >
              All blogs
              <FaChevronRight className="text-[10px]" />
            </Link>
          </div>
        )}
      </div>

      {/* ARTICLE CARDS */}
      {!showAllBlogs ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredBlogs
            .slice(currentIndex, currentIndex + CARDS_PER_VIEW)
            .map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {/* BUTTON */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <button
          onClick={() => setShowAllBlogs(!showAllBlogs)}
          className="inline-flex items-center gap-1.5 h-11 px-6 rounded-full bg-accent-400 text-brand-950 text-sm font-bold border border-accent-400 hover:bg-accent-500 transition-all duration-300"
        >
          {showAllBlogs ? 'Show featured articles →' : 'View all articles →'}
        </button>

        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 h-11 px-6 rounded-full bg-brand-950 text-white text-sm font-bold hover:bg-brand-900 transition-colors duration-300"
        >
          Browse blog library
          <FaChevronRight className="text-[10px]" />
        </Link>
      </div>
    </Section>
  );
};

export default React.memo(BlogSection);
