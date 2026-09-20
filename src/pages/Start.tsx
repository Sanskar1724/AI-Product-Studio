import Independent from "../components/Independent";
import { FinalCTA } from "../components/Closing";
import { PageHeader } from "./shared";

export default function StartPage() {
  return (
    <>
      <PageHeader
        eyebrow="Start a project"
        title={<>Bring the idea. <span className="text-[#c8ff3d]">Keep it rough.</span></>}
        sub="One direct line to the person who will design, build and ship it. Tell me what outcome you want."
      />
      <Independent />
      <FinalCTA />
    </>
  );
}
