import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { GithubIcon } from "./ui";
import { PROJECTS } from "../data/studio";
import { Reveal, SectionHeading } from "./ui";

export default function BuiltTested() {
  const [open, setOpen] = useState<string | null>(null);
  const active = PROJECTS.find((p) => p.name === open);

  return (
    <section id="work" className="py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Built & tested"
          title={<>Proof, not <span className="text-[#c8ff3d]">promises.</span></>}
          sub="Selected public builds. Every card links to the real repository — read the code before you believe the site."
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={(i % 4) * 0.06}>
              <button
                onClick={() => setOpen(p.name)}
                className="w-full text-left rounded-3xl card-border p-6 h-full hover:border-[#c8ff3d]/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                <span className="inline-block rounded-full border border-white/12 px-3 py-1 text-[11px] font-mono2 text-[#c8ff3d]">{p.tag}</span>
                <h3 className="font-display text-lg font-bold mt-3 group-hover:text-[#c8ff3d] transition-colors">{p.name}</h3>
                <p className="mt-2 text-sm text-[#9aa4b2] leading-relaxed line-clamp-3">{p.problem}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-white/80">Open case study →</span>
              </button>
            </Reveal>
          ))}
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
              onClick={() => setOpen(null)}
              role="dialog"
              aria-modal="true"
              aria-label={`${active.name} case study`}
            >
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl rounded-3xl border border-white/12 bg-[#0a0e17] p-6 sm:p-10 max-h-[85vh] overflow-y-auto"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="rounded-full bg-[#c8ff3d]/10 border border-[#c8ff3d]/30 px-3 py-1 text-[11px] font-mono2 text-[#c8ff3d]">{active.tag}</span>
                    <h3 className="font-display text-3xl font-bold mt-3">{active.name}</h3>
                  </div>
                  <button onClick={() => setOpen(null)} aria-label="Close" className="p-2 rounded-full border border-white/10 hover:border-white/40">
                    <X size={18} />
                  </button>
                </div>
                <div className="mt-6 space-y-4 text-[15px] leading-relaxed">
                  <div><p className="font-mono2 text-[11px] tracking-widest text-red-400/90">PROBLEM</p><p className="mt-1 text-[#c6cdd8]">{active.problem}</p></div>
                  <div><p className="font-mono2 text-[11px] tracking-widest text-[#c8ff3d]">SOLUTION</p><p className="mt-1 text-[#c6cdd8]">{active.solution}</p></div>
                  <div>
                    <p className="font-mono2 text-[11px] tracking-widest text-[#9aa4b2]">STACK</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {active.tech.map((t) => (
                        <span key={t} className="rounded-full border border-white/12 px-3 py-1 text-xs font-mono2">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={active.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#c8ff3d] text-black text-sm font-bold px-6 py-3">
                    <GithubIcon size={16} /> Repository
                  </a>
                  {active.demo && (
                    <a href={active.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 text-sm font-semibold px-6 py-3 hover:border-[#c8ff3d]/60 hover:text-[#c8ff3d]">
                      <ExternalLink size={15} /> Live demo
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
