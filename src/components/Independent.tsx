import { Reveal, SectionHeading } from "./ui";

const ROWS = ["Strategy", "Design", "Engineering", "AI", "Deployment"];

export default function Independent() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <SectionHeading
          eyebrow="Independent studio"
          title={<>Independent <span className="text-[#c8ff3d]">by design.</span></>}
          sub="You work directly with the person designing, building and shipping your product. One brain holds the whole system — nothing gets lost between handoffs."
        />
        <Reveal delay={0.1}>
          <div className="rounded-3xl card-border p-6 sm:p-8">
            <p className="font-mono2 text-[11px] tracking-[0.2em] text-[#9aa4b2] text-center">YOU ↓ PRODUCT</p>
            <ol className="mt-5 space-y-2">
              <li className="rounded-xl bg-white text-black font-display font-bold text-center py-3">YOU — idea, problem, workflow</li>
              {ROWS.map((r, i) => (
                <Reveal key={r} delay={i * 0.06}>
                  <li className="rounded-xl border border-white/10 bg-white/[0.03] py-3 text-center text-sm font-mono2 text-[#c6cdd8]">
                    {r}
                    <span className="block text-[10px] text-white/30 mt-0.5">same creator ↓</span>
                  </li>
                </Reveal>
              ))}
              <li className="rounded-xl bg-[#c8ff3d] text-black font-display font-bold text-center py-3">PRODUCT — live + documented</li>
            </ol>
            <p className="mt-5 text-sm text-[#9aa4b2] text-center">Direct communication. Direct development. Direct execution.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
