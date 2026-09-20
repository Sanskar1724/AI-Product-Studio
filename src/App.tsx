import { Suspense, lazy, useCallback } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import RouteSeo from "./components/RouteSeo";
import { Footer } from "./components/Closing";
import { Cursor, ToastHost, useAnimatedFavicon, useKonami, useToast } from "./fx/fx";

const Home = lazy(() => import("./pages/Home"));
const ServicesPage = lazy(() => import("./pages/Services"));
const BuilderPage = lazy(() => import("./pages/Builder"));
const AutomationPage = lazy(() => import("./pages/Automation"));
const LabPage = lazy(() => import("./pages/Lab"));
const WorkPage = lazy(() => import("./pages/Work"));
const StartPage = lazy(() => import("./pages/Start"));
const Creator = lazy(() => import("./pages/Creator"));

function Fallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" aria-label="Loading">
      <div className="w-full max-w-md px-8 space-y-3">
        <div className="skeleton h-8 rounded-xl" />
        <div className="skeleton h-24 rounded-2xl" />
        <p className="font-mono2 text-xs text-[#9aa4b2] text-center pt-2">loading studio…</p>
      </div>
    </div>
  );
}

function Shell() {
  const loc = useLocation();
  const toast = useToast();
  useAnimatedFavicon();
  const fire = useCallback(() => toast("Forge mode engaged — you found the easter egg"), [toast]);
  useKonami(fire);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { damping: 28, stiffness: 220 });

  return (
    <div className="grain min-h-screen bg-[#05070d] text-white antialiased">
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-[#c8ff3d] z-[95] origin-left shadow-[0_0_12px_rgba(200,255,61,0.8)]" style={{ scaleX: progress }} aria-hidden />
      <Cursor />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[#c8ff3d] focus:text-black focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-bold">
        Skip to content
      </a>
      <ScrollToTop />
      <RouteSeo />
      <Navbar />
      <main id="main">
        <Suspense fallback={<Fallback />}>
          <div key={loc.pathname} className="page-in">
            <Routes location={loc}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/builder" element={<BuilderPage />} />
              <Route path="/automation" element={<AutomationPage />} />
              <Route path="/lab" element={<LabPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/start" element={<StartPage />} />
            <Route path="/creator" element={<Creator />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ToastHost>
      <Shell />
    </ToastHost>
  );
}
