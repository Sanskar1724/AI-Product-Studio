import { useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";

const BEFORE = ["Email threads", "Manual copy/paste", "Spreadsheet chaos", "Late reports", "Missed follow-ups"];
const AFTER = ["One customer view", "AI triage + drafts", "Live database", "Auto digests", "Never-missed alerts"];

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const track = useRef<HTMLDivElement>(null);

  const slide = (clientX: number) => {
    const el = track.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="py-20 sm:py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Before / After"
          title={<>Drag the line. <span className="text-[#c8ff3d]">Feel the difference.</span></>}
          sub="The same operations week — manual on the left, automated on the right."
        />
        <Reveal delay={0.1} className="mt-10">
          <div
            ref={track}
            role="slider"
            aria-label="Before after comparison"
            aria-valuenow={Math.round(pos)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
              if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
            }}
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              slide(e.clientX);
              const move = (ev: PointerEvent) => slide(ev.clientX);
              const up = () => {
                window.removeEventListener("pointermove", move);
                window.removeEventListener("pointerup", up);
              };
              window.addEventListener("pointermove", move);
              window.addEventListener("pointerup", up);
            }}
            className="relative rounded-3xl overflow-hidden border border-white/10 select-none touch-none cursor-ew-resize"
          >
            {/* BEFORE base */}
            <div className="bg-[#12090b] p-6 sm:p-10 min-h-[340px]">
              <p className="font-mono2 text-[11px] tracking-[0.25em] text-red-400/90">BEFORE — MANUAL</p>
              <ul className="mt-5 space-y-3 max-w-md">
                {BEFORE.map((b) => (
                  <li key={b} className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm text-[#9aa4b2]">✕ {b}</li>
                ))}
              </ul>
            </div>
            {/* AFTER overlay, revealed right of the handle */}
            <div
              className="absolute inset-0 bg-[#0a1210] p-6 sm:p-10"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
              aria-hidden={false}
            >
              <p className="font-mono2 text-[11px] tracking-[0.25em] text-[#c8ff3d]">AFTER — AUTOMATED</p>
              <ul className="mt-5 space-y-3 max-w-md">
                {AFTER.map((a) => (
                  <li key={a} className="rounded-xl border border-[#c8ff3d]/25 bg-[#0a1210] px-4 py-3 text-sm text-white">✓ {a}</li>
                ))}
              </ul>
            </div>
            {/* handle */}
            <div className="absolute inset-y-0 w-px bg-[#c8ff3d]/80" style={{ left: `${pos}%` }} aria-hidden />
            <div className="absolute inset-y-0 flex items-center" style={{ left: `calc(${pos}% - 22px)` }} aria-hidden>
              <div className="w-11 h-11 rounded-full bg-[#c8ff3d] text-black flex items-center justify-center shadow-[0_0_36px_-4px_rgba(200,255,61,0.8)]">
                <ChevronsLeftRight size={20} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
