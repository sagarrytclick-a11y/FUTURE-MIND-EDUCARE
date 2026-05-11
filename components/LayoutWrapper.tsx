"use client";
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ContactPopup from './ContactPopup';
import FloatingButton from './FloatingButton';
import WhatsAppButton from './WhatsAppButton';
import FixedBottomCarousel from './FixedBottomCarousel';

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

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
    </>
  );
}
