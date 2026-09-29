"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FaRegCalendarAlt,
  FaRegClock,
  FaArrowLeft,
  FaArrowRight,
  FaBookmark,
  FaLink,
} from "react-icons/fa";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { handleImageError } from "@/lib/img-fallback";
import { SkeletonDetail } from "@/components/Skeleton";
import Image from "next/image";

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

  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loadFailed, setLoadFailed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Derived during render instead of being pushed through an effect.
  const blogId = Number.parseInt(String(params.id ?? ""), 10);
  const blog = useMemo(
    () => blogs.find((b) => b.id === blogId) ?? null,
    [blogs, blogId]
  );
  const loading = blogs.length === 0 && !loadFailed;

  useEffect(() => {
    let cancelled = false;

    const fetchBlogs = async () => {
      try {
        const response = await fetch("/blogs.json");
        const data = await response.json();

        if (!cancelled && data.blogs) {
          setBlogs(data.blogs);
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) setLoadFailed(true);
      }
    };

    fetchBlogs();

    return () => {
      cancelled = true;
    };
  }, []);

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
    return <SkeletonDetail />;
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center max-w-lg w-full">
          <h1 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg mb-2">Blog Not Found</h1>
          <p className="text-sm text-gray-600 mb-5">The article you are looking for does not exist.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 h-11 px-6 bg-brand-950 hover:bg-brand-900 text-white rounded-full text-sm font-bold transition-colors"
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
    <div className="bg-white min-h-screen">
      <PageHero
        align="center"
        variant="dark"
        eyebrow={blog.category}
        title={blog.title}
        description={`By ${blog.author} • ${blog.date} • ${blog.readTime}`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: blog.category }]}
      />

      <Section spacing="md">
        <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
          {/* Main article in white cards */}
          <article className="min-w-0">
            <span className="relative block h-56 w-full overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="h-full w-full object-cover"
                onError={handleImageError}
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase text-brand-950">
                {blog.category}
              </span>
            </span>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm leading-relaxed text-gray-600 font-medium italic">
                {blog.description}
              </p>
            </div>

            {blog.content && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
                <div
                  className="prose prose-sm max-w-none prose-headings:text-brand-950 prose-headings:font-extrabold prose-p:text-gray-600 prose-p:text-sm prose-p:leading-relaxed prose-strong:text-brand-950 prose-a:text-brand-950 prose-img:rounded-lg"
                  dangerouslySetInnerHTML={{
                    __html: blog.content.replace(/\n/g, "<br />"),
                  }}
                />
              </div>
            )}

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg mb-3 flex items-center gap-2.5">
                <span className="w-6 h-1 bg-brand-950 rounded-full"></span>
                Popular Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-slate-100 text-slate-600 text-[11px] font-bold uppercase rounded-full px-2.5 py-1 hover:bg-brand-950 hover:text-white transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Sticky sidebar card */}
          <aside className="space-y-4 lg:sticky top-header-gap lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-600">Author</p>
              <p className="mt-1 text-sm font-extrabold text-brand-950 tracking-tight">{blog.author}</p>
              <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
                <span className="inline-flex items-center gap-1">
                  <FaRegCalendarAlt />
                  {blog.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <FaRegClock />
                  {blog.readTime}
                </span>
              </p>
              <span className="mt-2 inline-block rounded-full bg-accent-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-950">
                {blog.category}
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-brand-950 font-extrabold tracking-tight text-base mb-1">Share This Article</h2>
              <p className="text-sm text-gray-600 mb-3">Help others discover this insight.</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-brand-950 text-sm font-bold text-white transition-colors hover:bg-brand-900"
                >
                  <FaLink className="text-xs" />
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <button className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-brand-950 hover:bg-brand-950 hover:text-white">
                  <FaBookmark className="text-sm" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-brand-900 p-5 text-white">
              <h2 className="text-brand-950 font-extrabold tracking-tight text-base !text-white mb-1">Need MBBS Guidance?</h2>
              <p className="text-sm text-brand-100 mb-3">Talk to our counselors for free.</p>
              <Link
                href="/contact"
                className="flex h-11 items-center justify-center rounded-full bg-white text-sm font-bold text-brand-950 transition-colors hover:bg-accent-100"
              >
                Get Free Counseling
              </Link>
            </div>

            <Link
              href="/blog"
              className="flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
            >
              <FaArrowLeft className="text-xs" />
              Back To Blog
            </Link>
          </aside>
        </div>

        {relatedBlogs.length > 0 && (
          <div className="mt-8">
            <div className="mb-4 flex flex-col items-center gap-2 text-center">
              <SectionHeading
                align="center"
                title="Related Articles"
                description="Continue reading more medical education insights"
                className="mb-0"
              />
              <Link href="/blog" className="text-brand-950 text-sm font-bold hover:underline flex items-center gap-1.5 shrink-0">
                View All Posts →
              </Link>
            </div>

            {/* Related as card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  href={`/blog/${relatedBlog.id}`}
                  key={relatedBlog.id}
                  className="group flex flex-col h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-900 hover:shadow-xl"
                >
                  <div className="relative h-40 overflow-hidden bg-slate-100">
                    <Image
                     src={relatedBlog.image}
                     alt={relatedBlog.title}
                     fill
                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                     className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                     onError={handleImageError}
                   />
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-accent-400 px-2.5 py-1 text-[11px] font-bold uppercase text-brand-950">
                      {relatedBlog.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                      {relatedBlog.readTime}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-brand-950 font-extrabold tracking-tight text-base leading-snug transition-colors duration-300 group-hover:text-accent-600">
                      {relatedBlog.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-600">
                      {relatedBlog.description}
                    </p>

                    <span className="mt-auto flex items-center justify-between gap-2 pt-3">
                      <span className="truncate text-xs text-gray-500">
                        {relatedBlog.date}
                      </span>
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-600 transition-colors duration-300 group-hover:bg-accent-400 group-hover:text-brand-950">
                        <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>
    </div>
  );
};

export default BlogPostPage;
