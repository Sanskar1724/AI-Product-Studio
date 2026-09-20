import Services from "../components/Services";
import ArchitectureVisualizer from "../components/ArchitectureVisualizer";
import Solutions from "../components/Solutions";
import { NeuralField } from "../components/LiveElements";
import { Reveal } from "../components/ui";
import { AmbientParticles, PageShell } from "../fx/fx";
import { PageHeader } from "./shared";

export default function ServicesPage() {
  return (
    <PageShell tone="ai">
      <PageHeader
        eyebrow="Services"
        title={<>What can you get <span className="text-[#c8ff3d]">built for you?</span></>}
        sub="Five disciplines, one creator. Probe the AI core, explore capabilities, inspect the architectures they'd run on."
      />
      <section className="relative py-10">
        <AmbientParticles density={30} color="139,123,255" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <NeuralField />
          </Reveal>
        </div>
      </section>
      <Services bare />
      <ArchitectureVisualizer />
      <Solutions />
    </PageShell>
  );
}
