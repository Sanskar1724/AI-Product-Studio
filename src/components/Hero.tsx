import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { GithubIcon, MagneticButton } from "./ui";
import { GITHUB_URL } from "../data/studio";

const STAGES = [
  { name: "IDEA", detail: "A call, a sketch, a messy doc. Rough is fine — vague in, sharp questions out." },
  { name: "UNDERSTAND", detail: "Problem statement, users, success criteria. The smallest useful version gets defined." },
  { name: "AI + SOFTWARE + DATA", detail: "The engine room: agents & RAG, app & APIs, pipelines & models — picked per problem." },
  { name: "AUTOMATION", detail: "Triggers, decisions, actions. Repetitive work becomes systems that run themselves." },
  { name: "PRODUCT", detail: "Deployed, documented, handed over. Live software you can use — not slides." },
];

function PipelineCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, raf = 0, t = 0;
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random(), y: Math.random(), s: Math.random() * 1.8 + 0.4, v: Math.random() * 0.0009 + 0.0003,
    }));

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = canvas.width = r.width * devicePixelRatio;
      h = canvas.height = r.height * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);
      const mx = (mouse.current.x - 0.5) * 24 * devicePixelRatio;
      const my = (mouse.current.y - 0.5) * 18 * devicePixelRatio;
      const cx = w / 2 + mx;
      const yOff = my;
      // flow spine
      const grad = ctx.createLinearGradient(0, h * 0.1, 0, h * 0.85);
      grad.addColorStop(0, "rgba(200,255,61,0.0)");
      grad.addColorStop(0.5, "rgba(200,255,61,0.55)");
      grad.addColorStop(1, "rgba(139,123,255,0.5)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2 * devicePixelRatio;
      ctx.beginPath();
      ctx.moveTo(cx, h * 0.08);
      ctx.bezierCurveTo(cx - 60 * devicePixelRatio, h * 0.3, cx + 60 * devicePixelRatio, h * 0.55, cx, h * 0.86);
      ctx.stroke();

      // travelling pulse
      const py = h * (0.08 + ((t * 0.35) % 0.78));
      ctx.fillStyle = "#c8ff3d";
      ctx.shadowColor = "#c8ff3d";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(cx + Math.sin(py * 0.004) * 20 * devicePixelRatio, py, 4 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // nodes
      STAGES.forEach((_, i) => {        const ny = h * (0.1 + i * 0.185) + yOff * 0.4;
        const active = Math.abs(py - ny) < h * 0.09;
        ctx.strokeStyle = active ? "#c8ff3d" : "rgba(255,255,255,0.22)";
        ctx.lineWidth = (active ? 2.5 : 1.5) * devicePixelRatio;
        ctx.beginPath();
        ctx.arc(cx, ny, (active ? 9 : 6) * devicePixelRatio, 0, Math.PI * 2);
        ctx.stroke();
        if (active) {
          ctx.fillStyle = "rgba(200,255,61,0.15)";
          ctx.beginPath();
          ctx.arc(cx, ny, 18 * devicePixelRatio, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // particles
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      particles.forEach((p) => {
        p.y -= p.v;
        if (p.y < 0) p.y = 1;
        const px = (p.x * w + Math.sin(t * 2 + p.y * 8) * 8) + mx * p.y;
        ctx.globalAlpha = 0.15 + p.s * 0.2;
        ctx.fillRect(px, p.y * h, p.s * devicePixelRatio, p.s * devicePixelRatio);
      });
      ctx.globalAlpha = 1;

      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden />;
}

export default function Hero() {
  const [sel, setSel] = useState<number | null>(null);
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#c8ff3d]/[0.07] blur-[120px]" aria-hidden />
      <PipelineCanvas />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center w-full">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono2 text-[#c6cdd8]"
          >
            <span className="w-2 h-2 rounded-full bg-[#c8ff3d] animate-pulse" />
            INDEPENDENT AI PRODUCT STUDIO — PUNE / REMOTE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.98] tracking-tight text-balance"
          >
            Ideas in.
            <br />
            <span className="text-[#c8ff3d]">Intelligent products</span> out.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg text-[#9aa4b2] max-w-xl leading-relaxed"
          >
            AI-powered software, automation and digital products — designed, built and shipped
            from idea to deployment by one builder. No agency telephone game.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <MagneticButton to="/start">
              Start a Project <ArrowUpRight size={16} />
            </MagneticButton>
            <MagneticButton to="/services" variant="ghost">
              Explore What I Build <ArrowDown size={16} />
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#9aa4b2]"
          >
            {[
              ["Agents + RAG", "ReAct, tools, memory"],
              ["SaaS + APIs", "React, FastAPI, DBs"],
              ["Data", "Spark, Delta, ETL"],
            ].map(([a, b]) => (
              <div key={a} className="flex items-center gap-2">
                <span className="text-white font-semibold">{a}</span>
                <span className="text-white/30">·</span>
                <span>{b}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="hidden lg:block rounded-2xl card-border p-5 bg-[#0a0e17]/80 backdrop-blur"
          aria-label="Idea to product pipeline"
        >
          <p className="font-mono2 text-[11px] tracking-[0.2em] text-[#9aa4b2] mb-4">PIPELINE // CLICK A NODE</p>
          <ol className="space-y-1">
            {STAGES.map((s, i) => (
              <motion.li
                key={s.name}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15 }}
              >
                <button
                  onClick={() => setSel(sel === i ? null : i)}
                  aria-expanded={sel === i}
                  className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-mono2 text-left transition-all ${
                    i === STAGES.length - 1
                      ? "bg-[#c8ff3d] text-black font-bold"
                      : sel === i
                        ? "border border-[#c8ff3d]/60 bg-[#c8ff3d]/[0.06] text-white"
                        : "border border-white/8 text-[#c6cdd8] hover:border-white/25"
                  }`}
                >
                  <span className={`text-[11px] ${i === STAGES.length - 1 ? "text-black/60" : "text-[#c8ff3d]"}`}>
                    0{i + 1}
                  </span>
                  {s.name}
                  {i < STAGES.length - 1 && <span className="ml-auto opacity-40">↓</span>}
                </button>
                {sel === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="overflow-hidden px-4 py-2.5 text-[13px] text-[#9aa4b2] leading-relaxed"
                  >
                    {s.detail}
                  </motion.p>
                )}
              </motion.li>
            ))}
          </ol>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center gap-2 text-sm text-[#9aa4b2] hover:text-white transition-colors"
          >
            <GithubIcon size={16} /> Proof lives on GitHub — agents, fine-tunes, lakehouses
          </a>
        </motion.div>
      </div>
    </section>
  );
}
