import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/config/seo";

// Route groups like /_next and /(admin) are not part of the public URL, and
// blocking every `?query` URL would also hide UTM-tagged pages from crawlers.
const PRIVATE_PATHS = ["/admin", "/api", "/checkout"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: ["Mediapartners-Google", "AdsBot-Google"],
        allow: "/",
        disallow: ["/admin", "/api", "/checkout"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
