import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { Footer } from "./components/Closing";

const Home = lazy(() => import("./pages/Home"));
const ServicesPage = lazy(() => import("./pages/Services"));
const BuilderPage = lazy(() => import("./pages/Builder"));
const AutomationPage = lazy(() => import("./pages/Automation"));
const LabPage = lazy(() => import("./pages/Lab"));
const WorkPage = lazy(() => import("./pages/Work"));
const StartPage = lazy(() => import("./pages/Start"));

function Fallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" aria-label="Loading">
      <div className="flex items-center gap-3 font-mono2 text-sm text-[#9aa4b2]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#c8ff3d] animate-ping" />
        loading studio…
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#05070d] text-white antialiased">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-[#c8ff3d] focus:text-black focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-bold">
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/automation" element={<AutomationPage />} />
            <Route path="/lab" element={<LabPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/start" element={<StartPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
