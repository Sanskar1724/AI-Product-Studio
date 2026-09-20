import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Database, Sparkles, ExternalLink, RotateCcw } from "lucide-react";
import { EXPERIMENTS, PROJECTS } from "../data/studio";
import { Reveal, SectionHeading } from "./ui";
import { StatusDot } from "../fx/fx";
import { GithubIcon } from "./ui";

interface Doc { source: string; link: string; kind: string; text: string }

const KB: Doc[] = [
  ...PROJECTS.map((p) => ({ source: p.name, link: p.repo, kind: "build", text: `${p.problem} ${p.solution} ${p.tech.join(" ")}` })),
  ...EXPERIMENTS.map((e) => ({ source: `${e.no} · ${e.title}`, link: e.link, kind: "experiment", text: `${e.objective} ${e.model} ${e.area}` })),
];

const STOP = new Set("how,what,show,tell,me,does,do,the,and,or,for,with,from,that,this,are,was,were,have,has,had,you,your,there,their,about,into,any,all,work,works,used,use,using,like,can,could,should,would,there,is,it,as,of,to,in,on,a,an,i".split(","));

function tokens(s: string): string[] {
  return s.toLowerCase().replace(/[^a-z0-9+_.\s]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));
}

interface Hit { doc: Doc; score: number }

const EXAMPLES = [
  "How do agents use tools?",
  "What fine-tuning work exists?",
  "Show me data pipeline projects",
  "payment fraud detection",
];

