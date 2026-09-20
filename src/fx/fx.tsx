import { createContext, useCallback, useContext, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

export function isCoarse() {
  return typeof window !== "undefined" && window.matchMedia?.("(hover: none), (pointer: coarse)").matches;
}
export function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/* ---------- custom cursor dot + spotlight wash ---------- */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const wash = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCoarse() || prefersReduced()) return;
    let x = -100, y = -100, raf = 0;
    const move = (e: globalThis.PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x - 3}px,${y - 3}px)`;
      wash.current?.style.setProperty("--cx", `${x}px`);
      wash.current?.style.setProperty("--cy", `${y}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);

  if (isCoarse()) return null;
  return (
    <>
      <div ref={wash} className="cursor-wash" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}

/* ---------- 3D tilt wrapper ---------- */
export function Tilt({ children, className = "", max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: PointerEvent) => {
    const el = ref.current;
    if (!el || isCoarse() || prefersReduced()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-3px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  const onSpot = (e: PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onPointerMove={(e) => { onMove(e); onSpot(e); }} onPointerLeave={reset} className={`tilt ${className}`}>
      {children}
    </div>
  );
}

/* ---------- animated counter (real numbers only) ---------- */
export function CountUp({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (prefersReduced()) { setN(to); return; }
    let raf = 0; const t0 = performance.now();
    const el = ref.current;
    let started = false;
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting && !started) { started = true; tick(t0); } }),
      { threshold: 0.4 }
    );
    if (el) obs.observe(el);
    const tick = (t: number) => {
      const p = Math.min(1, (performance.now() - t) / duration);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(() => tick(t));
    };
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ---------- typewriter ---------- */
export function Typewriter({ lines, speed = 26, className = "" }: { lines: string[]; speed?: number; className?: string }) {
  const [out, setOut] = useState<string[]>([""]);
  useEffect(() => {
    if (prefersReduced()) { setOut(lines); return; }
    let li = 0, ci = 0, timer = 0;
    const step = () => {
      const cur = lines[li];
      ci++;
      setOut([...lines.slice(0, li), cur.slice(0, ci)]);
      if (ci >= cur.length) {
        li++;
        if (li >= lines.length) return;
        ci = 0;
        timer = window.setTimeout(step, 420);
      } else {
        timer = window.setTimeout(step, speed);
      }
    };
    timer = window.setTimeout(step, 500);
    return () => window.clearTimeout(timer);
  }, [lines, speed]);
  return (
    <span className={className}>
      {out.map((l, i) => (
        <span key={i} className="block">{l}{i === out.length - 1 && <span className="term-caret" />}</span>
      ))}
    </span>
  );
}

/* ---------- status indicator ---------- */
export function StatusDot({ color = "#c8ff3d", label, pulse = true }: { color?: string; label: string; pulse?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono2 text-[11px] tracking-widest uppercase" style={{ color }}>
      <span className={pulse ? "status-dot inline-block w-2 h-2 rounded-full" : "inline-block w-2 h-2 rounded-full"} style={{ background: color, color }} />
      <span className="text-[#c6cdd8]">{label}</span>
    </span>
  );
}

/* ---------- toasts ---------- */
interface Toast { id: number; msg: string; }
const ToastCtx = createContext<(msg: string) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastHost({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const push = useCallback((msg: string) => {
    const id = Date.now() + Math.random();
    setItems((p) => [...p, { id, msg }]);
    window.setTimeout(() => setItems((p) => p.filter((t) => t.id !== id)), 2800);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] flex flex-col items-center gap-2" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className="toast-in rounded-full border border-[#c8ff3d]/40 bg-[#0a0e17]/95 px-5 py-2.5 text-sm font-semibold shadow-2xl">
            <span className="text-[#c8ff3d] mr-2">✓</span>{t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/* ---------- konami easter egg ---------- */
export function useKonami(onFire: () => void) {
  useEffect(() => {
    const seq = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      i = k === seq[i] ? i + 1 : k === seq[0] ? 1 : 0;
      if (i === seq.length) { i = 0; onFire(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onFire]);
}

/* ---------- animated favicon (pulse core) ---------- */
export function useAnimatedFavicon() {
  useEffect(() => {
    if (prefersReduced()) return;
    const link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) return;
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let t = 0; const id = window.setInterval(() => {
      if (document.hidden) return;
      t += 0.25;
      ctx.fillStyle = "#05070d";
      ctx.beginPath();
      ctx.roundRect(0, 0, 64, 64, 14);
      ctx.fill();
      ctx.strokeStyle = "#C8FF3D";
      ctx.lineWidth = 4;
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath(); ctx.moveTo(20, 44); ctx.lineTo(32, 12); ctx.lineTo(44, 44); ctx.stroke();
      const r = 4.5 + Math.sin(t) * 1.6;
      ctx.fillStyle = "#C8FF3D";
      ctx.beginPath(); ctx.arc(32, 34, r, 0, Math.PI * 2); ctx.fill();
      link.href = c.toDataURL();
    }, 240);
    return () => window.clearInterval(id);
  }, []);
}

/* ---------- ambient particles ---------- */
export function AmbientParticles({ density = 40, color = "200,255,61" }: { density?: number; color?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || prefersReduced()) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0, raf = 0, t = 0, visible = true;
    const ps = Array.from({ length: density }, () => ({
      x: Math.random(), y: Math.random(), s: Math.random() * 1.6 + 0.4, v: Math.random() * 0.0006 + 0.0002, o: Math.random() * Math.PI * 2,
    }));
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = canvas.width = Math.min(r.width, 1200);
      h = canvas.height = Math.min(r.height, 600);
    };
    resize();
    window.addEventListener("resize", resize);
    const obs = new IntersectionObserver((es) => { visible = es[0].isIntersecting; });
    obs.observe(canvas);
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      t += 0.01;
      ctx.clearRect(0, 0, w, h);
      ps.forEach((p) => {
        p.y -= p.v;
        if (p.y < 0) p.y = 1;
        const tw = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(t * 2 + p.o));
        ctx.fillStyle = `rgba(${color},${tw.toFixed(3)})`;
        ctx.fillRect(p.x * w + Math.sin(t + p.o) * 10, p.y * h, p.s, p.s);
      });
    };
    draw();
    return () => { cancelAnimationFrame(raf); obs.disconnect(); window.removeEventListener("resize", resize); };
  }, [density, color]);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />;
}

/* ---------- aurora wash ---------- */
export function Aurora({ blobs = [["#c8ff3d", "8%", "4%", 420, 0.07], ["#8b7bff", "75%", "60%", 480, 0.09]] as [string, string, string, number, number][] }) {
  if (prefersReduced()) return null;
  return (
    <div className="aurora" aria-hidden>
      {blobs.map(([c, l, t, s, o], i) => (
        <span key={i} style={{ background: c, left: l, top: t, width: s, height: s, opacity: o, animationDelay: `${i * 3}s` }} />
      ))}
    </div>
  );
}

/* ---------- page personality shell ---------- */
const TONES = { ai: "bg-ai", sw: "bg-sw", auto: "bg-auto", data: "bg-data", lab: "bg-lab", plain: "" } as const;
export function PageShell({ tone, children }: { tone: keyof typeof TONES; children: ReactNode }) {
  return <div className={`relative ${TONES[tone]}`}>{children}</div>;
}
