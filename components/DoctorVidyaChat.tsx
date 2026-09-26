"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCommentDots,
  FaHeartbeat,
  FaPaperPlane,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "Namaste! I'm Doctor Vidya, your MBBS admission counsellor. Apne NEET marks, budget ya preferred state bataiye — main right colleges suggest karungi, India ya abroad dono ke liye.",
};

const QUICK_PROMPTS = [
  "450 marks pe kaunsa college?",
  "MBBS abroad ka budget?",
  "NEET 2026 cutoff kya hai?",
  "MD/MS ke options?",
];

const DoctorVidyaChat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Lock page scroll + Escape-to-close while the chat is open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Keep the newest message in view.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, loading, open]);

  const send = async (preset?: string) => {
    const content = (preset ?? input).trim();
    if (!content || loading) return;

    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/doctor-vidya", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-12) }),
      });

      const data: { reply?: string; error?: string } = await response.json();
      const reply = data.reply;

      if (!response.ok || !reply) {
        throw new Error(data.error || "No reply");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't reach my brain right now. Please try again in a moment, or call us on 9920798988.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const showPrompts = messages.length === 1;

  /** wipe the whole conversation back to the opening greeting */
  const clearChat = () => {
    setMessages([GREETING]);
    setInput("");
  };

  return (
    <>
      {/* TRIGGER — normal round chat bubble, bottom-right */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Chat with Doctor Vidya"
          className="group fixed bottom-14 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-teal-700 text-white shadow-lg ring-1 ring-teal-600 transition-all hover:scale-105 hover:bg-teal-800 sm:right-5"
        >
          <FaCommentDots className="text-xl" />

          {/* online dot */}
          <span className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-teal-700 bg-emerald-400" />

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-2.5 py-1.5 bg-brand-950 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            Ask Doctor Vidya
            <div className="absolute top-full right-4 -mt-1 w-2 h-2 bg-brand-950 transform rotate-45" />
          </div>
        </button>
      )}

      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[99] bg-black/45 backdrop-blur-[2px]"
            />

            {/* PANEL: full-screen overlay on phones, right drawer on desktop */}
            <motion.div
              key="panel"
              role="dialog"
              aria-label="Doctor Vidya chat"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 32 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="fixed inset-0 z-[100] flex flex-col bg-white shadow-2xl lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[400px] lg:border-l lg:border-slate-200"
            >
              {/* HEADER */}
              <div className="flex items-center gap-3 bg-brand-950 px-4 py-3.5">
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-400 text-brand-950">
                  <FaHeartbeat />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-brand-950 bg-emerald-400" />
                </span>

                <div className="min-w-0 flex-1 leading-tight">
                  <p className="text-sm font-extrabold text-white">Doctor Vidya</p>
                  <p className="text-[11px] text-accent-400">
                    MBBS Admission Counsellor · Online
                  </p>
                </div>

                <button
                  onClick={clearChat}
                  disabled={messages.length <= 1}
                  aria-label="Clear chat messages"
                  title="Clear chat"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <FaTrashAlt className="text-xs" />
                </button>

                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>

              {/* MESSAGES */}
              <div
                ref={listRef}
                className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4"
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        message.role === "user"
                          ? "rounded-br-sm bg-brand-950 text-white"
                          : "rounded-bl-sm border border-slate-200 bg-white text-gray-800 shadow-sm"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                          style={{ animationDelay: `${dot * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {showPrompts && !loading && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => send(prompt)}
                        className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-brand-950 transition-colors hover:border-brand-950 hover:bg-brand-950 hover:text-white"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* INPUT */}
              <div className="border-t border-slate-200 bg-white p-3">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        void send();
                      }
                    }}
                    placeholder="Ask anything about MBBS..."
                    className="max-h-28 min-h-[42px] flex-1 resize-none rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-brand-950 outline-none transition-colors placeholder:text-gray-400 focus:border-brand-800 focus:bg-white"
                  />
                  <button
                    onClick={() => void send()}
                    disabled={loading || !input.trim()}
                    aria-label="Send message"
                    className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-accent-400 text-brand-950 transition-all hover:bg-accent-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FaPaperPlane className="text-xs" />
                  </button>
                </div>

                <p className="mt-1.5 text-center text-[10px] leading-relaxed text-gray-400">
                  AI counsellor — final fees, seats and cutoffs our team confirm
                  karegi.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DoctorVidyaChat;
