import Process from "../components/Process";
import { FinalCTA } from "../components/Closing";
import { PageShell } from "../fx/fx";
import { Reveal } from "../components/ui";
import { PageHeader } from "./shared";

export default function StartPage() {
  return (
    <PageShell tone="plain">
      <PageHeader
        eyebrow="Start a project"
        title={<>Bring the idea. <span className="text-[#c8ff3d]">Keep it rough.</span></>}
        sub="One direct line to the person who will design, build and ship it. Here's how it runs, then tell me what outcome you want."
      />
      <Process />
      <FinalCTA />
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <div className="rounded-3xl card-border p-6 sm:p-8 text-center">
              <p className="font-mono2 text-[11px] tracking-[0.25em] text-[#9aa4b2]">OR CONNECT DIRECTLY</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                <a
                  href="https://www.linkedin.com/in/sanskar-chandawar/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/12 px-5 py-2.5 text-sm font-semibold text-[#c6cdd8] hover:border-[#c8ff3d]/60 hover:text-[#c8ff3d] transition-colors"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://x.com/Sanskar_learner"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/12 px-5 py-2.5 text-sm font-semibold text-[#c6cdd8] hover:border-[#c8ff3d]/60 hover:text-[#c8ff3d] transition-colors"
                >
                  𝕏 Twitter ↗
                </a>
                <a
                  href="mailto:sanskarchandawar3@gmail.com"
                  className="rounded-full border border-white/12 px-5 py-2.5 text-sm font-semibold text-[#c6cdd8] hover:border-[#c8ff3d]/60 hover:text-[#c8ff3d] transition-colors"
                >
                  Email ↗
                </a>
              </div>
              <p className="mt-3 font-mono2 text-[11px] text-white/35">Typically replies within a couple of days.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
