import type { MetadataRoute } from "next";
import { readFileSync } from "fs";
import path from "path";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://fmeducation.in";

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/states`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/colleges/mbbs-india`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/colleges/mbbs-abroad`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },

  ];

  const collegeUrls: MetadataRoute.Sitemap = [];
  const stateUrls: MetadataRoute.Sitemap = [];
  const countryUrls: MetadataRoute.Sitemap = [];

  try {
    const indiaData = JSON.parse(
      readFileSync(path.join(process.cwd(), "public/mbbs-india.json"), "utf-8")
    );
    for (const state of indiaData.states) {
      stateUrls.push({
        url: `${siteUrl}/states/${slugify(state.name)}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
      for (const college of state.colleges) {
        collegeUrls.push({
          url: `${siteUrl}/colleges/${slugify(college.name)}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  } catch {}

  try {
    const abroadData = JSON.parse(
      readFileSync(path.join(process.cwd(), "public/mbbs-abroad.json"), "utf-8")
    );
    for (const country of abroadData.countries) {
      countryUrls.push({
        url: `${siteUrl}/country/${slugify(country.name)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
      for (const college of country.colleges || []) {
        collegeUrls.push({
          url: `${siteUrl}/colleges/${slugify(college.name)}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  } catch {}

  try {
    const mdmsData = JSON.parse(
      readFileSync(path.join(process.cwd(), "public/md-ms.json"), "utf-8")
    );
    for (const state of mdmsData.states) {
      stateUrls.push({
        url: `${siteUrl}/colleges/md-ms/${state.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
      for (const college of state.colleges) {
        collegeUrls.push({
          url: `${siteUrl}/colleges/${slugify(college.name)}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  } catch {}

  const blogUrls: MetadataRoute.Sitemap = [];
  try {
    const blogData = JSON.parse(
      readFileSync(path.join(process.cwd(), "public/blogs.json"), "utf-8")
    );
    for (const blog of blogData.blogs) {
      blogUrls.push({
        url: `${siteUrl}/blog/${blog.id}`,
        lastModified: new Date(blog.date || Date.now()),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch {}

  return [
    ...staticPages,
    ...stateUrls,
    ...countryUrls,
    ...collegeUrls,
    ...blogUrls,
  ];
}
