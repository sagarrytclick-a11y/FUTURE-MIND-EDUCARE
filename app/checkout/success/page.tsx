"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const dbOrderId = searchParams.get("dbOrderId");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dbOrderId) {
      fetch(`/api/orders/${dbOrderId}`)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [dbOrderId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#94A3B8]"><FaSpinner className="animate-spin text-3xl" /></div>;

  return (
    <div className="min-h-screen bg-[#12141D] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#1E212B] rounded-2xl p-8 border border-[#2A2D3A] shadow-2xl text-center">
        {order?.status === 'SUCCESS' ? (
          <>
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-[#F8FAFC] mb-4">Payment Successful!</h1>
            <p className="text-[#94A3B8] mb-8">Thank you for your purchase. We have sent a receipt to your email.</p>
            
            <div className="bg-[#12141D] rounded-xl p-6 text-left border border-[#2A2D3A]">
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-[#94A3B8]">Customer:</span> <span className="text-[#F8FAFC] font-medium">{order.customerName}</span></div>
                <div className="flex justify-between"><span className="text-[#94A3B8]">Plan:</span> <span className="text-[#F8FAFC] font-medium">{order.planName}</span></div>
                <div className="flex justify-between"><span className="text-[#94A3B8]">Amount Paid:</span> <span className="text-[#F8FAFC] font-medium">₹{order.amountPaid.toLocaleString()}</span></div>
                <div className="flex justify-between pt-3 border-t border-[#2A2D3A]"><span className="text-[#94A3B8]">Transaction ID:</span> <span className="text-[#F8FAFC] font-mono text-sm">{order.razorpayPaymentId}</span></div>
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-3xl font-bold text-red-500">Order not found or payment failed.</h1>
        )}
      </div>
    </div>
  );
}
