import { Sparkles, Layers, Workflow, Code2, Database, FlaskConical, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SERVICES } from "../data/studio";
import { Reveal, SectionHeading } from "./ui";
import { Tilt } from "../fx/fx";

const ICONS: Record<string, typeof Sparkles> = {
  sparkles: Sparkles,
  layers: Layers,
  workflow: Workflow,
  code: Code2,
  database: Database,
  flask: FlaskConical,
};

export default function Services({ bare = false }: { bare?: boolean }) {
  return (
    <section id="build" className="relative py-20 sm:py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {!bare && (
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What I build"
            title={<>What can you get built <span className="text-[#c8ff3d]">for you?</span></>}
            sub="Six build tracks. Every one ships as working software — not slides."
          />
          <Reveal delay={0.2}>
            <Link to="/builder" className="inline-flex items-center gap-2 text-sm font-semibold text-[#c8ff3d] hover:gap-3 transition-all">
              Try the Product Builder <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
        )}
        {bare && (
          <Reveal>
            <p className="font-display text-xl font-bold">Six tracks. Pick the one that matches your problem.</p>
          </Reveal>
        )}

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Sparkles;
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.08}>
                <Tilt max={5} className="h-full">
                <article data-tip="Click a CTA to start this track" className="spot group relative rounded-3xl card-border p-7 h-full overflow-hidden hover:border-[#c8ff3d]/30 transition-colors duration-300">
                  <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#c8ff3d]/0 group-hover:bg-[#c8ff3d]/[0.06] blur-2xl transition-all duration-500" aria-hidden />
                  <div className="w-11 h-11 rounded-xl bg-[#c8ff3d]/10 border border-[#c8ff3d]/20 flex items-center justify-center text-[#c8ff3d]">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-xl font-bold mt-5">{s.title}</h3>
                  <p className="mt-2 text-[15px] text-[#9aa4b2] leading-relaxed">{s.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-[#c6cdd8]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c8ff3d]" aria-hidden /> {p}
                      </li>
                    ))}
                  </ul>
                  <Link to="/start" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-[#c8ff3d] transition-colors">
                    {s.cta} <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </article>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
