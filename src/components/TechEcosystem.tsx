import { useState } from "react";
import { TECHS } from "../data/studio";
import { Reveal, SectionHeading } from "./ui";

export default function TechEcosystem() {
  const [hover, setHover] = useState<string | null>(null);
  const active = TECHS.find((t) => t.name === hover);

  return (
    <section className="py-24 border-t border-white/5 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Technology ecosystem"
          title={<>Orbiting around <span className="text-[#c8ff3d]">BUILD.</span></>}
          sub="Only stacks with public proof or declared capability. Hover any node for its role and where it shipped."
        />
        <Reveal delay={0.1} className="mt-10">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-stretch">
            <div className="relative rounded-3xl card-border min-h-[420px] flex items-center justify-center overflow-hidden p-8">
              <div className="absolute inset-0 grid-bg" aria-hidden />
              {[180, 260, 340].map((s) => (
                <div key={s} className="absolute rounded-full border border-white/8" style={{ width: s, height: s }} aria-hidden />
              ))}
              <div className="relative z-10 w-24 h-24 rounded-3xl bg-[#c8ff3d] text-black font-display font-bold flex items-center justify-center text-sm shadow-[0_0_60px_-10px_rgba(200,255,61,0.7)]">
                BUILD
              </div>
              {TECHS.map((t, i) => {
                const angle = ((t.orbit + i * (360 / TECHS.length)) * Math.PI) / 180;
                const r = 150 + (i % 3) * 42;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r * 0.72;
                const on = hover === t.name;
                return (
                  <button
                    key={t.name}
                    onMouseEnter={() => setHover(t.name)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(t.name)}
                    onBlur={() => setHover(null)}
                    onClick={() => setHover(t.name)}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className={`absolute z-10 rounded-full border px-3.5 py-1.5 text-xs font-mono2 transition-all duration-300 ${
                      on ? "border-[#c8ff3d] bg-[#c8ff3d] text-black font-bold scale-110" : "border-white/15 bg-[#0a0e17] text-[#c6cdd8] hover:border-white/40"
                    }`}
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>
            <div className="rounded-3xl border border-[#c8ff3d]/20 bg-[#0a0e17] p-8 flex flex-col justify-center min-h-[300px]" aria-live="polite">
              <p className="font-mono2 text-[11px] tracking-[0.2em] text-[#9aa4b2]">TECH // INSPECTOR</p>
              {active ? (
                <div key={active.name}>
                  <h3 className="font-display text-3xl font-bold mt-3">{active.name}</h3>
                  <p className="mt-2 text-[#c8ff3d] font-semibold text-sm">{active.role}</p>
                  <p className="mt-3 text-[#9aa4b2] text-sm leading-relaxed">Shipped / used in: {active.proof}</p>
                </div>
              ) : (
                <p className="mt-4 text-[#9aa4b2]">Hover a node — React to Docker, Qwen to Databricks — to see what it does here.</p>
              )}
              <div className="mt-6 flex flex-wrap gap-1.5">
                {["Python", "React", "PyTorch", "Spark", "PostgreSQL", "Docker"].map((s) => (
                  <span key={s} className="text-[11px] font-mono2 text-white/40">· {s}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
