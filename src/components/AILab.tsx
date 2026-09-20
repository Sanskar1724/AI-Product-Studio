import { ArrowUpRight } from "lucide-react";
import { EXPERIMENTS } from "../data/studio";
import { Reveal, SectionHeading } from "./ui";

const STATUS = {
  active: { label: "Active", cls: "text-[#c8ff3d] border-[#c8ff3d]/40 bg-[#c8ff3d]/10" },
  shipped: { label: "Shipped", cls: "text-white border-white/20 bg-white/5" },
  exploring: { label: "Exploring", cls: "text-[#8b7bff] border-[#8b7bff]/40 bg-[#8b7bff]/10" },
} as const;

export default function AILab() {
  return (
    <section id="lab" className="py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#8b7bff]/[0.05] blur-[100px] rounded-full" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative">
        <SectionHeading
          eyebrow="AI Lab"
          title={<>Experiments, models and <span className="text-[#c8ff3d]">ideas in motion.</span></>}
          sub="Real work from public repositories — fine-tuning, agents, transformers and applied ML. No fabricated metrics; status and code links only."
        />
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXPERIMENTS.map((e, i) => {
            const st = STATUS[e.status];
            return (
              <Reveal key={e.no} delay={(i % 3) * 0.08}>
                <article className="rounded-3xl card-border p-6 h-full flex flex-col hover:border-[#c8ff3d]/25 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-mono2 text-xs text-[#9aa4b2]">{e.no}</span>
                    <span className={`rounded-full border px-3 py-1 text-[11px] font-bold ${st.cls}`}>{st.label}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold mt-4">{e.title}</h3>
                  <p className="mt-1 text-xs font-mono2 text-[#8b7bff]">{e.area} · {e.model}</p>
                  <p className="mt-3 text-sm text-[#9aa4b2] leading-relaxed flex-1">{e.objective}</p>
                  <a href={e.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#c8ff3d] transition-colors">
                    View code <ArrowUpRight size={15} />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
