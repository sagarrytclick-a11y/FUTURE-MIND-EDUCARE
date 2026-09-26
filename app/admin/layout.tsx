import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - FUTURE MIND EDUCARE",
  description: "Admin panel for managing MBBS admission enquiries",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
