import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Zap } from "lucide-react";
import { WORKFLOWS } from "../data/studio";
import { Reveal, SectionHeading } from "./ui";

export default function AutomationVisualizer() {
  const [id, setId] = useState(WORKFLOWS[0].id);
  const w = WORKFLOWS.find((x) => x.id === id)!;

  return (
    <section className="py-20 sm:py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Automation visualizer"
          title={<>Watch a workflow <span className="text-[#c8ff3d]">run itself.</span></>}
          sub="Pick a business workflow — trigger, AI, decision, action, database, result. The diagram rebuilds per workflow."
        />
        <Reveal delay={0.1} className="mt-8">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Workflows">
            {WORKFLOWS.map((x) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={x.id === id}
                onClick={() => setId(x.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold border transition-all ${
                  x.id === id ? "bg-[#c8ff3d] text-black border-[#c8ff3d]" : "border-white/12 text-[#c6cdd8] hover:border-white/30"
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15} className="mt-6">
          <div className="rounded-3xl card-border p-6 sm:p-10 overflow-x-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={w.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-stretch gap-2 min-w-[760px]"
              >
                <FlowNode title="TRIGGER" detail={w.trigger} accent={false} index={0} />
                {w.steps.map((s, i) => (
                  <FlowStep key={s.node} node={s.node} detail={s.detail} index={i + 1} />
                ))}
                <div className="flex items-center text-white/25 font-bold" aria-hidden>→</div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex-1 min-w-[180px] rounded-2xl bg-[#c8ff3d] text-black p-4"
                >
                  <p className="font-mono2 text-[10px] font-bold tracking-widest flex items-center gap-1.5"><Zap size={12} /> RESULT</p>
                  <p className="mt-1.5 text-sm font-semibold leading-snug">{w.result}</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FlowNode({ title, detail, accent, index }: { title: string; detail: string; accent: boolean; index: number }) {
  return (
    <>
      {index > 0 && <div className="flex items-center text-white/25 font-bold" aria-hidden>→</div>}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`w-40 shrink-0 rounded-2xl border p-4 ${accent ? "border-[#c8ff3d]/50 bg-[#c8ff3d]/[0.05]" : "border-white/10 bg-white/[0.02]"}`}
      >
        <p className={`font-mono2 text-[10px] font-bold tracking-widest ${accent ? "text-[#c8ff3d]" : "text-[#9aa4b2]"}`}>{title}</p>
        <p className="mt-1.5 text-[13px] text-[#c6cdd8] leading-snug">{detail}</p>
      </motion.div>
    </>
  );
}

function FlowStep({ node, detail, index }: { node: string; detail: string; index: number }) {
  const accent = node === "AI" || node === "DECISION";
  return <FlowNode title={node} detail={detail} accent={accent} index={index} />;
}
