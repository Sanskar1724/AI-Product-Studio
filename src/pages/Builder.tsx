import ProductBuilder from "../components/ProductBuilder";
import Estimator from "../components/Estimator";
import { PageHeader } from "./shared";

export default function BuilderPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product builder"
        title={<>Configure it. <span className="text-[#c8ff3d]">Blueprint it.</span></>}
        sub="Two working mini-apps: generate an architecture blueprint from your idea, then estimate the shape and stages of the project."
      />
      <ProductBuilder />
      <Estimator />
    </>
  );
}
