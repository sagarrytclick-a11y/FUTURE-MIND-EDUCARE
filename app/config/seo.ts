/**
 * Canonical production origin. Keep this as the ONLY place the domain is
 * declared - email templates, sitemap, robots and canonicals all derive from it
 * so they can never drift apart.
 */
export const SITE_URL = "https://futuremindedu.in";

export const BRAND = {
  name: "FUTURE MIND EDUCARE",
  shortName: "Future Mind Educare",
  legalName: "Future Mind Educare",
  tagline: "Your Gateway to Medical Education Excellence",
  logo: "/logo.png",
  ogImage: "/og-image.jpg",
  email: "edufuturemind@gmail.com",
  phone: "+91-9920798988",
  address: {
    street: "B WING-107, Rustomjee Central Park",
    detail: "Near Western Express Highway Metro Station, Opp Kanakia Wall Street",
    city: "Andheri East, Mumbai",
    postalCode: "400069",
    country: "IN",
  },
  geo: {
    latitude: 19.1197,
    longitude: 72.8464,
  },
  hours: "Mo-Sa 10:00-20:00",
  sameAs: [
    "https://www.instagram.com/futuremindeducare",
    "https://www.facebook.com/futuremindeducare",
    "https://www.youtube.com/@futuremindeducare",
    "https://www.linkedin.com/company/future-mind-educare",
  ],
} as const;

export const DEFAULT_OG_IMAGE = {
  url: BRAND.ogImage,
  width: 1200,
  height: 630,
  alt: "Future Mind Educare - MBBS Admission Consultants in Mumbai",
};

export const ICONS = {
  icon: "/icon-96.png",
  apple: "/apple-touch-icon.png",
  shortcut: "/icon-192.png",
  android: "/icon-192.png",
  androidLarge: "/icon-512.png",
  maskable: "/icon-maskable-512.png",
} as const;

export const KEYWORDS = [
  "MBBS admission consultants",
  "MBBS admission 2026",
  "medical education Mumbai",
  "NEET counselling",
  "NEET UG counselling",
  "MBBS in India",
  "MBBS abroad",
  "medical college admission",
  "MBBS admission India",
  "Future Mind Educare",
  "Andheri East education consultant",
  "NEET score predictor",
  "medical college fees",
];
