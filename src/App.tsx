import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CapabilitySystem from "./components/CapabilitySystem";
import Services from "./components/Services";
import ProductBuilder from "./components/ProductBuilder";
import Solutions from "./components/Solutions";
import AILab from "./components/AILab";
import LiveDemo from "./components/LiveDemo";
import Process from "./components/Process";
import BuiltTested from "./components/BuiltTested";
import TechEcosystem from "./components/TechEcosystem";
import Independent from "./components/Independent";
import Estimator from "./components/Estimator";
import { FinalCTA, Footer } from "./components/Closing";

export default function App() {
  return (
    <div className="min-h-screen bg-[#05070d] text-white antialiased">
      <a href="#build" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-[#c8ff3d] focus:text-black focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-bold">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <CapabilitySystem />
        <Services />
        <ProductBuilder />
        <Solutions />
        <AILab />
        <LiveDemo />
        <Process />
        <BuiltTested />
        <TechEcosystem />
        <Independent />
        <Estimator />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
