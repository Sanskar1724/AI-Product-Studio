import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { EXPERIMENTS } from "../data/studio";
import { Reveal, SectionHeading } from "./ui";
import { StatusDot, Typewriter, prefersReduced } from "../fx/fx";

/* ---------- AI personality: clickable neural field ---------- */
const NODES = [
  { x: 0.12, y: 0.3, label: "Agents", detail: "ReAct loops, tool calling, memory — CampusOps, ReAct-Agent." },
  { x: 0.3, y: 0.65, label: "RAG", detail: "Retrieval over your docs — grounded answers, no freelancing." },
  { x: 0.5, y: 0.25, label: "Fine-tuning", detail: "QLoRA on Qwen 2.5, CPT → SFT → DPO pipelines." },
  { x: 0.68, y: 0.6, label: "Transformers", detail: "Decoder-only builds from scratch — RoPE, GQA, SwiGLU." },
  { x: 0.86, y: 0.32, label: "Applied ML", detail: "Risk scoring with bounded responses — PayTrust_AI." },
];

export function NeuralField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const [sel, setSel] = useState<number | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || prefersReduced()) return;
    let w = 0, h = 0, raf = 0, t = 0, visible = true;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = canvas.width = r.width;
      h = canvas.height = r.height;
    };
    resize();
    window.addEventListener("resize", resize);
    const obs = new IntersectionObserver((es) => { visible = es[0].isIntersecting; });
    obs.observe(canvas);
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      t += 0.012;
      ctx.clearRect(0, 0, w, h);
      const pts = NODES.map((n) => ({ x: n.x * w, y: n.y * h + Math.sin(t + n.x * 6) * 6 }));
      ctx.strokeStyle = "rgba(139,123,255,0.28)";
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const a = 0.28 * (0.5 + 0.5 * Math.sin(t * 1.5 + i + j));
          ctx.strokeStyle = `rgba(139,123,255,${a.toFixed(3)})`;
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      pts.forEach((p, i) => {
        const near = Math.hypot(mouse.current.x * w - p.x, mouse.current.y * h - p.y) < 90;
        const on = sel === i;
        if (near || on) {
          ctx.fillStyle = on ? "rgba(200,255,61,0.18)" : "rgba(139,123,255,0.14)";
          ctx.beginPath(); ctx.arc(p.x, p.y, 26, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = on ? "#c8ff3d" : "#8b7bff";
        ctx.beginPath(); ctx.arc(p.x, p.y, on ? 7 : 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = on ? "#fff" : "rgba(255,255,255,0.65)";
        ctx.font = "11px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText(NODES[i].label, p.x, p.y + 24);
      });
    };
    draw();
    return () => { cancelAnimationFrame(raf); obs.disconnect(); window.removeEventListener("resize", resize); };
  }, [sel]);

  const click = (e: MouseEvent) => {
    const canvas = ref.current;
    if (!canvas) return;
    const r = canvas.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    const i = NODES.findIndex((n) => Math.hypot(n.x - x, n.y - y) < 0.09);
    setSel(i === sel ? null : i === -1 ? null : i);
  };
  const move = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) mouse.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  };

  return (
    <div className="rounded-3xl g-border p-6 sm:p-8 relative overflow-hidden">
      <div className="flex flex-wrap items-center gap-3">
        <StatusDot label="AI core · live" />
        <span className="ml-auto font-mono2 text-[11px] text-[#9aa4b2]">click a node ↓</span>
      </div>
      <canvas ref={ref} onClick={click} onPointerMove={move} className="mt-4 w-full h-56 sm:h-64 cursor-pointer rounded-2xl" aria-label="Interactive neural field. Activate a node to inspect a capability." role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter") setSel(sel === null ? 0 : null); }} />
      <div className="mt-3 min-h-[44px] text-sm text-[#c6cdd8]" aria-live="polite">
        {sel !== null ? <><span className="text-[#c8ff3d] font-mono2 text-xs">{NODES[sel].label} — </span>{NODES[sel].detail}</> : <span className="text-[#9aa4b2]">Five disciplines, one network. Select a node to inspect what it builds.</span>}
      </div>
    </div>
  );
}

