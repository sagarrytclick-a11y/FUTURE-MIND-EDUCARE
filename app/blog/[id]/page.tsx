"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaRegCalendarAlt,
  FaRegClock,
  FaArrowLeft,
  FaArrowRight,
  FaBookmark,
  FaLink,
} from "react-icons/fa";

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
  content?: string;
}

const BlogPostPage: React.FC = () => {
  const params = useParams();

  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length > 0 && params.id) {
      const blogId = parseInt(params.id as string);
      const foundBlog = blogs.find((b) => b.id === blogId);

      if (foundBlog) {
        setBlog(foundBlog);
      }

      setLoading(false);
    }
  }, [blogs, params.id]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/blogs.json");
      const data = await response.json();

      if (data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getRelatedBlogs = () => {
    if (!blog) return [];

    return blogs
      .filter(
        (b) =>
          b.id !== blog.id &&
          (b.category === blog.category ||
            b.tags.some((tag) => blog.tags.includes(tag)))
      )
      .slice(0, 3);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading Article...
          </p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-lg w-full">
          <h1 className="text-3xl font-black text-gray-900 mb-4">
            Blog Not Found
          </h1>

          <p className="text-gray-600 mb-8">
            The article you are looking for does not exist.
          </p>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            <FaArrowLeft />
            Back To Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedBlogs = getRelatedBlogs();

  return (
    <div className="bg-[#f5f7fb] min-h-screen">
      {/* HERO */}
      <section className="relative h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20"></div>

        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
          <Link
            href="/blog"
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 md:px-6 md:py-3 rounded-xl border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-sm md:text-base font-semibold"
          >
            <FaArrowLeft />
            Back
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-20">
          <div className="max-w-5xl mx-auto px-4 md:px-6 pb-12 md:pb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-blue-500 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-lg text-xs md:text-sm font-bold shadow-lg mb-4 md:mb-6 uppercase tracking-wider"
            >
              {blog.category}
            </motion.span>

            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] max-w-4xl tracking-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 md:gap-8 mt-6 md:mt-10 text-gray-200">
              <div className="flex items-center gap-2 text-sm md:text-base">
                <FaRegCalendarAlt className="text-blue-400" />
                <span className="font-medium">{blog.date}</span>
              </div>

              <div className="flex items-center gap-2 text-sm md:text-base">
                <FaRegClock className="text-blue-400" />
                <span className="font-medium">{blog.readTime}</span>
              </div>

              <div className="flex items-center gap-2 text-sm md:text-base">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white">
                  {blog.author.charAt(0)}
                </div>
                <span className="font-semibold">By {blog.author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 -mt-10 md:-mt-16 relative z-30 mb-12">
        <div className="bg-white rounded-[24px] md:rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
          {/* DESCRIPTION */}
          <div className="p-6 md:p-14 border-b border-gray-50 bg-gray-50/30">
            <p className="text-lg md:text-2xl leading-[1.6] md:leading-[1.8] text-gray-700 font-medium italic opacity-90">
              {blog.description}
            </p>
          </div>

          {/* CONTENT */}
          {blog.content && (
            <div className="p-6 md:p-14">
              <div
                className="
                  prose 
                  prose-sm
                  md:prose-xl
                  max-w-none
                  prose-headings:text-gray-900
                  prose-headings:font-black
                  prose-p:text-gray-700
                  prose-p:leading-[1.8]
                  prose-strong:text-black
                  prose-a:text-blue-600
                  prose-img:rounded-3xl
                  prose-img:shadow-xl
                "
                dangerouslySetInnerHTML={{
                  __html: blog.content.replace(/\n/g, "<br />"),
                }}
              />
            </div>
          )}

          {/* TAGS */}
          <div className="px-6 md:px-14 pb-12">
            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
              Popular Tags
            </h3>

            <div className="flex flex-wrap gap-2 md:gap-3">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="
                    px-4 py-2 rounded-xl
                    bg-gray-100
                    text-gray-700
                    text-xs md:text-sm
                    font-bold
                    hover:bg-blue-600
                    hover:text-white
                    transition-all
                    duration-300
                    cursor-pointer
                  "
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SHARE */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] shadow-xl mt-8 md:mt-12 p-6 md:p-10 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3">
                Share This Article
              </h3>

              <p className="text-sm md:text-base text-gray-600 font-medium">
                Help others discover this valuable medical education insight.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-bold text-sm hover:scale-105 transition-all shadow-lg"
              >
                <FaLink />
                {copied ? 'Copied!' : 'Copy Link'}
              </button>

              <button className="w-12 h-12 rounded-xl border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm">
                <FaBookmark />
              </button>
            </div>
          </div>
        </div>

        {/* RELATED BLOGS */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16 md:mt-24 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3">
                  Related Articles
                </h2>

                <p className="text-sm md:text-lg text-gray-600 font-medium">
                  Continue reading more medical education insights
                </p>
              </div>

              <Link href="/blog" className="text-blue-600 font-bold hover:underline flex items-center gap-2">
                View All Posts →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <Link href={`/blog/${relatedBlog.id}`} key={relatedBlog.id}>
                  <div
                    className="
                      group
                      bg-white
                      rounded-[24px] md:rounded-[32px]
                      overflow-hidden
                      shadow-md
                      hover:shadow-2xl
                      transition-all
                      duration-500
                      hover:-translate-y-2
                      border border-gray-100
                      h-full
                      flex flex-col
                    "
                  >
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <img
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
                        {relatedBlog.category}
                      </span>
                    </div>

                    <div className="p-6 md:p-8 flex-grow flex flex-col">
                      <div className="flex items-center gap-4 text-[10px] md:text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5">
                          <FaRegCalendarAlt className="text-blue-500" />
                          {relatedBlog.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaRegClock className="text-blue-500" />
                          {relatedBlog.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg md:text-xl font-black text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                        {relatedBlog.title}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-6 font-medium opacity-80">
                        {relatedBlog.description}
                      </p>

                      <div className="mt-auto pt-6 border-t border-gray-50 text-blue-600 font-bold flex items-center justify-between">
                        <span className="text-sm">Read Article</span>
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <FaArrowRight className="text-[10px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPostPage;