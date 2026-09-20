import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { prefersReduced } from "../fx/fx";

const BEFORE = ["Email threads", "Manual copy/paste", "Spreadsheet chaos", "Late reports", "Missed follow-ups"];
const AFTER = ["One customer view", "AI triage + drafts", "Live database", "Auto digests", "Never-missed alerts"];

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [tour, setTour] = useState(false);
  const posRef = useRef(50);
  posRef.current = pos;

  useEffect(() => {
    if (!tour || prefersReduced()) return;
    let raf = 0;
    let dir = 1;
    const step = () => {
      raf = requestAnimationFrame(step);
      let p = posRef.current + dir * 0.6;
      if (p >= 94) { p = 94; dir = -1; }
      if (p <= 6) { p = 6; dir = 1; }
      setPos(p);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [tour]);

  const go = (v: number) => { setTour(false); setPos(v); };

  return (
    <section className="py-20 sm:py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Before / After"
          title={<>Same week. <span className="text-[#c8ff3d]">Two realities.</span></>}
          sub="Scrub the timeline, jump to either reality, or run the guided tour."
        />
        <Reveal delay={0.1} className="mt-8">
          {/* control deck */}
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
            <div className="flex rounded-full border border-white/10 p-1 gap-1" role="group" aria-label="View mode">
              {[["Manual", 50], ["Before", 4], ["After", 96]].map(([label, v]) => {
                const on = !tour && Math.abs(pos - (v as number)) < 3 && (label === "Manual" ? pos > 10 && pos < 90 : true);
                return (
                  <button
                    key={label as string}
                    onClick={() => go(v as number)}
                    aria-pressed={on}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${on ? "bg-[#c8ff3d] text-black" : "text-[#9aa4b2] hover:text-white"}`}
                  >
                    {label as string}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setTour((t) => !t)}
              aria-pressed={tour}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold transition-all ${tour ? "border-[#c8ff3d]/60 text-[#c8ff3d]" : "border-white/15 text-[#c6cdd8] hover:border-white/40"}`}
            >
              {tour ? <Pause size={13} /> : <Play size={13} />} {tour ? "Pause tour" : "Auto tour"}
            </button>
            <input
              type="range"
              min={4}
              max={96}
              value={Math.round(pos)}
              onChange={(e) => { setTour(false); setPos(Number(e.target.value)); }}
              aria-label="Scrub between manual and automated"
              className="flex-1 min-w-[140px] accent-[#c8ff3d] cursor-pointer"
            />
            <span className="font-mono2 text-[11px] text-[#9aa4b2] w-24 text-right" aria-live="polite">
              {Math.round(pos)}% automated
            </span>
          </div>

          {/* stage */}
          <div className="relative mt-4 rounded-3xl overflow-hidden border border-white/10">
            <div className="bg-[#12090b] p-6 sm:p-10 min-h-[340px]">
              <p className="font-mono2 text-[11px] tracking-[0.25em] text-red-400/90">BEFORE — MANUAL</p>
              <ul className="mt-5 space-y-3 max-w-md">
                {BEFORE.map((b, i) => (
                  <li
                    key={b}
                    className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm text-[#9aa4b2] transition-all duration-500"
                    style={{ opacity: pos > 20 + i * 12 ? 1 : 0.25 }}
                  >
                    ✕ {b}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="absolute inset-0 bg-[#0a1210] p-6 sm:p-10 transition-[clip-path] duration-150"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            >
              <p className="font-mono2 text-[11px] tracking-[0.25em] text-[#c8ff3d]">AFTER — AUTOMATED</p>
              <ul className="mt-5 space-y-3 max-w-md">
                {AFTER.map((a, i) => (
                  <li
                    key={a}
                    className="rounded-xl border border-[#c8ff3d]/25 bg-[#0a1210] px-4 py-3 text-sm text-white transition-all duration-500"
                    style={{ opacity: pos < 88 - i * 10 ? 0.2 : 1, transform: `translateX(${pos < 88 - i * 10 ? 12 : 0}px)` }}
                  >
                    ✓ {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute inset-y-0 w-px bg-[#c8ff3d]/70 transition-[left] duration-150" style={{ left: `${pos}%` }} aria-hidden />
          </div>
          <p className="mt-3 font-mono2 text-[11px] text-white/35 text-center">Rows light up as their reality takes over the frame.</p>
        </Reveal>
      </div>
    </section>
  );
}
