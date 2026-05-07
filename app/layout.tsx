import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PopupProvider } from "@/contexts/PopupContext";
import ContactPopup from "@/components/ContactPopup";
import FloatingButton from "@/components/FloatingButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import FixedBottomCarousel from "@/components/FixedBottomCarousel";

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
          <Header />
          {children}
          <Footer />
          <ContactPopup />
          <FixedBottomCarousel />
          <FloatingButton />
          <WhatsAppButton />
        </PopupProvider>
      </body>
    </html>
  );
}
