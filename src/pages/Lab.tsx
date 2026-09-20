import AILab from "../components/AILab";
import { PageHeader } from "./shared";

export default function LabPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Lab"
        title={<>Experiments, models and <span className="text-[#c8ff3d]">ideas in motion.</span></>}
        sub="Real work from public repositories — fine-tuning, agents, transformers and applied ML. Status and code links only, no fabricated metrics."
      />
      <AILab />
    </>
  );
}
