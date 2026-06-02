import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { PopupProvider } from "@/contexts/PopupContext";
import LayoutWrapper from "@/components/LayoutWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const siteUrl = "https://fmeducation.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FUTURE MIND EDUCARE - MBBS Admission Consultants in Mumbai",
    template: "%s | FUTURE MIND EDUCARE",
  },
  description:
    "Leading educational consultancy for MBBS admissions in India and abroad. Expert NEET guidance, top medical college counselling at Andheri East, Mumbai.",
  keywords: [
    "MBBS admission consultants",
    "medical education Mumbai",
    "NEET counselling",
    "MBBS in India",
    "MBBS abroad",
    "medical college admission",
    "Future Mind Educare",
  ],
  authors: [{ name: "Future Mind Educare" }],
  creator: "Future Mind Educare",
  publisher: "Future Mind Educare",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "FUTURE MIND EDUCARE",
    title: "FUTURE MIND EDUCARE - MBBS Admission Consultants",
    description:
      "Leading educational consultancy for MBBS admissions in India and abroad. Expert guidance for medical education at Andheri East, Mumbai.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Future Mind Educare Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FUTURE MIND EDUCARE - MBBS Admission Consultants",
    description:
      "Leading educational consultancy for MBBS admissions in India and abroad.",
    images: ["/logo.png"],
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
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Future Mind Educare",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Leading educational consultancy for MBBS admissions in India and abroad.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "B WING-107, Rustomjee Central Park, Near Western Express Highway Metro Station, Opp Kanakia Wall Street",
      addressLocality: "Andheri East",
      addressRegion: "Mumbai",
      postalCode: "400069",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9920798988",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      siteUrl,
    ],
  };

  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://i.pinimg.com" />
        <link rel="preconnect" href="https://theeducationabroad.com" />
        <link rel="dns-prefetch" href="https://i.pinimg.com" />
        <link rel="dns-prefetch" href="https://theeducationabroad.com" />
        <link rel="dns-prefetch" href="https://ruseducation.in" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <PopupProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </PopupProvider>
      </body>
    </html>
  );
}
