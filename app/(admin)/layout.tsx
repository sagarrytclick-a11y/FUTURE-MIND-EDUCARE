import type { Metadata } from "next";
import { firaSans } from "../fonts";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Admin Panel - FUTURE MIND EDUCARE",
  description: "Admin panel for managing MBBS admission enquiries",
  viewport: "width=device-width, initial-scale=1",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${firaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-gray-50">
        {children}
      </body>
    </html>
  );
}
