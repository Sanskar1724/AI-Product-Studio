import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "../components/Hero";
import AudienceSelector from "../components/AudienceSelector";
import CapabilitySystem from "../components/CapabilitySystem";
import { Reveal } from "../components/ui";
import { PageShell } from "../fx/fx";

export default function Home() {
  return (
    <PageShell tone="ai">
      <Hero />
      <AudienceSelector />
      <CapabilitySystem />
      <section className="py-12 sm:py-14 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="rounded-3xl g-border p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center gap-5">
              <div className="flex-1">
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">What should we build?</h2>
                <p className="mt-2 text-[#9aa4b2]">Configure your blueprint, estimate scope, or just bring the idea as it is.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/builder" className="group inline-flex items-center gap-2 rounded-full bg-[#c8ff3d] text-black text-sm font-bold px-6 py-3">
                  Open Product Builder <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/start" className="inline-flex items-center gap-2 rounded-full border border-white/15 text-sm font-semibold px-6 py-3 hover:border-[#c8ff3d]/60 hover:text-[#c8ff3d] transition-colors">
                  Start a Project →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
