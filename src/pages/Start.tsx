import Independent from "../components/Independent";
import Process from "../components/Process";
import { FinalCTA } from "../components/Closing";
import { PageShell } from "../fx/fx";
import { PageHeader } from "./shared";

export default function StartPage() {
  return (
    <PageShell tone="plain">
      <PageHeader
        eyebrow="Start a project"
        title={<>Bring the idea. <span className="text-[#c8ff3d]">Keep it rough.</span></>}
        sub="One direct line to the person who will design, build and ship it. Here's how it runs, then tell me what outcome you want."
      />
      <Independent />
      <Process />
      <FinalCTA />
    </PageShell>
  );
}
