import type { Metadata } from "next";
import { breadcrumbLd, buildMetadata, JsonLd } from "@/app/config/seo-utils";
import { BRAND, SITE_URL } from "@/app/config/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us - MBBS Admission Help | Future Mind Educare",
  description:
    "Talk to Future Mind Educare for MBBS admission and NEET counselling. Call +91 99207 98988 or visit our Andheri East, Mumbai office. Mon-Sat 10 AM - 8 PM.",
  path: "/contact",
  keywords: [
    "contact future mind educare",
    "mbbs admission counselling mumbai",
    "neet helpdesk",
  ],
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", url: "/" },
            { name: "Contact", url: "/contact" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": `${SITE_URL}/contact#contactpage`,
            url: `${SITE_URL}/contact`,
            name: "Contact Future Mind Educare",
            description:
              "Contact our MBBS admission and NEET counselling team in Andheri East, Mumbai.",
            mainEntity: {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: BRAND.name,
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
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: BRAND.phone,
                  contactType: "admissions",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi", "Marathi"],
                },
              ],
            },
          },
        ]}
      />
      {children}
    </>
  );
}
