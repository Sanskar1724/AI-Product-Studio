import { useState } from "react";
import { motion } from "framer-motion";
import { Send, RotateCcw, ShieldAlert } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { StatusDot } from "../fx/fx";

interface Analysis {
  intent: string;
  sentiment: string;
  priority: "High" | "Medium" | "Low";
  category: string;
  confidence: number;
  reply: string;
  escalate: boolean;
}

function analyze(text: string): Analysis {
  const t = text.toLowerCase();
  const has = (...ws: string[]) => ws.some((w) => t.includes(w));
  let intent = "General Inquiry", category = "Support", priority: Analysis["priority"] = "Medium",
    sentiment = "Neutral", confidence = 0.82, escalate = false;

  if (has("payment", "pay", "money", "deduct", "refund", "charged", "upi", "transaction")) {
    intent = "Payment Issue"; category = "Transaction";
    priority = has("deduct", "failed", "lost", "fraud", "stuck") ? "High" : "Medium";
    confidence = 0.94; escalate = priority === "High";
  } else if (has("refund", "return", "cancel")) {
    intent = "Refund / Cancellation"; category = "Order"; confidence = 0.9;
  } else if (has("login", "password", "otp", "account", "access")) {
    intent = "Account Access"; category = "Identity"; confidence = 0.88;
  } else if (has("slow", "error", "bug", "crash", "not working", "broken")) {
    intent = "Technical Fault"; category = "Reliability"; priority = "High"; confidence = 0.87; escalate = true;
  } else if (has("price", "plan", "upgrade", "bill", "invoice")) {
    intent = "Billing Question"; category = "Billing"; priority = "Low"; confidence = 0.85;
  }
  if (has("frustrat", "angry", "terrible", "worst", "failed", "urgent", "immediately", "!!!")) sentiment = "Frustrated";
  else if (has("thanks", "great", "love", "awesome")) sentiment = "Positive";
  else if (has("worried", "confused", "unsure", "help")) sentiment = "Concerned";

  const reply =
    intent === "Payment Issue"
      ? "I can see why this is worrying — a failed payment with a deduction needs a clear answer. I've flagged this as high priority, logged the transaction for verification, and drafted the next step: confirm the deduction with your bank reference, then trigger a re-check or refund. A specialist reviews all high-priority payment cases."
      : `Understood — I've classified this as “${intent}” (${category}) with ${priority.toLowerCase()} priority. Here's a grounded next step based only on what you shared, plus what I'd ask to resolve it fully. A human reviews anything I can't verify.`;

  return { intent, sentiment, priority, category, confidence, reply, escalate };
}

const EXAMPLES = [
  "My payment failed but money was deducted.",
  "I can't log in — OTP never arrives.",
  "How do I upgrade my plan and get an invoice?",
];

