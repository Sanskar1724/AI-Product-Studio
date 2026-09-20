import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Code2, Workflow, Database, FlaskConical } from "lucide-react";
import { CAPABILITIES, type CapabilityKey } from "../data/studio";
import { Reveal, SectionHeading } from "./ui";

const ICONS: Record<CapabilityKey, typeof Brain> = {
  ai: Brain,
  software: Code2,
  automation: Workflow,
  data: Database,
  research: FlaskConical,
};

export default function CapabilitySystem() {
  const [active, setActive] = useState<CapabilityKey>("ai");
  const cap = CAPABILITIES.find((c) => c.key === active)!;

  return (
    <section className="relative py-14 sm:py-16" id="capabilities">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Capability system"
          title={<>One builder. Five disciplines that combine.</>}
          sub="Select a discipline — the system reconfigures to show what gets built, and with what stack."
        />
        <Reveal delay={0.1} className="mt-10">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Capabilities">
            {CAPABILITIES.map((c) => {
              const Icon = ICONS[c.key];
              const on = c.key === active;
              return (
                <button
                  key={c.key}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(c.key)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold border transition-all duration-300 ${
                    on
                      ? "bg-[#c8ff3d] text-black border-[#c8ff3d]"
                      : "border-white/12 text-[#c6cdd8] hover:border-white/30 hover:text-white"
                  }`}
                >
                  <Icon size={16} /> {c.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-6 rounded-3xl card-border p-6 sm:p-10 min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={cap.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-mono2 text-xs tracking-[0.2em] text-[#c8ff3d] uppercase">{cap.label} // SYSTEM</p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2">{cap.tagline}</h3>
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cap.items.map((it, i) => (
                  <motion.div
                    key={it.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 hover:border-[#c8ff3d]/40 hover:bg-white/[0.04] transition-colors"
                  >
                    <p className="font-semibold">{it.name}</p>
                    <p className="mt-1.5 text-sm text-[#9aa4b2] leading-relaxed">{it.desc}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {cap.stack.map((s) => (
                  <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs font-mono2 text-[#c6cdd8]">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
