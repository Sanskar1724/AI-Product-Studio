import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AUDIENCES } from "../data/studio";
import { Reveal, SectionHeading } from "./ui";

export default function AudienceSelector() {
  const [id, setId] = useState(AUDIENCES[2].id);
  const a = AUDIENCES.find((x) => x.id === id)!;

  return (
    <section className="relative py-20 sm:py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Start here"
          title={<>What brings you here?</>}
          sub="Pick your situation — the studio reconfigures around you. No page reload."
        />
        <Reveal delay={0.1} className="mt-8">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Audiences">
            {AUDIENCES.map((x) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={x.id === id}
                onClick={() => setId(x.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold border transition-all duration-300 ${
                  x.id === id
                    ? "bg-[#c8ff3d] text-black border-[#c8ff3d]"
                    : "border-white/12 text-[#c6cdd8] hover:border-white/30 hover:text-white"
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="mt-6 rounded-3xl card-border p-6 sm:p-10 min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center"
            >
              <div>
                <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-balance">{a.headline}</h3>
                <p className="mt-3 text-[#9aa4b2] leading-relaxed max-w-xl">{a.copy}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {a.picks.map((p) => (
                    <span key={p} className="rounded-full border border-[#c8ff3d]/30 bg-[#c8ff3d]/[0.06] px-3.5 py-1.5 text-xs font-semibold text-white">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex lg:justify-end">
                <Link
                  to={a.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#c8ff3d] text-black font-bold px-7 py-3.5 hover:shadow-[0_0_40px_-6px_rgba(200,255,61,0.7)] hover:-translate-y-0.5 transition-all"
                >
                  {a.cta}
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