export default function LiveDemo({ bare = false }: { bare?: boolean }) {
  const [input, setInput] = useState(EXAMPLES[0]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Analysis | null>(null);

  const run = () => {
    if (!input.trim() || busy) return;
    setBusy(true);
    setResult(null);
    window.setTimeout(() => {
      setResult(analyze(input));
      setBusy(false);
    }, 1100);
  };

  return (
    <section className="py-20 sm:py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {!bare && (
        <SectionHeading
          eyebrow="Live demo · simulation"
          title={<>Watch support AI <span className="text-[#c8ff3d]">think.</span></>}
          sub="Frontend-only simulation of the triage pattern used in PayTrust_AI-style systems: intent → sentiment → priority → grounded reply. No backend, no fake claims."
        />
        )}
        {bare && (
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-display text-xl font-bold">Try the triage sim — type, analyze, inspect.</p>
              <span className="ml-auto"><StatusDot label="sim online" /></span>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.1} className="mt-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
            <div className="rounded-3xl card-border p-6 sm:p-8">
              <p className="font-mono2 text-[11px] tracking-[0.2em] text-[#9aa4b2]">CUSTOMER MESSAGE</p>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                className="mt-3 w-full rounded-xl bg-black/40 border border-white/10 p-4 text-[15px] focus:border-[#c8ff3d]/60 outline-none resize-none"
                aria-label="Demo customer message"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {EXAMPLES.map((e) => (
                  <button
                    key={e}
                    onClick={() => { setInput(e); setResult(null); }}
                    className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-[#c6cdd8] hover:border-[#c8ff3d]/50 hover:text-white transition-colors text-left"
                  >
                    Try: “{e.slice(0, 34)}…”
                  </button>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <button
                  onClick={run}
                  disabled={busy || !input.trim()}
                  className="inline-flex items-center gap-2 rounded-full bg-[#c8ff3d] text-black text-sm font-bold px-6 py-3 disabled:opacity-50 hover:shadow-[0_0_32px_-6px_rgba(200,255,61,0.7)] transition-all"
                >
                  <Send size={15} /> {busy ? "Analyzing…" : "Analyze message"}
                </button>
                {result && (
                  <button onClick={() => { setResult(null); setInput(""); }} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold hover:border-white/40">
                    <RotateCcw size={14} /> Try another
                  </button>
                )}
              </div>
              <p className="mt-4 flex items-start gap-2 text-xs text-[#9aa4b2]">
                <ShieldAlert size={14} className="mt-0.5 shrink-0" />
                Demo simulation: deterministic keyword logic in your browser. Production version would call a real model + retrieval layer.
              </p>
            </div>

            <div className="rounded-3xl border border-[#c8ff3d]/20 bg-[#0a0e17] p-6 sm:p-8 min-h-[380px]" aria-live="polite">
              <p className="font-mono2 text-[11px] tracking-[0.2em] text-[#9aa4b2]">AI ANALYSIS</p>
              {busy && (
                <div className="mt-8 space-y-3">
                  {["Parsing message…", "Scoring intent + sentiment…", "Drafting grounded reply…"].map((s, i) => (
                    <motion.div key={s} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.3 }} className="flex items-center gap-3 text-sm text-[#c6cdd8]">
                      <span className="w-2 h-2 rounded-full bg-[#c8ff3d] animate-pulse" /> {s}
                    </motion.div>
                  ))}
                  <div className="h-2 rounded-full bg-white/8 overflow-hidden mt-4">
                    <motion.div className="h-full bg-[#c8ff3d]" initial={{ width: "10%" }} animate={{ width: "90%" }} transition={{ duration: 1 }} />
                  </div>
                </div>
              )}
              {!busy && !result && (
                <p className="mt-10 text-center text-sm text-[#9aa4b2]">Run an analysis to see intent, sentiment, priority and a draft reply.</p>
              )}
              {!busy && result && (
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      ["Intent", result.intent],
                      ["Sentiment", result.sentiment],
                      ["Priority", result.priority],
                      ["Category", result.category],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-xl border border-white/10 p-3.5">
                        <p className="font-mono2 text-[10px] tracking-widest text-[#9aa4b2]">{k.toUpperCase()}</p>
                        <p className={`mt-1 font-bold ${k === "Priority" && v === "High" ? "text-red-400" : "text-white"}`}>{v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-mono2 text-[#9aa4b2]">
                      <span>CONFIDENCE</span><span>{Math.round(result.confidence * 100)}%</span>
                    </div>
                    <div className="mt-1.5 h-2 rounded-full bg-white/8 overflow-hidden">
                      <motion.div className="h-full bg-gradient-to-r from-[#8b7bff] to-[#c8ff3d]" initial={{ width: 0 }} animate={{ width: `${result.confidence * 100}%` }} transition={{ duration: 0.8 }} />
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4 text-sm leading-relaxed text-[#c6cdd8]">
                    {result.reply}
                  </div>
                  <p className={`mt-3 text-xs font-mono2 ${result.escalate ? "text-red-400" : "text-[#c8ff3d]"}`}>
                    {result.escalate ? "● ESCALATED to human review" : "○ Resolved in draft — human approves send"}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