/* ---------- Software personality: floating terminal ---------- */
export function TerminalWindow({ lines, title = "forge — build.sh" }: { lines: string[]; title?: string }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-black/60 overflow-hidden shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/8 bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <span className="ml-2 font-mono2 text-[11px] text-[#9aa4b2]">{title}</span>
        <span className="ml-auto"><StatusDot color="#5eead4" label="build ready" /></span>
      </div>
      <div className="p-4 sm:p-5 font-mono2 text-[13px] leading-relaxed text-[#c6cdd8] min-h-[150px]">
        <Typewriter lines={lines} />
      </div>
    </div>
  );
}

/* ---------- Research personality: honest experiment comparison ---------- */
const COMPARE = [
  { exp: "EXP-01", title: "Digital Twin", base: "Qwen 2.5", technique: "QLoRA (Unsloth)", data: "Hand-curated ChatML", status: "shipped" as const },
  { exp: "EXP-03", title: "Alignment pipeline", base: "Open models", technique: "CPT → SFT → DPO → RLVR/GRPO", data: "Pipeline stages (PEFT · TRL)", status: "active" as const },
  { exp: "EXP-04", title: "Mini Modern LLM", base: "From scratch", technique: "RoPE · GQA · SwiGLU", data: "Char-level LM", status: "shipped" as const },
];

export function ExperimentCompare() {
  const [ids, setIds] = useState<string[]>(["EXP-01", "EXP-04"]);
  const toggle = (id: string) => setIds((p) => (p.includes(id) ? (p.length > 1 ? p.filter((x) => x !== id) : p) : [...p, id]));
  const rows = COMPARE.filter((c) => ids.includes(c.exp));

  return (
    <section className="py-20 sm:py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Compare runs"
          title={<>Same question, <span className="text-[#c8ff3d]">different machinery.</span></>}
          sub="How three model tracks differ — base, technique, data, status. Factual cells from public repos; no invented scores."
        />
        <div className="mt-6 flex flex-wrap gap-2">
          {COMPARE.map((c) => {
            const on = ids.includes(c.exp);
            return (
              <button key={c.exp} onClick={() => toggle(c.exp)} aria-pressed={on}
                className={`rounded-full border px-4 py-2 text-sm font-mono2 transition-all ${on ? "border-[#c8ff3d] bg-[#c8ff3d]/10 text-white" : "border-white/12 text-[#9aa4b2] hover:border-white/30"}`}>
                {on ? "✓ " : ""}{c.exp} · {c.title}
              </button>
            );
          })}
        </div>
        <Reveal delay={0.1} className="mt-6">
          <div className="rounded-3xl card-border overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="font-mono2 text-[11px] tracking-widest text-[#9aa4b2] text-left">
                  <th className="p-5">TRACK</th><th className="p-5">BASE</th><th className="p-5">TECHNIQUE</th><th className="p-5">DATA</th><th className="p-5">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <motion.tr key={r.exp} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-white/8">
                    <td className="p-5 font-display font-bold">{r.title}<span className="block font-mono2 text-[11px] text-[#8b7bff] font-normal">{r.exp}</span></td>
                    <td className="p-5 text-[#c6cdd8]">{r.base}</td>
                    <td className="p-5 text-[#c6cdd8] font-mono2 text-[13px]">{r.technique}</td>
                    <td className="p-5 text-[#c6cdd8]">{r.data}</td>
                    <td className="p-5"><StatusDot label={r.status} color={r.status === "shipped" ? "#fff" : "#c8ff3d"} /></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="mt-4 font-mono2 text-[11px] text-white/35">All tracks link to code in the experiment grid below. Scores are omitted — nothing here was benchmarked for marketing.</p>
        <div className="sr-only">{EXPERIMENTS.length} experiments documented</div>
      </div>
    </section>
  );
}
