import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/config/seo";
import {
  getAbroadData,
  getBlogs,
  getContentLastModified,
  getIndiaData,
  getMdmsData,
  slugify,
} from "@/lib/seo-data";

// Stable per deploy: derived from the content JSON mtimes, not `new Date()`, so
// regenerating the sitemap does not signal a change to crawlers.
const lastModified = getContentLastModified();

function safeDate(value: string | undefined, fallback: Date): Date {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/colleges/mbbs-india`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/colleges/mbbs-abroad`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/colleges/md-ms`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/mbbs-abroad`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/study-abroad`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/neet-predictor`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/neet-ug-packages`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/states`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/site-map`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/blog`, lastModified, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  const collegeUrls: MetadataRoute.Sitemap = [];
  const stateUrls: MetadataRoute.Sitemap = [];
  const countryUrls: MetadataRoute.Sitemap = [];

  const indiaData = getIndiaData();
  if (indiaData) {
    for (const state of indiaData.states) {
      stateUrls.push({
        url: `${SITE_URL}/states/${slugify(state.name)}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
      });
      for (const college of state.colleges) {
        collegeUrls.push({
          url: `${SITE_URL}/colleges/${slugify(college.name)}`,
          lastModified,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  const abroadData = getAbroadData();
  if (abroadData) {
    for (const country of abroadData.countries) {
      countryUrls.push({
        url: `${SITE_URL}/country/${slugify(country.name)}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
      });
      for (const college of country.colleges || []) {
        collegeUrls.push({
          url: `${SITE_URL}/colleges/${slugify(college.name)}`,
          lastModified,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  const mdmsData = getMdmsData();
  if (mdmsData) {
    for (const state of mdmsData.states) {
      stateUrls.push({
        url: `${SITE_URL}/colleges/md-ms/${state.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
      for (const college of state.colleges) {
        collegeUrls.push({
          url: `${SITE_URL}/colleges/${slugify(college.name)}`,
          lastModified,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  const blogUrls: MetadataRoute.Sitemap = getBlogs().map((blog) => ({
    url: `${SITE_URL}/blog/${blog.id}`,
    lastModified: safeDate(blog.date, lastModified),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const seen = new Set<string>();
  const dedupe = (entries: MetadataRoute.Sitemap) =>
    entries.filter((entry) => {
      if (seen.has(entry.url)) return false;
      seen.add(entry.url);
      return true;
    });

  return dedupe([
    ...staticPages,
    ...stateUrls,
    ...countryUrls,
    ...collegeUrls,
    ...blogUrls,
  ]);
}
