import BuiltTested from "../components/BuiltTested";
import TechEcosystem from "../components/TechEcosystem";
import { PageHeader } from "./shared";

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Built & Tested"
        title={<>Proof, not <span className="text-[#c8ff3d]">promises.</span></>}
        sub="Selected public builds with problem, solution and stack. Open a case study, then read the actual code."
      />
      <BuiltTested />
      <TechEcosystem />
    </>
  );
}
