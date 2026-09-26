import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  blogPostingLd,
  breadcrumbLd,
  buildMetadata,
  JsonLd,
} from "@/app/config/seo-utils";
import { SITE_URL } from "@/app/config/seo";
import { findBlog } from "@/lib/seo-data";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const blog = findBlog(id);

  if (!blog) {
    notFound();
  }

  const description = (blog.description || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 300);

  return buildMetadata({
    title: blog.title,
    description:
      description ||
      `${blog.title} - practical guidance on NEET, MBBS admissions and medical education from Future Mind Educare.`,
    path: `/blog/${blog.id}`,
    keywords: blog.tags?.length
      ? blog.tags
      : [blog.category, "NEET", "MBBS admission"],
    images: blog.image ? [{ url: blog.image, alt: blog.title }] : undefined,
    type: "article",
    publishedTime: blog.date ? new Date(blog.date).toISOString() : undefined,
    authors: blog.author ? [blog.author] : ["Future Mind Educare"],
    tags: blog.tags,
  });
}

export default async function Layout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const blog = findBlog(id);

  if (!blog) return <>{children}</>;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: blog.title, url: `/blog/${blog.id}` },
          ]),
          blogPostingLd({
            title: blog.title,
            description: blog.description || blog.title,
            url: `${SITE_URL}/blog/${blog.id}`,
            image: blog.image,
            author: blog.author,
            datePublished: blog.date ? new Date(blog.date).toISOString() : undefined,
            tags: blog.tags,
            readTime: blog.readTime,
          }),
        ]}
      />
      {children}
    </>
  );
}
