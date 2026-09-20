import { useEffect, useRef, useState, type MouseEvent, type PointerEvent as RPointerEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Workflow, Lightbulb, Package, Database } from "lucide-react";
import { prefersReduced } from "../fx/fx";

export type CoreKey = "agents" | "automation" | "idea" | "products" | "data";

export const CORE_STATE: Record<CoreKey, string> = {
  agents: "BUILD",
  automation: "AUTOMATE",
  products: "SHIP",
  idea: "IDEA IN",
  data: "DATA FLOW",
};

const CARDS: { id: CoreKey; icon: typeof Bot; title: string; lines: string[]; detail: string }[] = [
  { id: "agents", icon: Bot, title: "AI AGENTS", lines: ["Plan", "Use tools", "Take action"], detail: "ReAct think → act → observe loops with tool calling and memory. See ReAct-Agent and CampusOps on GitHub." },
  { id: "automation", icon: Workflow, title: "AUTOMATION", lines: ["Trigger", "Process", "Deliver"], detail: "Event-driven pipelines: classify, decide, act, log. Support triage, leads, reporting, alerts." },
  { id: "idea", icon: Lightbulb, title: "IDEA", lines: ["Problem", "Opportunity", "Vision"], detail: "Rough is fine. A call turns napkin sketches into a scoped MVP with success criteria." },
  { id: "products", icon: Package, title: "PRODUCTS", lines: ["Design", "Develop", "Deploy"], detail: "SaaS, dashboards, APIs and internal tools — React + TypeScript frontends, deployed and documented." },
  { id: "data", icon: Database, title: "DATA", lines: ["Ingest", "Analyze", "Visualize"], detail: "Spark + Delta Lake medallion pipelines that turn raw tables into decisions and dashboards." },
];

/* ================= 3D engine (canvas, perspective projection) ================= */
interface V3 { x: number; y: number; z: number }

function fibSphere(n: number): V3[] {
  const pts: V3[] = [];
  const ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = ga * i;
    pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
  }
  return pts;
}

