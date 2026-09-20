import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./ui";

const LINKS = [
  { label: "Services", href: "#build" },
  { label: "AI Lab", href: "#lab" },
  { label: "Built & Tested", href: "#work" },
  { label: "How It Works", href: "#process" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div
        className={`mx-auto transition-all duration-500 ${
          scrolled ? "max-w-5xl px-3 pt-3" : "max-w-7xl px-4 sm:px-6 pt-4"
        }`}
      >
        <nav
          aria-label="Primary"
          className={`flex items-center justify-between rounded-2xl border transition-all duration-500 ${
            scrolled
              ? "border-white/10 bg-[#05070d]/80 backdrop-blur-xl px-4 py-2.5 shadow-2xl"
              : "border-transparent bg-transparent px-2 py-3"
          }`}
        >
          <Logo compact={scrolled} />
          <div className="hidden md:flex items-center gap-1 text-sm">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 rounded-full text-[#c6cdd8] hover:text-white hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="hidden md:block">
            <a
              href="#start"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#c8ff3d] text-black text-sm font-semibold px-5 py-2.5 hover:-translate-y-0.5 hover:shadow-[0_0_32px_-6px_rgba(200,255,61,0.7)] transition-all"
            >
              Start a Project <ArrowUpRight size={16} />
            </a>
          </div>
          <button
            className="md:hidden p-2 rounded-lg border border-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        {open && (
          <div className="md:hidden mt-2 rounded-2xl border border-white/10 bg-[#0a0e17]/95 backdrop-blur-xl p-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-[15px] hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#start"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#c8ff3d] text-black font-semibold px-4 py-3"
            >
              Start a Project <ArrowUpRight size={16} />
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
