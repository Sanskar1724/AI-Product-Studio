import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { PROJECTS } from "../data/studio";
import { GithubIcon, Reveal, SectionHeading } from "./ui";

const FEATURED = PROJECTS.filter((p) => p.image);

export default function FeaturedWork() {
  return (
    <section className="py-16 sm:py-20 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end gap-4">
          <SectionHeading eyebrow="Featured work" title={<>Real products, <span className="text-[#c8ff3d]">real code.</span></>} />
          <Link to="/work" className="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-[#c8ff3d] hover:gap-3 transition-all">
            All builds <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {FEATURED.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article className="rounded-3xl card-border overflow-hidden h-full flex flex-col hover:border-[#c8ff3d]/40 transition-colors">
                <a href={p.demo ?? p.repo} target="_blank" rel="noreferrer" aria-label={`Open ${p.name}`}>
                  <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" className="w-full aspect-[16/10] object-cover object-top border-b border-white/8 bg-white" />
                </a>
                <div className="p-6 flex flex-col flex-1">
                  <span className="font-mono2 text-[11px] text-[#c8ff3d]">{p.tag}</span>
                  <h3 className="font-display text-xl font-bold mt-2">{p.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-white">{p.result}</p>
                  <p className="mt-2 text-sm text-[#9aa4b2] leading-relaxed flex-1">{p.problem}</p>
                  <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
                    <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#c8ff3d] transition-colors">
                      <GithubIcon size={15} /> Code
                    </a>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#c8ff3d] transition-colors">
                        <ExternalLink size={15} /> {p.demoLabel ?? "Live demo"}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
