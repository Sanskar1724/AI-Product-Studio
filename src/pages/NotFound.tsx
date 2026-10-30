import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "../fx/fx";
import { PageHeader } from "./shared";

const LINKS = [["Built & Tested", "/work"], ["AI Lab", "/lab"], ["Services", "/services"]];

export default function NotFound() {
  return (
    <PageShell tone="ai">
      <PageHeader
        eyebrow="404"
        title={<>Nothing forged <span className="text-[#c8ff3d]">here yet.</span></>}
        sub="This page doesn't exist. It may have moved, or the link may be mistyped."
      />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-wrap gap-3">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-[#c8ff3d] text-black text-sm font-bold px-7 py-3.5 hover:shadow-[0_0_40px_-6px_rgba(200,255,61,0.7)] transition-all active:scale-95">
            Back to home <ArrowUpRight size={16} />
          </Link>
          {LINKS.map(([label, href]) => (
            <Link key={href} to={href} className="inline-flex items-center gap-2 rounded-full border border-white/15 text-sm font-semibold px-7 py-3.5 hover:border-[#c8ff3d]/60 hover:text-[#c8ff3d] transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
