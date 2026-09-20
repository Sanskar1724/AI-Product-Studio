import ProductBuilder from "../components/ProductBuilder";
import Estimator from "../components/Estimator";
import { TerminalWindow } from "../components/LiveElements";
import { Reveal } from "../components/ui";
import { PageShell, StatusDot } from "../fx/fx";
import { PageHeader } from "./shared";

export default function BuilderPage() {
  return (
    <PageShell tone="sw">
      <PageHeader
        eyebrow="Product builder"
        title={<>Configure it. <span className="text-[#c8ff3d]">Blueprint it.</span></>}
        sub="Two working mini-apps: generate an architecture blueprint from your idea, then estimate the shape and stages of the project."
      />
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-center">
          <Reveal>
            <div className="flex items-center gap-3">
              <StatusDot label="AI online" />
              <StatusDot color="#5eead4" label="build ready" pulse={false} />
            </div>
            <p className="mt-3 text-[#9aa4b2] leading-relaxed">
              The configurator runs entirely in your browser — selections become architecture, stack and stages.
              Nothing is sent anywhere; the studio wires the real backend when we build together.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <TerminalWindow
              title="forge — blueprint.sh"
              lines={["$ forge blueprint --from selections", "✓ intent parsed · 8 capabilities", "✓ stack resolved · fastapi + react + pg", "✓ stages planned · prototype → mvp → deploy", "→ blueprint ready in the panel below"]}
            />
          </Reveal>
        </div>
      </section>
      <ProductBuilder bare />
      <Estimator />
    </PageShell>
  );
}
