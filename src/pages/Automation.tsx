import AutomationVisualizer from "../components/AutomationVisualizer";
import BeforeAfter from "../components/BeforeAfter";
import { PageHeader } from "./shared";

export default function AutomationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Automation"
        title={<>Boring work, <span className="text-[#c8ff3d]">handled by systems.</span></>}
        sub="Watch real workflow patterns run — then drag the line to feel the before and after."
      />
      <AutomationVisualizer />
      <BeforeAfter />
    </>
  );
}
