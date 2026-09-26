import { readFileSync, statSync } from "fs";
import path from "path";

export type CollegeData = {
  id?: string | number;
  name: string;
  city?: string;
  fees?: string;
  seats?: number | string;
  recognition?: string;
  ranking?: string;
  type?: string;
  image?: string;
  duration?: string;
  medium?: string;
};

export type IndiaState = {
  id?: string | number;
  name: string;
  slug?: string;
  colleges: CollegeData[];
  image?: string;
  description?: string;
};

export type AbroadCountry = {
  id?: string | number;
  name: string;
  flag?: string;
  image?: string;
  description?: string;
  colleges: CollegeData[];
};

export type BlogItem = {
  id: number | string;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime?: string;
  tags?: string[];
  content?: string;
};

export function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function readJson<T>(file: string): T | null {
  try {
    return JSON.parse(
      readFileSync(path.join(process.cwd(), "public", file), "utf-8")
    ) as T;
  } catch {
    return null;
  }
}

const DATA_FILES = [
  "mbbs-india.json",
  "mbbs-abroad.json",
  "md-ms.json",
  "blogs.json",
];

/**
 * Newest mtime across the content JSON files. Used as the sitemap
 * `lastModified` so the value stays stable for a deploy instead of changing on
 * every request.
 */
export function getContentLastModified(): Date {
  let newest = 0;

  for (const file of DATA_FILES) {
    try {
      const { mtimeMs } = statSync(
        path.join(process.cwd(), "public", file)
      );
      if (mtimeMs > newest) newest = mtimeMs;
    } catch {
      // Missing content file simply does not contribute a timestamp.
    }
  }

  return newest ? new Date(newest) : new Date(0);
}

export function getIndiaData() {
  return readJson<{ states: IndiaState[] }>("mbbs-india.json");
}

export function getAbroadData() {
  return readJson<{ countries: AbroadCountry[] }>("mbbs-abroad.json");
}

export function getMdmsData() {
  return readJson<{ states: IndiaState[] }>("md-ms.json");
}

export function getBlogs() {
  return readJson<{ blogs: BlogItem[] }>("blogs.json")?.blogs ?? [];
}

export function findIndiaCollege(slug: string) {
  const data = getIndiaData();
  if (!data) return null;
  for (const state of data.states) {
    const college = state.colleges.find((c) => slugify(c.name) === slug);
    if (college) return { college, state, kind: "india" as const };
  }
  return null;
}

export function findAbroadCollege(slug: string) {
  const data = getAbroadData();
  if (!data) return null;
  for (const country of data.countries) {
    const college = (country.colleges || []).find((c) => slugify(c.name) === slug);
    if (college) return { college, country, kind: "abroad" as const };
  }
  return null;
}

export function findMdmsCollege(slug: string) {
  const data = getMdmsData();
  if (!data) return null;
  for (const state of data.states) {
    const college = (state.colleges || []).find(
      (c) => slugify(c.name) === slug
    );
    if (college) return { college, state, kind: "mdms" as const };
  }
  return null;
}

export function findCollege(slug: string) {
  return (
    findIndiaCollege(slug) ??
    findAbroadCollege(slug) ??
    findMdmsCollege(slug)
  );
}

export function findState(slug: string) {
  const india = getIndiaData();
  const mdms = getMdmsData();
  if (india) {
    for (const state of india.states) {
      if (slugify(state.name) === slug) return { state, kind: "india" as const };
    }
  }
  if (mdms) {
    for (const state of mdms.states) {
      if (state.slug === slug || slugify(state.name) === slug) {
        return { state, kind: "mdms" as const };
      }
    }
  }
  return null;
}

export function findCountry(slug: string) {
  const data = getAbroadData();
  if (!data) return null;
  return data.countries.find((c) => slugify(c.name) === slug) ?? null;
}

export function findBlog(id: string) {
  return getBlogs().find((b) => String(b.id) === id) ?? null;
}
