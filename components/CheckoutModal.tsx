"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSpinner, FaCheckCircle } from "react-icons/fa";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
  planName: string;
  planPrice: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutModal = ({ isOpen, onClose, planId, planName, planPrice }: CheckoutModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile, planId }),
      });

      const checkoutData = await checkoutRes.json();

      if (!checkoutRes.ok) {
        throw new Error(checkoutData.error || "Failed to initiate payment");
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const options = {
          key: checkoutData.key,
          amount: checkoutData.amount,
          currency: checkoutData.currency,
          name: "Future Mind Educare",
          description: planName,
          order_id: checkoutData.orderId,
          prefill: {
            name,
            email,
            contact: mobile,
          },
          theme: {
            color: "#12141D",
          },
          handler: async function (response: any) {
            try {
              const verifyRes = await fetch("/api/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              const verifyData = await verifyRes.json();

              if (verifyRes.ok) {
                window.location.href = `/checkout/success?dbOrderId=${verifyData.dbOrderId}`;
              } else {
                setError(verifyData.error || "Payment verification failed");
              }
            } catch {
              setError("Payment verification failed");
            } finally {
              setLoading(false);
            }
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function () {
          setError("Payment failed. Please try again.");
          setLoading(false);
        });
        rzp.open();
      };

      document.body.appendChild(script);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setMobile("");
    setError("");
    setLoading(false);
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => { if (!loading) handleClose(); }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#1E212B] border border-[#2A2D3A] rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6">
              <button
                onClick={handleClose}
                disabled={loading}
                className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors disabled:opacity-50"
              >
                <FaTimes />
              </button>

              <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">Complete Your Purchase</h3>
              <p className="text-[#94A3B8] text-sm mb-6">{planName} — ₹{planPrice.toLocaleString()}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-[#12141D] border border-[#2A2D3A] rounded-lg text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-[#12141D] border border-[#2A2D3A] rounded-lg text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter your mobile number"
                    className="w-full px-4 py-3 bg-[#12141D] border border-[#2A2D3A] rounded-lg text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-colors"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#4A90E2] hover:bg-[#3A7BD5] disabled:opacity-60 text-white font-semibold transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${planPrice.toLocaleString()}`
                  )}
                </button>

                <p className="text-xs text-center text-[#64748B]">
                  Secure payment powered by Razorpay
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CheckoutModal;
