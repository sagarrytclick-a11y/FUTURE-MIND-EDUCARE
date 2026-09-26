import type { Metadata } from "next";
import { BRAND, DEFAULT_OG_IMAGE, SITE_URL } from "./seo";

type BuildOpts = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  images?: { url: string; width?: number; height?: number; alt?: string }[];
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  images,
  type = "website",
  publishedTime,
  authors,
  tags,
  noindex,
}: BuildOpts): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const ogImages = (images?.length ? images : [DEFAULT_OG_IMAGE]).map((img) => ({
    url: img.url,
    width: img.width ?? 1200,
    height: img.height ?? 630,
    alt: img.alt ?? title,
  }));

  return {
    title,
    description,
    keywords: keywords?.length ? [...keywords] : undefined,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: BRAND.name,
      title,
      description,
      locale: "en_IN",
      images: ogImages,
      ...(type === "article"
        ? {
            publishedTime,
            authors,
            tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImages[0].url],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** "Rs. 52,00,000" / "₹ 45 L" -> 5200000 (null when not confidently numeric). */
function parseFeeToNumber(fees: string): number | null {
  const digits = fees.replace(/[lakh|crore|lakhs|crores]/gi, " ");
  // Treat "lakh"/"crore" multipliers before stripping the rest.
  const lakhs = /lakh/i.test(fees);
  const crores = /crore/i.test(fees);
  const numeric = Number(digits.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(numeric) || numeric === 0) return null;
  if (crores) return Math.round(numeric * 10000000);
  if (lakhs) return Math.round(numeric * 100000);
  return Math.round(numeric);
}

export function collegeLd({
  name,
  url,
  city,
  state,
  country,
  image,
  type,
  fees,
  seats,
  description,
}: {
  name: string;
  url: string;
  city?: string;
  state?: string;
  country?: string;
  image?: string;
  type?: string;
  fees?: string;
  seats?: number | string;
  description?: string;
}) {
  const feeNumber = fees ? parseFeeToNumber(fees) : null;

  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": `${url}#college`,
    name,
    url,
    ...(image ? { image: image.startsWith("http") ? image : `${SITE_URL}${image}` } : {}),
    ...(description ? { description } : {}),
    ...(type ? { additionalType: type } : {}),
    ...(feeNumber
      ? {
          offers: {
            "@type": "Offer",
            price: feeNumber,
            priceCurrency: "INR",
            category: "tuition",
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
    ...(seats ? { maximumAttendeeCapacity: Number(seats) || undefined } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      // For abroad colleges `state` holds the country name, so keep it out of
      // addressRegion when there is no separate region value.
      ...(state ? { addressRegion: state } : {}),
      addressCountry: country ?? "IN",
    },
  };
}

/** "5 min read" / "readTime: 7" -> "PT5M" (valid schema.org duration). */
function toIsoDuration(readTime: string): string | null {
  const value = Number(readTime.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(value) || value <= 0) return null;
  const hours = Math.floor(value / 60);
  const minutes = Math.round(value % 60);
  if (hours > 0) return `PT${hours}H${minutes ? `${minutes}M` : ""}`;
  return `PT${minutes}M`;
}

export function blogPostingLd({
  title,
  description,
  url,
  image,
  author,
  datePublished,
  tags,
  readTime,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  datePublished?: string;
  tags?: string[];
  readTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title.slice(0, 110),
    description: description.slice(0, 300),
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(image
      ? {
          image: {
            "@type": "ImageObject",
            url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
          },
        }
      : {}),
    ...(author ? { author: { "@type": "Person", name: author } } : {}),
    ...(author ? { publisher: { "@id": `${SITE_URL}/#organization` } } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(datePublished ? { dateModified: datePublished } : {}),
    ...(readTime ? { timeRequired: toIsoDuration(readTime) } : {}),
    ...(tags?.length ? { keywords: tags.join(", ") } : {}),
    inLanguage: "en-IN",
  };
}

export function itemListLd({
  name,
  items,
}: {
  name: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function serviceLd({
  name,
  description,
  path,
  areaServed,
}: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name,
    description,
    serviceType: name,
    url: `${SITE_URL}${path}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: (areaServed ?? ["India"]).map((a) => ({ "@type": "Country", name: a })),
    audience: { "@type": "Audience", audienceType: "Students seeking medical admission" },
  };
}
