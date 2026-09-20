import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal, SectionHeading } from "./ui";

const TYPES = ["AI Product", "SaaS / Web App", "Automation", "Data Platform", "Research Prototype"];
const COMPLEX = ["Focused", "Standard", "Complex"];
const FEATS = ["Auth + users", "AI / LLM", "Dashboard", "Payments", "Realtime", "Integrations", "Data pipelines", "Admin tooling"];

export default function Estimator() {
  const [type, setType] = useState(TYPES[0]);
  const [cx, setCx] = useState(COMPLEX[1]);
  const [feats, setFeats] = useState<string[]>(["AI / LLM", "Dashboard"]);

  const out = useMemo(() => {
    const score = feats.length + (cx === "Focused" ? 0 : cx === "Standard" ? 2 : 4);
    const scope = score <= 3 ? "Focused scope" : score <= 6 ? "Standard scope" : "Large scope";
    const stages =
      score <= 3
        ? ["1 prototype slice", "1 MVP increment", "Deploy + handover"]
        : score <= 6
          ? ["Prototype", "2–3 build increments", "Deploy + docs", "1 iteration pass"]
          : ["Deep discovery", "Prototype spike", "Phased build", "Staged rollout + support"];
    return { scope, stages };
  }, [feats, cx]);

  return (
    <section id="estimate" className="py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Scope estimator"
          title={<>What shape is <span className="text-[#c8ff3d]">your project?</span></>}
          sub="Frontend-only estimator. No fabricated pricing — you get scope, complexity and a recommended approach."
        />
        <Reveal delay={0.1} className="mt-10">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
            <div className="rounded-3xl card-border p-6 sm:p-8 space-y-7">
              <div>
                <p className="font-mono2 text-xs tracking-widest text-[#9aa4b2]">01 — PROJECT TYPE</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TYPES.map((t) => (
                    <button key={t} onClick={() => setType(t)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${type === t ? "bg-white text-black border-white" : "border-white/12 text-[#c6cdd8] hover:border-white/35"}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono2 text-xs tracking-widest text-[#9aa4b2]">02 — COMPLEXITY</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {COMPLEX.map((c) => (
                    <button key={c} onClick={() => setCx(c)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${cx === c ? "bg-[#c8ff3d] text-black border-[#c8ff3d]" : "border-white/12 text-[#c6cdd8] hover:border-white/35"}`}>{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono2 text-xs tracking-widest text-[#9aa4b2]">03 — FEATURES</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {FEATS.map((f) => {
                    const on = feats.includes(f);
                    return (
                      <button key={f} onClick={() => setFeats((p) => (on ? p.filter((x) => x !== f) : [...p, f]))} aria-pressed={on}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${on ? "border-[#8b7bff] bg-[#8b7bff]/20 text-white" : "border-white/12 text-[#c6cdd8] hover:border-white/35"}`}>
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-[#c8ff3d]/20 bg-[#0a0e17] p-6 sm:p-8" aria-live="polite">
              <p className="font-mono2 text-[11px] tracking-[0.2em] text-[#9aa4b2]">ESTIMATE // {type.toUpperCase()}</p>
              <h3 className="font-display text-2xl font-bold mt-2">{out.scope} · {cx}</h3>
              <p className="mt-2 text-sm text-[#9aa4b2]">{feats.length} capability{feats.length === 1 ? "" : "ies"} selected{feats.length ? `: ${feats.join(", ")}` : "."}</p>
              <ol className="mt-5 space-y-2 text-sm text-[#c6cdd8]">
                {out.stages.map((s, i) => <li key={s} className="rounded-xl border border-white/10 p-3"><span className="text-[#c8ff3d] font-mono2 text-xs mr-2">0{i + 1}</span>{s}</li>)}
              </ol>
              <p className="mt-5 rounded-xl bg-white/[0.04] border border-white/10 p-3.5 text-sm text-[#9aa4b2]">Pricing: <span className="text-white font-semibold">Custom scope required</span> — fixed after a discovery call.</p>
              <Link to="/start" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#c8ff3d] text-black text-sm font-bold px-6 py-3">Start a Project <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
