import BuiltTested from "../components/BuiltTested";
import TechEcosystem from "../components/TechEcosystem";
import { CountUp, PageShell } from "../fx/fx";
import { EXPERIMENTS, PROJECTS, TECHS } from "../data/studio";
import { useGithubStats } from "../data/github";
import { PageHeader } from "./shared";
import { Reveal } from "../components/ui";

export default function WorkPage() {
  const github = useGithubStats();
  return (
    <PageShell tone="data">
      <PageHeader
        eyebrow="Built & Tested"
        title={<>Proof, not <span className="text-[#c8ff3d]">promises.</span></>}
        sub="Selected public builds with problem, solution and stack. Open a case study, then read the actual code."
      />
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <Reveal>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono2">
              {[
                [<CountUp key="a" to={github.repos} />, "public repos"],
                [<CountUp key="b" to={PROJECTS.length} />, "builds featured"],
                [<CountUp key="c" to={EXPERIMENTS.length} />, "lab experiments"],
                [<CountUp key="d" to={TECHS.length} />, "core technologies"],
              ].map(([v, l], i) => (
                <div key={i} className="rounded-2xl card-border px-5 py-4">
                  <dt className="order-2 mt-1 block text-[11px] tracking-widest text-[#9aa4b2] uppercase">{l}</dt>
                  <dd className="font-display text-3xl font-bold text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <p className="mt-3 font-mono2 text-[11px] text-white/35">Repository and star counts: {github.label}.</p>
        </div>
      </section>
      <BuiltTested bare />
      <TechEcosystem />
    </PageShell>
  );
}
