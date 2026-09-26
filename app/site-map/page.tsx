import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SiteMapDirectory from "@/components/SiteMapDirectory";
import { breadcrumbLd, buildMetadata, JsonLd } from "@/app/config/seo-utils";
import { SITE_URL } from "@/app/config/seo";
import sitemap from "@/app/sitemap";
import {
  findBlog,
  findCollege,
  findCountry,
  findState,
  getMdmsData,
} from "@/lib/seo-data";

export const metadata: Metadata = buildMetadata({
  title: "Website Sitemap | Future Mind Educare",
  description:
    "Browse all Future Mind Educare pages, MBBS college listings, country and state guides, and admission resources.",
  path: "/site-map",
  keywords: ["Future Mind Educare sitemap", "MBBS college pages", "admission guides"],
});

const STATIC_LABELS: Record<string, { label: string; category: string }> = {
  "/": { label: "Home", category: "Main Pages" },
  "/about": { label: "About Us", category: "Main Pages" },
  "/contact": { label: "Contact", category: "Main Pages" },
  "/blog": { label: "Blog and Admission Guides", category: "Resources" },
  "/colleges/mbbs-india": { label: "MBBS Colleges in India", category: "MBBS in India" },
  "/colleges/mbbs-abroad": { label: "MBBS Colleges Abroad", category: "MBBS Abroad" },
  "/colleges/md-ms": { label: "MD/MS Colleges", category: "Postgraduate Medical" },
  "/mbbs-abroad": { label: "Study MBBS Abroad", category: "MBBS Abroad" },
  "/study-abroad": { label: "Study Abroad Guidance", category: "MBBS Abroad" },
  "/neet-predictor": { label: "NEET Score Predictor", category: "Resources" },
  "/neet-ug-packages": { label: "NEET UG Packages", category: "Resources" },
  "/states": { label: "MBBS Colleges by State", category: "MBBS in India" },
  "/site-map": { label: "Website Sitemap", category: "Main Pages" },
  "/privacy": { label: "Privacy Policy", category: "Policies" },
  "/terms": { label: "Terms and Conditions", category: "Policies" },
};

function describePath(path: string) {
  const fixed = STATIC_LABELS[path];
  if (fixed) return fixed;

  const [, section, slug] = path.split("/");

  if (section === "blog" && slug) {
    const blog = findBlog(slug);
    return {
      label: blog?.title ?? `Blog article ${slug}`,
      category: "Resources",
    };
  }

  if (section === "country" && slug) {
    const country = findCountry(slug);
    return {
      label: country ? `MBBS in ${country.name}` : `MBBS in ${slug}`,
      category: "MBBS Abroad",
    };
  }

  if (section === "states" && slug) {
    const found = findState(slug);
    return {
      label: found ? `Medical Colleges in ${found.state.name}` : `Colleges in ${slug}`,
      category: found?.kind === "mdms" ? "Postgraduate Medical" : "MBBS in India",
    };
  }

  if (section === "colleges" && slug === "md-ms") {
    const stateSlug = path.split("/")[3];
    const state = getMdmsData()?.states.find((item) => item.slug === stateSlug);
    return {
      label: state ? `MD/MS Colleges in ${state.name}` : `MD/MS Colleges in ${stateSlug}`,
      category: "Postgraduate Medical",
    };
  }

  if (section === "colleges" && slug) {
    const college = findCollege(slug);
    return {
      label: college ? `${college.college.name} - ${college.kind === "abroad" ? college.country.name : college.state.name}` : slug,
      category:
        college?.kind === "abroad"
          ? "MBBS Abroad"
          : college?.kind === "mdms"
            ? "Postgraduate Medical"
            : "MBBS in India",
    };
  }

  return {
    label: path.split("/").filter(Boolean).at(-1)?.replace(/-/g, " ") ?? path,
    category: "Other Pages",
  };
}

export default function SiteMapPage() {
  const entries = sitemap().map(({ url }) => {
    const path = new URL(url, SITE_URL).pathname;
    return { href: path, ...describePath(path) };
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        align="left"
        variant="light"
        eyebrow="FUTURE MIND EDUCARE"
        title="Explore Our"
        highlight="Website"
        description="Find our admission guidance, college listings, country and state pages, and useful student resources."
        crumbs={[{ label: "Home", href: "/" }, { label: "Sitemap" }]}
      />
      <Section spacing="md">
        <JsonLd
          data={breadcrumbLd([
            { name: "Home", url: "/" },
            { name: "Sitemap", url: "/site-map" },
          ])}
        />
        <SiteMapDirectory entries={entries} />
      </Section>
    </div>
  );
}