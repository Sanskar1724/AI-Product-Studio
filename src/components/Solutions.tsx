import { Rocket, Store, GraduationCap, FlaskConical, Code2, Settings } from "lucide-react";
import { SOLUTIONS } from "../data/studio";
import { Reveal, SectionHeading } from "./ui";

const ICONS: Record<string, typeof Rocket> = {
  rocket: Rocket, store: Store, grad: GraduationCap, flask: FlaskConical, code: Code2, gear: Settings,
};

export default function Solutions() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Solutions"
          title={<>Built for how <span className="text-[#c8ff3d]">you</span> work.</>}
          sub="Different starting points, same outcome: working software you can use and explain."
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOLUTIONS.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Rocket;
            return (
              <Reveal key={s.for} delay={(i % 3) * 0.07}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-white/20 transition-colors h-full">
                  <div className="flex items-center gap-3">
                    <span className="text-[#c8ff3d]"><Icon size={19} /></span>
                    <h3 className="font-display font-bold text-lg">For {s.for}</h3>
                  </div>
                  <p className="mt-3 text-[15px] text-[#9aa4b2] leading-relaxed">{s.what}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
