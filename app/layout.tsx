import type { Metadata, Viewport } from "next";
import { firaSans } from "./fonts";
import "./globals.css";
import { PopupProvider } from "@/contexts/PopupContext";
import LayoutWrapper from "@/components/LayoutWrapper";
import {
  BRAND,
  DEFAULT_OG_IMAGE,
  ICONS,
  KEYWORDS,
  SITE_URL,
} from "@/app/config/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MBBS Admission Consultants in Mumbai | Future Mind Educare",
    template: "%s | Future Mind Educare",
  },
  description:
    "Future Mind Educare is a leading MBBS admission consultancy in Andheri East, Mumbai. Expert NEET UG counselling, India & abroad MBBS admissions, MD/MS guidance and 5000+ students counselled with 15+ years of experience.",
  keywords: [...KEYWORDS],
  authors: [{ name: BRAND.shortName }],
  creator: BRAND.shortName,
  publisher: BRAND.shortName,
  applicationName: BRAND.name,
  category: "education",
  icons: {
    icon: [
      { url: ICONS.icon, type: "image/png", sizes: "96x96" },
      { url: ICONS.shortcut, type: "image/png", sizes: "192x192" },
      { url: ICONS.androidLarge, type: "image/png", sizes: "512x512" },
    ],
    apple: ICONS.apple,
    shortcut: ICONS.shortcut,
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: BRAND.name,
    title: "MBBS Admission Consultants in Mumbai | Future Mind Educare",
    description:
      "Expert MBBS admission guidance, NEET counselling and India/abroad medical college admissions from Andheri East, Mumbai.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBBS Admission Consultants in Mumbai | Future Mind Educare",
    description:
      "Expert MBBS admission guidance, NEET counselling and India/abroad medical college admissions.",
    images: [DEFAULT_OG_IMAGE.url],
    creator: "@futuremindeducare",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  alternates: {
    canonical: SITE_URL,
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1b4b" },
  ],
  colorScheme: "light",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "EducationalOrganization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: BRAND.name,
      legalName: BRAND.legalName,
      url: SITE_URL,
      logo: `${SITE_URL}${BRAND.logo}`,
      image: `${SITE_URL}${BRAND.logo}`,
      description:
        "MBBS admission consultancy helping students secure seats in government and private medical colleges in India and abroad.",
      slogan: BRAND.tagline,
      telephone: BRAND.phone,
      email: BRAND.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: BRAND.address.street,
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        postalCode: BRAND.address.postalCode,
        addressCountry: BRAND.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: BRAND.geo.latitude,
        longitude: BRAND.geo.longitude,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:00",
          closes: "20:00",
        },
      ],
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Place", name: "Asia" },
        { "@type": "Place", name: "Middle East" },
        { "@type": "Place", name: "Europe" },
        { "@type": "Place", name: "Central Asia" },
        { "@type": "Place", name: "Russia" },
      ],
      // `sameAs` profiles must be real, owned pages - verify before launch.
      sameAs: [...BRAND.sameAs],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BRAND.name,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${firaSans.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://i.pinimg.com" />
        <link rel="preconnect" href="https://theeducationabroad.com" />
        <link rel="dns-prefetch" href="https://i.pinimg.com" />
        <link rel="dns-prefetch" href="https://theeducationabroad.com" />
        <link rel="dns-prefetch" href="https://ruseducation.in" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <PopupProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </PopupProvider>
      </body>
    </html>
  );
}
