"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { SkeletonDetail } from "@/components/Skeleton";

type OrderDetails = {
  status: string;
  customerName: string;
  planName: string;
  amountPaid: number;
  razorpayPaymentId: string;
};

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const dbOrderId = searchParams.get("dbOrderId");
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(Boolean(dbOrderId));

  useEffect(() => {
    if (!dbOrderId) return;

    let cancelled = false;

    fetch(`/api/orders/${dbOrderId}`)
      .then((res) => res.json())
      .then((data: OrderDetails) => {
        if (!cancelled) setOrder(data);
      })
      .catch(() => {
        /* order stays null and the page renders the fallback state */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [dbOrderId]);

  if (loading) return <SkeletonDetail />;

  return (
    <>
      <PageHero
        align="center"
        variant="light"
        eyebrow="Checkout"
        title="Payment"
        highlight="Status"
        description="View your order confirmation and receipt details below."
        crumbs={[{ label: "Home", href: "/" }, { label: "Checkout" }, { label: "Success" }]}
      />
      <Section spacing="md">
        {/* Compact receipt card with blue accents */}
        <div className="max-w-lg mx-auto bg-white rounded-2xl p-5 border border-slate-200 text-center">
          {order?.status === 'SUCCESS' ? (
            <>
              <FaCheckCircle className="text-brand-950 text-3xl mx-auto mb-3" />
              <p className="bg-accent-100 text-accent-600 text-[11px] font-bold uppercase rounded-full px-2.5 py-1 inline-block mb-2">Payment Confirmed</p>
              <h2 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg mb-1">Payment Successful!</h2>
              <p className="text-sm text-gray-600 mb-5">Thank you for your purchase. We have sent a receipt to your email.</p>

              <div className="bg-slate-50 rounded-2xl p-5 text-left border border-slate-200">
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-600">Customer:</span>
                    <span className="text-brand-950 font-extrabold tracking-tight text-right">{order.customerName}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-600">Plan:</span>
                    <span className="text-brand-950 font-extrabold tracking-tight text-right">{order.planName}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="text-brand-950 font-extrabold tracking-tight">₹{order.amountPaid.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between gap-3 pt-2.5 border-t border-slate-200">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="text-brand-950 font-mono text-xs break-all text-right">{order.razorpayPaymentId}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/"
                className="mt-5 inline-flex items-center justify-center gap-2 h-11 px-6 bg-brand-950 hover:bg-brand-900 text-white rounded-full text-sm font-bold transition-colors"
              >
                <FaArrowLeft className="text-xs" /> Back to Home
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-brand-950 font-extrabold tracking-tight text-base mb-2">Order not found or payment failed.</h2>
              <p className="text-sm text-gray-600 mb-5">Please contact support if the amount was deducted.</p>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-brand-950 hover:bg-brand-900 text-white rounded-full text-sm font-bold transition-colors"
              >
                <FaArrowLeft className="text-xs" /> Back to Home
              </Link>
            </>
          )}
        </div>
      </Section>
    </>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Suspense fallback={<SkeletonDetail />}>
        <SuccessPageContent />
      </Suspense>
    </div>
  );
}
