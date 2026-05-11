import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { PopupProvider } from "@/contexts/PopupContext";
import LayoutWrapper from "@/components/LayoutWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FUTURE MIND EDUCARE - MBBS Admission Consultants",
  description: "Leading educational consultancy for MBBS admissions in India and abroad. Expert guidance for medical education at Andheri East, Mumbai.",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
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