export default function RagPlayground() {
  const [q, setQ] = useState(EXAMPLES[0]);
  const [phase, setPhase] = useState<"idle" | "retrieving" | "streaming" | "done">("idle");
  const [hits, setHits] = useState<Hit[]>([]);
  const [answer, setAnswer] = useState("");
  const [shown, setShown] = useState(0);

  const ask = (query: string) => {
    const qs = tokens(query);
    if (!qs.length || phase === "retrieving" || phase === "streaming") return;
    setPhase("retrieving");
    setHits([]);
    setAnswer("");
    setShown(0);
    window.setTimeout(() => {
      const scored = KB.map((doc) => {
        const dt = tokens(doc.text);
        const hit = qs.filter((w) => dt.some((d) => d === w || (w.length > 4 && d.startsWith(w)) || (d.length > 4 && w.startsWith(d))));
        return { doc, score: hit.length / qs.length };
      })
        .filter((h) => h.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
      setHits(scored);
      const text = scored.length
        ? `Retrieved ${scored.length} chunk${scored.length > 1 ? "s" : ""} from the studio knowledge base. ` +
          scored.map((h, i) => `${i + 1}) ${h.doc.source} — ${h.doc.text.split(".")[0]}.`).join(" ") +
          " Open a source to read the full code — every claim above comes from those pages."
        : "No strong match in the knowledge base. Try terms that exist here: agent, fine-tuning, lakehouse, payment, campus, transformer.";
      setAnswer(text);
      setPhase("streaming");
    }, 800);
  };

  useEffect(() => {
    if (phase !== "streaming") return;
    const words = answer.split(" ");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(words.length); setPhase("done"); return; }
    const id = window.setInterval(() => {
      setShown((s) => {
        if (s >= words.length) { window.clearInterval(id); setPhase("done"); return s; }
        return s + 2;
      });
    }, 40);
    return () => window.clearInterval(id);
  }, [phase, answer]);

  const busy = phase === "retrieving" || phase === "streaming";

  return (
    <section className="py-20 sm:py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-lab" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="RAG playground"
          title={<>Ask the knowledge base. <span className="text-[#c8ff3d]">Watch retrieval work.</span></>}
          sub="A real in-browser RAG loop over this studio's own projects and experiments: keyword retrieval, ranked chunks, then a grounded, streamed answer. Simulation — no embeddings backend."
        />

        <Reveal delay={0.1} className="mt-8">
          {/* flow rail */}
          <div className="flex items-center gap-2 font-mono2 text-[11px] tracking-widest mb-5" aria-hidden>
            {(["QUERY", "RETRIEVE", "GENERATE"] as const).map((s, i) => {
              const activeIdx = phase === "idle" ? -1 : phase === "retrieving" ? 1 : 2;
              const on = i <= activeIdx;
              return (
                <span key={s} className="flex items-center gap-2">
                  <span className={`rounded-full border px-3 py-1 transition-all ${on ? "border-[#c8ff3d]/60 text-[#c8ff3d]" : "border-white/10 text-white/30"}`}>{s}</span>
                  {i < 2 && <span className={on ? "text-[#c8ff3d]" : "text-white/20"}>→</span>}
                </span>
              );
            })}
            <span className="ml-auto hidden sm:block"><StatusDot label={phase === "idle" ? "awaiting query" : phase} /></span>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6">
            {/* query + chunks */}
            <div className="rounded-3xl card-border p-6 sm:p-8">
              <p className="font-mono2 text-[11px] tracking-[0.2em] text-[#9aa4b2]">YOUR QUESTION</p>
              <div className="mt-3 flex gap-2">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") ask(q); }}
                  placeholder="Ask about agents, fine-tuning, data…"
                  className="flex-1 rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-[15px] placeholder:text-white/25 focus:border-[#c8ff3d]/60 outline-none"
                  aria-label="RAG query"
                />
                <button
                  onClick={() => ask(q)}
                  disabled={busy || !q.trim()}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#c8ff3d] text-black text-sm font-bold px-5 py-3 disabled:opacity-50 hover:shadow-[0_0_28px_-6px_rgba(200,255,61,0.7)] transition-all active:scale-95"
                >
                  <Search size={15} /> Ask
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {EXAMPLES.map((e) => (
                  <button key={e} onClick={() => { setQ(e); ask(e); }} className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-[#c6cdd8] hover:border-[#c8ff3d]/50 hover:text-white transition-colors">
                    {e}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-2.5 min-h-[180px]" aria-live="polite">
                <p className="font-mono2 text-[11px] tracking-[0.2em] text-[#9aa4b2] flex items-center gap-2">
                  <Database size={13} /> RETRIEVED CHUNKS {phase === "retrieving" && <span className="text-[#c8ff3d] animate-pulse">scanning…</span>}
                </p>
                {phase === "retrieving" && (
                  <div className="space-y-2.5">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-14 rounded-xl" />)}</div>
                )}
                <AnimatePresence>
                  {hits.map((h, i) => (
                    <motion.a
                      key={h.doc.source}
                      href={h.doc.link}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 }}
                      className="group flex items-center gap-3 rounded-xl border border-[#8b7bff]/30 bg-[#8b7bff]/[0.05] px-4 py-3 hover:border-[#c8ff3d]/50 transition-colors"
                      data-tip="Open the source repo"
                    >
                      <span className="font-mono2 text-[11px] text-[#8b7bff]">#{i + 1}</span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold truncate">{h.doc.source}</span>
                        <span className="block font-mono2 text-[11px] text-[#9aa4b2]">keyword overlap {Math.round(h.score * 100)}% · {h.doc.kind}</span>
                      </span>
                      <ExternalLink size={14} className="text-white/40 group-hover:text-[#c8ff3d] shrink-0" />
                    </motion.a>
                  ))}
                </AnimatePresence>
                {phase === "done" && hits.length === 0 && (
                  <p className="text-sm text-[#9aa4b2]">No chunks passed the overlap threshold — the answer says so honestly instead of inventing one.</p>
                )}
              </div>
            </div>

            {/* generated answer */}
            <div className="rounded-3xl border border-[#c8ff3d]/20 bg-[#0a0e17] overflow-hidden flex flex-col">
              <div className="flex items-center gap-1.5 px-5 py-3 border-b border-white/8 bg-white/[0.02]">
                <Sparkles size={14} className="text-[#c8ff3d]" />
                <span className="font-mono2 text-[11px] tracking-[0.2em] text-[#9aa4b2]">GROUNDED ANSWER</span>
                {(phase === "streaming") && <span className="ml-auto font-mono2 text-[11px] text-[#c8ff3d] animate-pulse">● generating</span>}
                {phase === "done" && answer && <span className="ml-auto font-mono2 text-[11px] text-white/40">● complete · cited</span>}
              </div>
              <div className="p-5 sm:p-6 text-[15px] leading-relaxed text-[#c6cdd8] min-h-[280px] flex-1" aria-live="polite">
                {!answer && <p className="text-[#9aa4b2] text-sm mt-8 text-center">Ask a question — retrieval runs first, generation only uses retrieved chunks.</p>}
                {answer && <p>{answer.split(" ").slice(0, shown).join(" ")}{phase === "streaming" && <span className="term-caret" />}</p>}
              </div>
              <div className="px-5 py-3 border-t border-white/8 flex items-center gap-3">
                <span className="font-mono2 text-[11px] text-white/35">simulation · keyword retrieval in-browser</span>
                {answer && (
                  <button onClick={() => { setAnswer(""); setHits([]); setShown(0); setPhase("idle"); }} className="ml-auto inline-flex items-center gap-1.5 font-mono2 text-[11px] text-white/50 hover:text-[#c8ff3d] transition-colors">
                    <RotateCcw size={12} /> reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
        <p className="mt-4 font-mono2 text-[11px] text-white/35 flex items-center gap-2">
          <GithubIcon size={13} /> Every chunk links to its real repository — the answer can only cite what was retrieved.
        </p>
      </div>
    </section>
  );
}
