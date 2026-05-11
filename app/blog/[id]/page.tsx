"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FaRegCalendarAlt,
  FaRegClock,
  FaArrowLeft,
  FaShareAlt,
  FaBookmark,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
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
      <section className="relative h-[500px] overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10"></div>

        <div className="absolute top-6 left-6 z-20">
          <Link
            href="/blog"
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-lg border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
          >
            <FaArrowLeft />
            Back
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-20">
          <div className="max-w-5xl mx-auto px-6 pb-16">
            <span className="inline-block bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-lg mb-6">
              {blog.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight max-w-4xl">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mt-8 text-gray-200">
              <span className="flex items-center gap-2">
                <FaRegCalendarAlt className="text-blue-400" />
                {blog.date}
              </span>

              <span className="flex items-center gap-2">
                <FaRegClock className="text-blue-400" />
                {blog.readTime}
              </span>

              <span className="font-medium">By {blog.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 -mt-20 relative z-30">
        <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100">
          {/* DESCRIPTION */}
          <div className="p-8 md:p-12 border-b border-gray-100">
            <p className="text-xl leading-9 text-gray-700 font-light">
              {blog.description}
            </p>
          </div>

          {/* CONTENT */}
          {blog.content && (
            <div className="p-8 md:p-12">
              <div
                className="
                  prose 
                  prose-lg 
                  max-w-none
                  prose-headings:text-gray-900
                  prose-p:text-gray-700
                  prose-p:leading-8
                  prose-strong:text-black
                  prose-a:text-blue-600
                  prose-img:rounded-2xl
                "
                dangerouslySetInnerHTML={{
                  __html: blog.content.replace(/\n/g, "<br />"),
                }}
              />
            </div>
          )}

          {/* TAGS */}
          <div className="px-8 md:px-12 pb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-5">
              Popular Tags
            </h3>

            <div className="flex flex-wrap gap-3">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="
                    px-4 py-2 rounded-lg
                    bg-blue-50
                    text-blue-600
                    text-sm
                    font-semibold
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
        <div className="bg-white rounded-[28px] shadow-xl mt-10 p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Share This Article
              </h3>

              <p className="text-gray-600">
                Help others discover this valuable content.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-all">
                <FaFacebookF />
              </button>

              <button className="w-12 h-12 rounded-lg bg-sky-500 text-white flex items-center justify-center hover:scale-110 transition-all">
                <FaTwitter />
              </button>

              <button className="w-12 h-12 rounded-lg bg-green-500 text-white flex items-center justify-center hover:scale-110 transition-all">
                <FaWhatsapp />
              </button>

              <button
                onClick={handleCopy}
                className="w-12 h-12 rounded-lg bg-gray-800 text-white flex items-center justify-center hover:scale-110 transition-all"
              >
                <FaLink />
              </button>

              <button className="w-12 h-12 rounded-lg border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <FaBookmark />
              </button>
            </div>
          </div>

          {copied && (
            <p className="text-green-600 text-sm font-medium mt-4">
              Link copied successfully!
            </p>
          )}
        </div>

        {/* RELATED BLOGS */}
        {relatedBlogs.length > 0 && (
          <div className="mt-20 pb-20">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-2">
                  Related Articles
                </h2>

                <p className="text-gray-600">
                  Continue reading more medical education insights
                </p>
              </div>

              <FaShareAlt className="text-4xl text-blue-500 hidden md:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <Link href={`/blog/${relatedBlog.id}`} key={relatedBlog.id}>
                  <div
                    className="
                      group
                      bg-white
                      rounded-[28px]
                      overflow-hidden
                      shadow-lg
                      hover:shadow-2xl
                      transition-all
                      duration-500
                      hover:-translate-y-2
                      border border-gray-100
                      h-full
                    "
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      <span className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-lg">
                        {relatedBlog.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                        <span>{relatedBlog.date}</span>
                        <span>{relatedBlog.readTime}</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {relatedBlog.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-7 line-clamp-3">
                        {relatedBlog.description}
                      </p>

                      <div className="mt-6 text-blue-600 font-semibold flex items-center gap-2">
                        Read More
                        <span className="group-hover:translate-x-1 transition-transform">
                          →
                        </span>
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