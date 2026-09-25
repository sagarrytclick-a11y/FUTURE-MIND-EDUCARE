"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSpinner } from "react-icons/fa";

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
            color: "#2563EB",
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

  const labelClass = "block text-xs font-semibold text-gray-700 mb-1.5";
  const inputClass =
    "w-full h-11 px-4 text-sm bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-800 focus:border-transparent transition-colors";

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
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-5">
              <button
                onClick={handleClose}
                disabled={loading}
                aria-label="Close checkout"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-50"
              >
                <FaTimes className="text-sm" />
              </button>

              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Complete Your Purchase</h3>
              <p className="text-sm text-gray-600 mb-5">{planName} — ₹{planPrice.toLocaleString()}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter your mobile number"
                    className={inputClass}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center h-11 px-6 rounded-xl bg-brand-950 hover:bg-brand-900 disabled:opacity-60 text-white text-sm font-semibold transition-colors gap-2"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin text-sm" />
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${planPrice.toLocaleString()}`
                  )}
                </button>

                <p className="text-xs text-center text-gray-500">
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