function Engine(canvas: HTMLCanvasElement, opts: { density: number; getActive: () => boolean; mouse: { x: number; y: number } }) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const reduced = prefersReduced();
  let w = 0, h = 0, raf = 0, t = Math.random() * 10, visible = true;
  let rotY = 0, tiltX = 0.42, tiltY = 0;
  const sphere = fibSphere(opts.density);
  const dust = Array.from({ length: Math.round(opts.density / 3) }, () => ({
    p: { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 1 } as V3,
    s: Math.random() * 1.4 + 0.5,
    v: Math.random() * 0.12 + 0.04,
  }));
  const rings = [
    { r: 1.62, tilt: 1.18, roll: 0.25, speed: 0.22, nodes: 2, alpha: 0.30 },
    { r: 1.95, tilt: 0.55, roll: -0.4, speed: -0.15, nodes: 2, alpha: 0.20 },
    { r: 2.28, tilt: 1.45, roll: 0.9, speed: 0.1, nodes: 1, alpha: 0.13 },
  ];

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    w = r.width; h = r.height;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);
  const obs = new IntersectionObserver((es) => { visible = es[0].isIntersecting; });
  obs.observe(canvas);

  const rot = (p: V3, ax: number, ay: number): V3 => {
    const c1 = Math.cos(ay), s1 = Math.sin(ay);
    const x1 = p.x * c1 - p.z * s1, z1 = p.x * s1 + p.z * c1;
    const c2 = Math.cos(ax), s2 = Math.sin(ax);
    return { x: x1, y: p.y * c2 - z1 * s2, z: p.y * s2 + z1 * c2 };
  };
  const proj = (p: V3, R: number, cx: number, cy: number) => {
    const f = 3.4;
    const s = f / (f + p.z * 1.4);
    return { x: cx + p.x * R * s, y: cy + p.y * R * s, s };
  };

  const ellipse = (ring: (typeof rings)[number], R: number, cx: number, cy: number, stroke: string, lw: number) => {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lw;
    ctx.beginPath();
    for (let i = 0; i <= 72; i++) {
      const a = (i / 72) * Math.PI * 2;
      const px = { x: Math.cos(a) * ring.r, y: 0, z: Math.sin(a) * ring.r };
      const q = rot({ x: px.x * Math.cos(ring.roll) - px.y * Math.sin(ring.roll), y: px.x * Math.sin(ring.roll) + px.y * Math.cos(ring.roll), z: px.z }, ring.tilt, 0);
      const s = proj(rot(q, tiltX, rotY), R, cx, cy);
      if (i === 0) ctx.moveTo(s.x, s.y);
      else ctx.lineTo(s.x, s.y);
    }
    ctx.stroke();
  };
  const ringPoint = (ring: (typeof rings)[number], a: number): V3 => {
    const px = { x: Math.cos(a) * ring.r, y: 0, z: Math.sin(a) * ring.r };
    return { x: px.x * Math.cos(ring.roll) - px.y * Math.sin(ring.roll), y: px.x * Math.sin(ring.roll) + px.y * Math.cos(ring.roll), z: px.z };
  };

  const frame = () => {
    const R = Math.min(w, h) * 0.19;
    const cx = w / 2, cy = h / 2;
    const active = opts.getActive();
    ctx.clearRect(0, 0, w, h);

    // orbit rings
    rings.forEach((rg) => {
      ellipse(rg, R, cx, cy, `rgba(255,255,255,${rg.alpha})`, 1);
    });

    // ambient dust
    dust.forEach((d, i) => {
      const a = t * d.v + i;
      const p = proj(rot({ x: d.p.x * 2.1, y: d.p.y * 1.7, z: d.p.z * 2.1 }, tiltX, rotY + a * 0.05), R, cx, cy);
      ctx.fillStyle = `rgba(255,255,255,${(0.10 + 0.10 * (0.5 + 0.5 * Math.sin(t + i))).toFixed(3)})`;
      ctx.fillRect(p.x, p.y, d.s, d.s);
    });

    // core particle sphere
    sphere.forEach((p, i) => {
      const q = proj(rot(p, tiltX * 0.6, rotY * 1.4), R * 0.62, cx, cy);
      const front = (p.z * 0.5 + 0.5);
      const tw = 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7);
      const lime = i % 5 === 0;
      ctx.fillStyle = lime
        ? `rgba(200,255,61,${(0.25 + front * 0.6 * tw).toFixed(3)})`
        : `rgba(180,190,220,${(0.08 + front * 0.4 * tw).toFixed(3)})`;
      const sz = (lime ? 2 : 1.3) * q.s;
      ctx.beginPath();
      ctx.arc(q.x, q.y, sz, 0, Math.PI * 2);
      ctx.fill();
    });

    // energy ribbon (lime orbit)
    const rib = { r: 1.05, tilt: 0.5, roll: 0.0, speed: 0, nodes: 0, alpha: 0 };
    ctx.strokeStyle = "rgba(200,255,61,0.10)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    for (let i = 0; i <= 90; i++) {
      const a = (i / 90) * Math.PI * 2;
      const s = proj(rot(ringPoint({ ...rib, r: 1.05 }, a), tiltX, rotY * 0.5), R, cx, cy);
      if (i === 0) ctx.moveTo(s.x, s.y); else ctx.lineTo(s.x, s.y);
    }
    ctx.stroke();
    ctx.strokeStyle = "rgba(200,255,61,0.75)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    for (let k = 0; k < 6; k++) {
      const a = t * 0.9 + (k / 6) * Math.PI * 2;
      const s = proj(rot(ringPoint({ ...rib, r: 1.05 }, a), tiltX, rotY * 0.5), R, cx, cy);
      ctx.fillStyle = "#c8ff3d";
      ctx.beginPath();
      ctx.arc(s.x, s.y, 2.2 * s.s, 0, Math.PI * 2);
      ctx.fill();
    }

    // glass core
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.05);
    grad.addColorStop(0, "rgba(8,11,19,0.92)");
    grad.addColorStop(0.55, active ? "rgba(30,36,20,0.88)" : "rgba(12,16,28,0.88)");
    grad.addColorStop(0.8, "rgba(139,123,255,0.10)");
    grad.addColorStop(1, "rgba(139,123,255,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.05, 0, Math.PI * 2);
    ctx.fill();
    if (active) {
      const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.8);
      g2.addColorStop(0, "rgba(200,255,61,0.14)");
      g2.addColorStop(1, "rgba(200,255,61,0)");
      ctx.fillStyle = g2;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
    // rotating rim arc
    ctx.strokeStyle = active ? "rgba(200,255,61,0.9)" : "rgba(200,255,61,0.45)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.92, t * 0.7, t * 0.7 + Math.PI * 1.2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.92, 0, Math.PI * 2);
    ctx.stroke();

    // ring nodes (brighten periodically)
    rings.forEach((rg, ri) => {
      for (let k = 0; k < rg.nodes; k++) {
        const a = t * rg.speed * 3 + (k / rg.nodes) * Math.PI * 2 + ri;
        const s = proj(rot(ringPoint(rg, a), tiltX, rotY), R, cx, cy);
        const hot = 0.5 + 0.5 * Math.sin(t * 1.4 + ri * 2 + k * 3);
        ctx.fillStyle = `rgba(200,255,61,${(0.35 + hot * 0.65).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, (2 + hot * 2.4) * s.s, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    if (!reduced) {
      rotY += 0.0035;
      tiltX += ((0.42 + opts.mouse.y * 0.3) - tiltX) * 0.04;
      tiltY += ((opts.mouse.x * 0.5) - tiltY) * 0.04;
      rotY += tiltY * 0.002;
      t += 0.016;
    }
  };

  const loop = () => {
    raf = requestAnimationFrame(loop);
    if (!visible || document.hidden) return;
    frame();
  };
  if (reduced) { resize(); frame(); }
  else loop();
  return () => { cancelAnimationFrame(raf); obs.disconnect(); window.removeEventListener("resize", resize); };
}

/* ================= component ================= */
const PATHS: Record<CoreKey, string> = {
  agents: "M14,20 C28,24 36,34 45,44",
  automation: "M86,18 C72,24 64,34 55,44",
  idea: "M14,78 C28,74 36,64 45,56",
  products: "M86,80 C72,76 64,66 55,56",
  data: "M50,9 C50,20 50,30 50,40",
};

export default function AiCore({ active, onActive }: { active: CoreKey | null; onActive: (k: CoreKey | null) => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const activeRef = useRef(active);
  activeRef.current = active;
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const upd = () => setMobile(mq.matches);
    upd();
    mq.addEventListener("change", upd);
    return () => mq.removeEventListener("change", upd);
  }, []);

  useEffect(() => {
    if (!canvas.current) return;
    return Engine(canvas.current, { density: mobile ? 40 : 95, getActive: () => activeRef.current !== null, mouse: mouse.current });
  }, [mobile]);

  const onMove = (e: MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouse.current = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 };
  };

  const drift = (e: RPointerEvent<HTMLButtonElement>) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    e.currentTarget.style.transform = `translate(${(dx * 0.08).toFixed(1)}px, ${(dy * 0.12).toFixed(1)}px)`;
  };
  const undrift = (el: HTMLButtonElement) => { el.style.transform = ""; };

  const pos: Record<CoreKey, string> = {
    agents: "left-0 top-4 lg:top-8",
    automation: "right-0 top-0 lg:top-4",
    idea: "left-0 bottom-2 lg:bottom-10",
    products: "right-0 bottom-0 lg:bottom-6",
    data: "left-1/2 -translate-x-1/2 -top-1",
  };

  return (
    <div onPointerMove={onMove} className="relative h-[460px] sm:h-[540px] lg:h-[600px]" aria-label="Forge AI core visualization" role="img">
      <canvas ref={canvas} className="absolute inset-0 w-full h-full" aria-hidden />
      {/* connection lines */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full hidden lg:block pointer-events-none" aria-hidden>
        {(Object.keys(PATHS) as CoreKey[]).map((k) => {
          const on = active === k;
          return (
            <g key={k}>
              <path d={PATHS[k]} fill="none" stroke={on ? "#c8ff3d" : "rgba(255,255,255,0.16)"} strokeWidth={on ? 0.5 : 0.3} vectorEffect="non-scaling-stroke" style={{ transition: "stroke 0.3s" }} />
              <circle r="1.4" fill={on ? "#c8ff3d" : "rgba(200,255,61,0.5)"}>
                <animateMotion dur={on ? "1.2s" : "3s"} repeatCount="indefinite" path={PATHS[k]} />
              </circle>
            </g>
          );
        })}
      </svg>
      {/* center label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="font-display font-bold text-xl tracking-tight">FORGE<span className="text-[#c8ff3d]">//</span></p>
          <div className="mt-1 h-6 font-mono2 text-[11px] tracking-[0.25em] text-[#c8ff3d]">
            <AnimatePresence mode="wait">
              <motion.span key={active ?? "idle"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="block">
                {active ? CORE_STATE[active] : "BUILD · AUTOMATE · SHIP"}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* capability cards */}
      {CARDS.map((c) => {
        const on = active === c.id;
        const compact = c.id === "data";
        return (
          <div key={c.id} className={`absolute ${pos[c.id]} ${compact ? "hidden sm:block" : ""}`}>
            <button
              onClick={() => onActive(on ? null : c.id)}
              onMouseEnter={() => onActive(c.id)}
              onMouseLeave={(e) => { onActive(null); undrift(e.currentTarget); }}
              onPointerMove={drift}
              onFocus={() => onActive(c.id)}
              onBlur={() => onActive(null)}
              aria-expanded={on}
              className={`group w-40 sm:w-44 rounded-2xl border backdrop-blur-md p-3.5 text-left transition-all duration-300 active:scale-[0.97] ${
                on ? "border-[#c8ff3d]/70 bg-[#0a0e17]/90 shadow-[0_0_36px_-8px_rgba(200,255,61,0.55)] scale-[1.04]" : "border-white/12 bg-[#0a0e17]/70 hover:border-white/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`transition-transform duration-300 group-hover:scale-110 ${on ? "text-[#c8ff3d]" : "text-white/70"}`}>
                  <c.icon size={15} />
                </span>
                <span className="font-mono2 text-[10px] font-bold tracking-widest">{c.title}</span>
                <span className={`ml-auto w-1.5 h-1.5 rounded-full ${on ? "bg-[#c8ff3d]" : "bg-white/25"}`} />
              </div>
              <div className={`grid transition-all duration-300 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <ul className="mt-2 space-y-0.5 text-[12px] text-[#9aa4b2]">
                    {c.lines.map((l) => <li key={l}>· {l}</li>)}
                  </ul>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#c6cdd8]">{c.detail}</p>
                </div>
              </div>
              {!on && (
                <ul className="mt-1.5 space-y-0.5 text-[12px] text-[#9aa4b2]">
                  {c.lines.slice(0, compact ? 3 : 2).map((l) => <li key={l}>· {l}</li>)}
                </ul>
              )}
            </button>
          </div>
        );
      })}
      {/* micro labels */}
      <p className="absolute top-1/2 -left-1 font-mono2 text-[10px] tracking-[0.2em] text-white/30 hidden xl:block" style={{ writingMode: "vertical-rl" }} aria-hidden>IDEAS → SYSTEMS</p>
      <p className="absolute top-1/2 -right-1 font-mono2 text-[10px] tracking-[0.2em] text-white/30 hidden xl:block" style={{ writingMode: "vertical-rl" }} aria-hidden>→ REAL IMPACT</p>
      <p className="absolute -bottom-1 left-1/2 -translate-x-1/2 font-mono2 text-[10px] tracking-[0.25em] text-white/35 whitespace-nowrap" aria-hidden>ONE BUILDER · GLOBAL POSSIBILITIES</p>
    </div>
  );
}
