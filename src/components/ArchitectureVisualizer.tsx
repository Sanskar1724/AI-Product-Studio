import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ARCHITECTURES } from "../data/studio";
import { Reveal, SectionHeading } from "./ui";

export default function ArchitectureVisualizer() {
  const [id, setId] = useState(ARCHITECTURES[0].id);
  const arch = ARCHITECTURES.find((x) => x.id === id)!;

  return (
    <section className="py-20 sm:py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Architecture visualizer"
          title={<>Inspect the <span className="text-[#c8ff3d]">machine room.</span></>}
          sub="Select a product type — the stack diagram rewires itself. This is the shape your build would take."
        />
        <Reveal delay={0.1} className="mt-8">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Architectures">
            {ARCHITECTURES.map((x) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={x.id === id}
                onClick={() => setId(x.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold border transition-all ${
                  x.id === id ? "bg-white text-black border-white" : "border-white/12 text-[#c6cdd8] hover:border-white/30"
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15} className="mt-6">
          <div className="rounded-3xl card-border p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.ol
                key={arch.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="max-w-2xl mx-auto"
              >
                {arch.layers.map((l, i) => (
                  <li key={l.node}>
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={`flex items-center gap-4 rounded-2xl border px-5 py-4 ${
                        l.node === "AI" ? "border-[#c8ff3d]/50 bg-[#c8ff3d]/[0.05]" : "border-white/10 bg-white/[0.02]"
                      }`}
                    >
                      <span className={`font-mono2 text-xs font-bold w-24 shrink-0 ${l.node === "AI" ? "text-[#c8ff3d]" : "text-white"}`}>
                        {l.node}
                      </span>
                      <span className="text-sm text-[#9aa4b2]">{l.detail}</span>
                    </motion.div>
                    {i < arch.layers.length - 1 && (
                      <div className="flex justify-start pl-8 py-1" aria-hidden>
                        <motion.span
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: i * 0.08 + 0.05 }}
                          className="block w-px h-5 bg-gradient-to-b from-[#c8ff3d]/70 to-white/15 origin-top"
                        />
                      </div>
                    )}
                  </li>
                ))}
              </motion.ol>
            </AnimatePresence>
            <p className="mt-6 max-w-2xl mx-auto rounded-2xl border border-[#8b7bff]/30 bg-[#8b7bff]/[0.06] p-4 text-sm text-[#c6cdd8]">
              <span className="font-mono2 text-[11px] text-[#8b7bff] tracking-widest">DESIGN NOTE — </span>
              {arch.note}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
