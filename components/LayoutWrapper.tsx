"use client";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingButton from "./FloatingButton";
import WhatsAppButton from "./WhatsAppButton";

// Below-the-fold / interaction-only widgets are code-split so they stay out of
// the initial JS payload of every page.
const ContactPopup = dynamic(() => import("./ContactPopup"), { ssr: false });
const FixedBottomCarousel = dynamic(() => import("./FixedBottomCarousel"), {
  ssr: false,
});
const DoctorVidyaChat = dynamic(() => import("./DoctorVidyaChat"), {
  ssr: false,
});

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <ContactPopup />
      <FixedBottomCarousel />
      <FloatingButton />
      <WhatsAppButton />
      <DoctorVidyaChat />
    </>
  );
}
