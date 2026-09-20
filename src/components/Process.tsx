import { useEffect, useRef, useState } from "react";
import { PROCESS } from "../data/studio";
import { SectionHeading } from "./ui";

export default function Process() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));
      setActive(Math.min(PROCESS.length - 1, Math.floor(p * PROCESS.length)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="process" className="py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title={<>From idea to <span className="text-[#c8ff3d]">product.</span></>}
          sub="Seven stages, one direct line. Scroll — the active stage lights up as the path progresses."
        />
        <div ref={wrapRef} className="mt-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
          {/* progress rail */}
          <div className="relative hidden lg:block">
            <div className="sticky top-32">
              <svg viewBox="0 0 120 700" className="w-28 h-[560px]" aria-hidden>
                <line x1="60" y1="10" x2="60" y2="690" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <line
                  x1="60" y1="10" x2="60" y2="690"
                  stroke="#c8ff3d" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray="680"
                  strokeDashoffset={680 - (680 * (active + 1)) / PROCESS.length}
                  style={{ transition: "stroke-dashoffset 0.4s ease" }}
                />
                {PROCESS.map((s, i) => (
                  <g key={s.id}>
                    <circle cx="60" cy={40 + i * 90} r={i <= active ? 14 : 9} fill={i <= active ? "#c8ff3d" : "#0a0e17"} stroke={i <= active ? "#c8ff3d" : "rgba(255,255,255,0.25)"} strokeWidth="2" />
                    <text x="60" y={44 + i * 90} textAnchor="middle" fontSize="11" fontWeight="700" fill={i <= active ? "#000" : "#9aa4b2"}>{s.id}</text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
          {/* steps */}
          <ol className="space-y-4">
            {PROCESS.map((s, i) => {
              const on = i === active;
              return (
                <li
                  key={s.id}
                  className={`rounded-3xl border p-6 sm:p-8 transition-all duration-500 ${
                    on ? "border-[#c8ff3d]/50 bg-[#c8ff3d]/[0.04] shadow-[0_0_50px_-20px_rgba(200,255,61,0.4)]" : "border-white/8 bg-white/[0.015] opacity-70"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono2 text-sm font-bold ${on ? "text-[#c8ff3d]" : "text-[#9aa4b2]"}`}>{s.id}</span>
                    <h3 className="font-display text-2xl font-bold">{s.name}</h3>
                    {on && <span className="ml-auto rounded-full bg-[#c8ff3d] text-black text-[11px] font-bold px-3 py-1">ACTIVE</span>}
                  </div>
                  <p className="mt-3 text-[#9aa4b2] leading-relaxed">{s.desc}</p>
                  <p className="mt-3 font-mono2 text-xs text-white/70">▸ Delivers: {s.out}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
