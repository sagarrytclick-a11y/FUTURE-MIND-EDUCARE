import type { Metadata } from "next";
import { breadcrumbLd, buildMetadata, itemListLd, JsonLd } from "@/app/config/seo-utils";
import { getBlogs } from "@/lib/seo-data";

export const metadata: Metadata = buildMetadata({
  title: "MBBS & NEET Blog",
  description:
    "Latest NEET preparation, MBBS admission and medical college news, guides, fee breakdowns and career advice from Future Mind Educare experts.",
  path: "/blog",
  keywords: ["neet blog", "mbbs admission news", "medical education blog"],
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const blogs = getBlogs();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
          ]),
          itemListLd({
            name: "Future Mind Educare blog articles",
            items: blogs.map((blog) => ({
              name: blog.title,
              url: `/blog/${blog.id}`,
            })),
          }),
        ]}
      />
      {children}
    </>
  );
}
