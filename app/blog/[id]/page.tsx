"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaRegCalendarAlt, FaRegClock, FaTag, FaArrowLeft, FaShare, FaBookmark } from 'react-icons/fa';

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
  const router = useRouter();
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length > 0 && params.id) {
      const blogId = parseInt(params.id as string);
      const foundBlog = blogs.find(b => b.id === blogId);
      if (foundBlog) {
        setBlog(foundBlog);
      } else {
        setError('Blog post not found');
      }
      setLoading(false);
    }
  }, [blogs, params.id]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/blogs.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blog post');
      setLoading(false);
    }
  };

  const getRelatedBlogs = () => {
    if (!blog) return [];
    return blogs
      .filter(b => b.id !== blog.id && (b.category === blog.category || b.tags.some(tag => blog.tags.includes(tag))))
      .slice(0, 3);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The blog post you are looking for does not exist.'}</p>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaArrowLeft /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedBlogs = getRelatedBlogs();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors mb-6"
          >
            <FaArrowLeft /> Back to Blog
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {blog.category}
              </span>
            </div>
            <div className="flex gap-3">
              <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors">
                <FaShare />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors">
                <FaBookmark />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
          <span className="flex items-center gap-2">
            <FaRegCalendarAlt className="text-blue-500" />
            {blog.date}
          </span>
          <span className="flex items-center gap-2">
            <FaRegClock className="text-blue-500" />
            {blog.readTime}
          </span>
          <span className="font-medium">By {blog.author}</span>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            {blog.description}
          </p>
        </div>

        {/* Content */}
        {blog.content && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }} />
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Facebook
            </button>
            <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
              Twitter
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              WhatsApp
            </button>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Copy Link
            </button>
          </div>
        </div>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link href={`/blog/${relatedBlog.id}`} key={relatedBlog.id}>
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all duration-300 group cursor-pointer">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                        {relatedBlog.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 mt-2 mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedBlog.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;
