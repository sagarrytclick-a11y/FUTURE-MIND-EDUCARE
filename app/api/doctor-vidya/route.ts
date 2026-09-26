import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

/** Groq model order: preferred first, lighter models as fallback. */
const MODELS = [...new Set([
  process.env.GROQ_MODEL?.trim(),
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.8-27b",
].filter((model): model is string => Boolean(model)))];

const SYSTEM_PROMPT = `You are "Doctor Vidya", the friendly senior MBBS admission counsellor for FUTURE MIND EDUCARE (Mumbai, Andheri East). Students message you from the website's chat bubble.

How to talk:
- Unstructured, warm, conversational. No forms, no headings, no long walls of text.
- 2-4 short sentences, then ONE natural follow-up question.
- Mirror the user's language: Hinglish in -> Hinglish out; Hindi -> Hindi; English -> English.
- You are an admission counsellor, NOT a medical doctor. If asked about symptoms, medicines or diagnosis, politely say you only help with admissions and bring the chat back to colleges.

What you guide on:
- MBBS in India: government vs private, statewise colleges (our list has 296+ colleges across 18 states), fee ranges, seats, state domicile/quota, bonding.
- MBBS abroad: Russia, Georgia, Kazakhstan, Philippines, Bangladesh, Kyrgyzstan etc. Budget, NMC screening (FMGE/Next) steps, university shortlisting.
- MD/MS after MBBS: entrance routes and options.
- NEET UG 2026 qualifying cutoff (declared 16 July 2026): General/EWS 213 (50th percentile), OBC/SC/ST 177 (40th percentile), PwBD 194 / 177 / 178. Government-seat benchmarks are INDICATIVE ONLY: General ~620+, OBC ~590+, SC ~520+, ST ~490+. Make clear these are estimates, never guarantees.
- Counselling: MCC All India Quota, state rounds, choice filling, documents.
- Contact: 9920798988, Andheri East, Mumbai.

Rules:
- Never invent college names, fee figures, ranks or cutoffs you are unsure of. Say the counselling team will confirm exact numbers.
- Collect details naturally across the chat: NEET marks, category, preferred budget, India or abroad, preferred state.
- When the student is ready (asks about admission, process or fees), share 9920798988 and suggest tapping the "Get Guidance" button for a free call.
- Keep every reply under about 80 words. Stay on MBBS/medical-college admissions.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GROQ_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];

  const history: ChatMessage[] = raw
    .slice(-20)
    .map((entry: { role?: unknown; content?: unknown }): ChatMessage => ({
      role: entry?.role === "assistant" ? "assistant" : "user",
      content:
        typeof entry?.content === "string"
          ? entry.content.slice(0, 4000)
          : "",
    }))
    .filter((message) => message.content.trim().length > 0);

  if (!history.some((message) => message.role === "user")) {
    return NextResponse.json(
      { error: "At least one user message is required." },
      { status: 400 }
    );
  }

  const payload = {
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...history,
    ],
    max_tokens: 700,
    temperature: 0.7,
  };

  let lastError = "";

  for (const model of MODELS) {
    try {
      const response = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload, model }),
      });

      if (!response.ok) {
        lastError = `Groq ${model}: ${response.status}`;
        // Model retired / bad request -> try the next one, anything else is fatal.
        if (response.status !== 400 && response.status !== 404) break;
        continue;
      }

      const data = await response.json();
      const reply: string =
        data?.choices?.[0]?.message?.content?.trim() || "";

      if (!reply) {
        lastError = `Groq ${model}: empty reply`;
        continue;
      }

      return NextResponse.json({ reply });
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }

  return NextResponse.json(
    { error: `Doctor Vidya is unavailable right now (${lastError}).` },
    { status: 502 }
  );
}
