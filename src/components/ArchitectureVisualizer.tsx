import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { ARCHITECTURES } from "../data/studio";
import { Reveal, SectionHeading } from "./ui";
import { StatusDot, prefersReduced } from "../fx/fx";

const IN_OUT: Record<string, [string, string]> = {
  USER: ["clicks, prompts, uploads", "answers, screens, files"],
  FRONTEND: ["design system, routes", "rendered UI, charts"],
  API: ["validated requests", "typed responses"],
  AI: ["retrieved context + tools", "grounded generation"],
  DATABASE: ["writes, vectors, events", "reads, history, marts"],
  WORKERS: ["queued jobs", "emails, webhooks, syncs"],
  TRIGGER: ["webhooks, schedules", "routed events"],
  ROUTER: ["rules + classifier", "routed actions"],
  ACTIONS: ["API calls, drafts", "completed work + logs"],
  HUMAN: ["review queue", "approvals"],
  SOURCES: ["apps, sheets, APIs", "raw streams"],
  INGEST: ["raw streams", "bronze tables"],
  REFINE: ["bronze tables", "gold marts"],
  SERVE: ["gold marts", "dashboards, scores"],
  CONSUME: ["dashboards, scores", "decisions"],
};

export default function ArchitectureVisualizer() {
  const [id, setId] = useState(ARCHITECTURES[0].id);
  const [slot, setSlot] = useState(0);
  const arch = ARCHITECTURES.find((x) => x.id === id)!;

  useEffect(() => { setSlot(0); }, [id]);
  useEffect(() => {
    if (prefersReduced()) return;
    const t = window.setInterval(() => setSlot((s) => (s + 1) % arch.layers.length), 1800);
    return () => window.clearInterval(t);
  }, [arch.layers.length, id]);

  const detail = arch.layers[slot];
  const io = IN_OUT[detail.node] ?? ["request in", "result out"];

  return (
    <section className="py-20 sm:py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-sw" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Machine room"
          title={<>Rack it. <span className="text-[#c8ff3d]">Watch data move.</span></>}
          sub="Select a product type, then a rack slot. The packet travels the stack on its own — click any layer to freeze and inspect its inputs and outputs."
        />
        <Reveal delay={0.1} className="mt-8">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Architectures">
            {ARCHITECTURES.map((x) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={x.id === id}
                onClick={() => setId(x.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold border transition-all ${
                  x.id === id ? "bg-white text-black border-white" : "border-white/12 text-[#c6cdd8] hover:border-white/30"
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 grid lg:grid-cols-[1fr_1fr] gap-6">
          {/* rack */}
          <Reveal delay={0.12}>
            <div className="rounded-3xl g-border p-5 sm:p-7" role="list" aria-label={`${arch.label} rack`}>
              <div className="flex items-center gap-2 mb-5">
                <Cpu size={15} className="text-[#c8ff3d]" />
                <span className="font-mono2 text-[11px] tracking-[0.2em] text-[#9aa4b2]">RACK // {arch.label.toUpperCase()}</span>
                <span className="ml-auto"><StatusDot label="live flow" /></span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={arch.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {arch.layers.map((l, i) => {
                    const on = slot === i;
                    return (
                      <div key={l.node}>
                        <button
                          role="listitem"
                          onClick={() => setSlot(i)}
                          aria-pressed={on}
                          className={`w-full flex items-center gap-4 rounded-2xl border px-5 py-3.5 text-left transition-all duration-300 ${
                            on
                              ? "border-[#c8ff3d]/60 bg-[#c8ff3d]/[0.06] glow-line"
                              : "border-white/10 bg-white/[0.02] hover:border-white/25"
                          }`}
                        >
                          <span className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-black/50 border border-white/10 font-mono2 text-[11px] font-bold text-[#c8ff3d]">
                            {on && !prefersReduced() ? <span className="w-2 h-2 rounded-full bg-[#c8ff3d] animate-ping" /> : `0${i + 1}`}
                          </span>
                          <span className="font-mono2 text-sm font-bold w-24">{l.node}</span>
                          <span className="text-[13px] text-[#9aa4b2] hidden sm:block">{l.detail}</span>
                        </button>
                        {i < arch.layers.length - 1 && (
                          <div className="relative flex justify-start pl-9 py-0.5" aria-hidden>
                            <span className="block w-px h-4 bg-white/12" />
                            {!prefersReduced() && (
                              <span
                                className="packet absolute top-0 left-[35px] w-1.5 h-1.5 rounded-full bg-[#c8ff3d]"
                                style={{ "--path": "path('M0,0 L0,16')", "--dur": "1.8s", "--delay": `${i * 0.22}s` } as CSSProperties}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          {/* inspector drawer */}
          <Reveal delay={0.18}>
            <div className="rounded-3xl card-border p-6 sm:p-8 h-full flex flex-col" aria-live="polite">
              <p className="font-mono2 text-[11px] tracking-[0.2em] text-[#9aa4b2]">INSPECTOR // SLOT 0{slot + 1}</p>
              <AnimatePresence mode="wait">
                <motion.div key={`${id}-${slot}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <h3 className="font-display text-3xl font-bold mt-3">{detail.node}</h3>
                  <p className="mt-1 text-[#9aa4b2]">{detail.detail}</p>
                  <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl border border-white/10 p-4">
                      <p className="font-mono2 text-[11px] tracking-widest text-[#8b7bff]">◀ IN</p>
                      <p className="mt-1.5 text-[#c6cdd8]">{io[0]}</p>
                    </div>
                    <div className="rounded-2xl border border-[#c8ff3d]/25 bg-[#c8ff3d]/[0.04] p-4">
                      <p className="font-mono2 text-[11px] tracking-widest text-[#c8ff3d]">OUT ▶</p>
                      <p className="mt-1.5 text-[#c6cdd8]">{io[1]}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between font-mono2 text-[11px] text-[#9aa4b2]">
                      <span>FLOW POSITION</span><span>{slot + 1} / {arch.layers.length}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-white/8 overflow-hidden">
                      <motion.div className="h-full bg-gradient-to-r from-[#8b7bff] to-[#c8ff3d]" animate={{ width: `${((slot + 1) / arch.layers.length) * 100}%` }} transition={{ duration: 0.5 }} />
                    </div>
                  </div>
                  <p className="mt-5 rounded-2xl border border-[#8b7bff]/30 bg-[#8b7bff]/[0.06] p-4 text-sm text-[#c6cdd8]">
                    <span className="font-mono2 text-[11px] text-[#8b7bff] tracking-widest">DESIGN NOTE — </span>{arch.note}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
