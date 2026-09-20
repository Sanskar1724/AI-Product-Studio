import Services from "../components/Services";
import ArchitectureVisualizer from "../components/ArchitectureVisualizer";
import Solutions from "../components/Solutions";
import { PageHeader } from "./shared";

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={<>What can you get <span className="text-[#c8ff3d]">built for you?</span></>}
        sub="Five disciplines, one builder. Explore capabilities, inspect the architectures they'd run on, and see who each track serves."
      />
      <Services />
      <ArchitectureVisualizer />
      <Solutions />
    </>
  );
}
