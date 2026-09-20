import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, RotateCcw, Cpu, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal, SectionHeading } from "./ui";

const TYPES = ["AI Product", "SaaS", "Website", "Automation", "Data Platform", "Custom Software"];
const CAPS = ["Authentication", "AI", "Database", "Dashboard", "Payments", "Notifications", "APIs", "Automation"];
const PHASES = ["Analyzing intent…", "Understanding requirements…", "Selecting architecture…", "Generating blueprint…"];

const STACK: Record<string, string[]> = {
  "AI Product": ["Python", "FastAPI", "LangChain", "Vector DB", "React + TypeScript"],
  SaaS: ["React + TypeScript", "Node.js / FastAPI", "PostgreSQL", "Auth", "Vercel"],
  Website: ["React + TypeScript", "Tailwind", "Vercel", "Forms + CMS-ready"],
  Automation: ["Python", "Webhooks", "Scheduled jobs", "Alert queue", "Integrations"],
  "Data Platform": ["PySpark", "Databricks", "Delta Lake", "SQL marts", "Dashboards"],
  "Custom Software": ["React + TypeScript", "FastAPI / Node", "Postgres / Mongo", "Docker"],
};

export default function ProductBuilder({ bare = false }: { bare?: boolean }) {
  const [step, setStep] = useState(0);
  const [type, setType] = useState("AI Product");
  const [goal, setGoal] = useState("");
  const [caps, setCaps] = useState<string[]>(["AI", "Database"]);
  const [busy, setBusy] = useState(false);
  const [phase, setPhase] = useState(0);
  const [done, setDone] = useState(false);

  const toggle = (c: string) => setCaps((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const blueprint = useMemo(() => {
    const stack = STACK[type] ?? STACK["Custom Software"];
    const ai = caps.includes("AI") || type === "AI Product";
    const stages = ["Prototype slice (days)", "MVP build (weeks)", "Deploy + docs", "Iterate on feedback"];
    return { stack, ai, stages };
  }, [type, caps]);

  const generate = () => {
    setBusy(true);
    setDone(false);
    setPhase(0);
    PHASES.forEach((_, i) => {
      window.setTimeout(() => setPhase(i), 650 * (i + 1));
    });
    window.setTimeout(() => {
      setBusy(false);
      setDone(true);
      setStep(3);
    }, 650 * (PHASES.length + 1));
  };

  return (
    <section id="builder" className="relative py-20 sm:py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {!bare && (
        <SectionHeading
          eyebrow="Product builder"
          title={<>Have an idea? <span className="text-[#c8ff3d]">Build your blueprint.</span></>}
          sub="A working mini-app inside this site. Answer three questions — get an architecture blueprint. Frontend-only demo; the real build happens with the studio."
        />
        )}
        {bare && (
          <Reveal>
            <p className="font-display text-xl font-bold">Answer three questions — get an architecture blueprint.</p>
          </Reveal>
        )}

        <Reveal delay={0.1} className="mt-10">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6">
            {/* wizard */}
            <div className="rounded-3xl card-border p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-[#c8ff3d]" : "bg-white/10"}`} />
                ))}
              </div>

              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="font-display text-xl font-bold">What are you building?</h3>
                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      {TYPES.map((t) => (
                        <button
                          key={t}
                          onClick={() => setType(t)}
                          className={`rounded-xl border px-4 py-3 text-sm font-semibold text-left transition-all ${
                            type === t ? "border-[#c8ff3d] bg-[#c8ff3d]/10 text-white" : "border-white/10 text-[#c6cdd8] hover:border-white/30"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setStep(1)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-black text-sm font-semibold px-6 py-3 hover:bg-[#c8ff3d] transition-colors">
                      Continue <ArrowRight size={15} />
                    </button>
                  </motion.div>
                )}
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="font-display text-xl font-bold">What is the goal?</h3>
                    <p className="text-sm text-[#9aa4b2] mt-1">One or two sentences. Example: “triage support tickets and draft replies”.</p>
                    <textarea
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      rows={4}
                      placeholder="Describe the outcome you want…"
                      className="mt-4 w-full rounded-xl bg-black/40 border border-white/10 p-4 text-[15px] placeholder:text-white/25 focus:border-[#c8ff3d]/60 outline-none resize-none"
                    />
                    <div className="mt-6 flex gap-2">
                      <button onClick={() => setStep(0)} className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold hover:border-white/40">Back</button>
                      <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 rounded-full bg-white text-black text-sm font-semibold px-6 py-3 hover:bg-[#c8ff3d] transition-colors">
                        Continue <ArrowRight size={15} />
                      </button>
                    </div>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="font-display text-xl font-bold">Choose capabilities</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {CAPS.map((c) => {
                        const on = caps.includes(c);
                        return (
                          <button
                            key={c}
                            onClick={() => toggle(c)}
                            aria-pressed={on}
                            className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                              on ? "border-[#c8ff3d] bg-[#c8ff3d] text-black" : "border-white/12 text-[#c6cdd8] hover:border-white/35"
                            }`}
                          >
                            {on && <Check size={14} />} {c}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-6 flex gap-2">
                      <button onClick={() => setStep(1)} className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold hover:border-white/40">Back</button>
                      <button
                        onClick={generate}
                        disabled={busy}
                        className="inline-flex items-center gap-2 rounded-full bg-[#c8ff3d] text-black text-sm font-bold px-6 py-3 hover:shadow-[0_0_32px_-6px_rgba(200,255,61,0.7)] transition-all disabled:opacity-60"
                      >
                        <Cpu size={15} /> Generate Blueprint →
                      </button>
                    </div>
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {!done ? null : (
                      <div>
                        <h3 className="font-display text-xl font-bold">Refine it</h3>
                        <p className="text-sm text-[#9aa4b2] mt-1">Change the type or capabilities and regenerate — deterministic demo logic.</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button onClick={() => { setStep(0); setDone(false); }} className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold hover:border-[#c8ff3d]/60 hover:text-[#c8ff3d]">
                            <span className="inline-flex items-center gap-1.5"><RotateCcw size={14} /> Start over</span>
                          </button>
                          <Link to="/start" className="rounded-full bg-[#c8ff3d] text-black px-5 py-2.5 text-sm font-bold">Start this project →</Link>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* output */}
            <div className="rounded-3xl border border-[#c8ff3d]/20 bg-[#0a0e17] p-6 sm:p-8 min-h-[420px]" aria-live="polite">
              <p className="font-mono2 text-[11px] tracking-[0.2em] text-[#9aa4b2]">OUTPUT // PRODUCT BLUEPRINT</p>
              {busy ? (
                <div className="mt-8">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#c8ff3d] animate-ping" />
                    <p className="font-mono2 text-sm text-[#c8ff3d]">{PHASES[phase]}</p>
                  </div>
                  <div className="mt-6 h-2 rounded-full bg-white/8 overflow-hidden">
                    <motion.div
                      className="h-full bg-[#c8ff3d]"
                      animate={{ width: `${((phase + 1) / PHASES.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="mt-6 space-y-2.5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-12 rounded-xl bg-white/[0.04] animate-pulse" />
                    ))}
                  </div>
                </div>
              ) : done ? (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
                  <h3 className="font-display text-2xl font-bold">{type} Blueprint</h3>
                  {goal && <p className="mt-2 text-sm text-[#9aa4b2] border-l-2 border-[#c8ff3d]/60 pl-3">“{goal}”</p>}
                  <div className="mt-5 grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="rounded-xl border border-white/10 p-4">
                      <p className="font-mono2 text-[11px] text-[#c8ff3d] tracking-widest">CORE FEATURES</p>
                      <ul className="mt-2 space-y-1.5 text-[#c6cdd8]">
                        {caps.map((c) => <li key={c}>• {c}</li>)}
                        {caps.length === 0 && <li>• Core CRUD + landing</li>}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-white/10 p-4">
                      <p className="font-mono2 text-[11px] text-[#c8ff3d] tracking-widest">STACK</p>
                      <ul className="mt-2 space-y-1.5 text-[#c6cdd8]">
                        {blueprint.stack.map((s) => <li key={s}>• {s}</li>)}
                      </ul>
                    </div>
                  </div>
                  {blueprint.ai && (
                    <div className="mt-4 rounded-xl border border-[#8b7bff]/30 bg-[#8b7bff]/[0.06] p-4 text-sm">
                      <p className="font-mono2 text-[11px] text-[#8b7bff] tracking-widest">AI COMPONENTS</p>
                      <p className="mt-1.5 text-[#c6cdd8]">Grounded generation + retrieval layer, intent routing, eval prompts — no ungrounded answers in v1.</p>
                    </div>
                  )}
                  <div className="mt-4 rounded-xl border border-white/10 p-4 text-sm">
                    <p className="font-mono2 text-[11px] text-[#c8ff3d] tracking-widest">STAGES</p>
                    <ol className="mt-2 space-y-1.5 text-[#c6cdd8]">
                      {blueprint.stages.map((s, i) => <li key={s}>{i + 1}. {s}</li>)}
                    </ol>
                  </div>
                </motion.div>
              ) : (
                <div className="mt-10 text-center text-sm text-[#9aa4b2]">
                  <Cpu size={28} className="mx-auto text-white/20" />
                  <p className="mt-4 max-w-xs mx-auto">Complete the three steps on the left and your blueprint will materialise here.</p>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
