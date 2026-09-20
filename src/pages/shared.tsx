import type { ReactNode } from "react";
import { Reveal } from "../components/ui";

export function PageHeader({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <div className="relative overflow-hidden pt-36 pb-12">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#c8ff3d]">{"//"} {eyebrow}</p>
          <h1 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance max-w-3xl">{title}</h1>
          {sub && <p className="mt-4 text-lg text-[#9aa4b2] max-w-2xl leading-relaxed">{sub}</p>}
        </Reveal>
      </div>
    </div>
  );
}
