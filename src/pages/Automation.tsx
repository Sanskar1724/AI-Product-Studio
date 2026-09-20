import AutomationVisualizer from "../components/AutomationVisualizer";
import BeforeAfter from "../components/BeforeAfter";
import LiveDemo from "../components/LiveDemo";
import { PageShell } from "../fx/fx";
import { PageHeader } from "./shared";

export default function AutomationPage() {
  return (
    <PageShell tone="auto">
      <PageHeader
        eyebrow="Automation"
        title={<>Boring work, <span className="text-[#c8ff3d]">handled by systems.</span></>}
        sub="Try the support-AI triage sim, watch workflow patterns run, then drag the line to feel the before and after."
      />
      <LiveDemo bare />
      <AutomationVisualizer />
      <BeforeAfter />
    </PageShell>
  );
}
