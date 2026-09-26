import type { Metadata } from "next";
import { buildMetadata } from "@/app/config/seo-utils";

export const metadata: Metadata = buildMetadata({
  title: "Payment Successful",
  description:
    "Your payment has been received. Download your counselling details and next steps.",
  path: "/checkout/success",
  noindex: true,
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
