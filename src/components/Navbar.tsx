import { useEffect, useState, type PointerEvent } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./ui";
import { StatusDot } from "../fx/fx";
import CommandPalette from "./CommandPalette";

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Builder", href: "/builder" },
  { label: "Automation", href: "/automation" },
  { label: "AI Lab", href: "/lab" },
  { label: "Work", href: "/work" },
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
      <div className={`mx-auto transition-all duration-500 ${scrolled ? "max-w-5xl px-3 pt-3" : "max-w-7xl px-4 sm:px-6 pt-4"}`}>
        <nav
          aria-label="Primary"
          className={`flex items-center justify-between gap-2 rounded-2xl border transition-all duration-500 ${
            scrolled
              ? "border-white/10 bg-[#05070d]/80 backdrop-blur-xl px-4 py-2.5 shadow-2xl"
              : "border-transparent bg-transparent px-2 py-3"
          }`}
        >
          <Link to="/" aria-label="Forge home"><Logo compact={scrolled} /></Link>
          <div className="hidden lg:flex items-center gap-1 text-sm">
            {LINKS.map((l) => (
              <NavLink
                key={l.href}
                to={l.href}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-full transition-colors ${isActive ? "text-[#c8ff3d]" : "text-[#c6cdd8] hover:text-white hover:bg-white/5"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-[#c8ff3d]/10 border border-[#c8ff3d]/25"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <span className="hidden xl:block" data-tip="Interface status — demos run locally">
              <StatusDot label="AI Online" />
            </span>
            <CommandPalette />
            <Link
              to="/start"
              onPointerMove={(e: PointerEvent<HTMLAnchorElement>) => {
                if (window.matchMedia("(hover: none)").matches) return;
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.12).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * 0.18).toFixed(1)}px)`;
              }}
              onPointerLeave={(e) => { e.currentTarget.style.transform = ""; }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#c8ff3d] text-black text-sm font-semibold px-5 py-2.5 hover:shadow-[0_0_32px_-6px_rgba(200,255,61,0.7)] transition-shadow"
            >
              Start a Project <ArrowUpRight size={16} />
            </Link>
          </div>
          <button
            className="lg:hidden p-2 rounded-lg border border-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        {open && (
          <div className="lg:hidden mt-2 rounded-2xl border border-white/10 bg-[#0a0e17]/95 backdrop-blur-xl p-3">
            <Link to="/" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-[15px] hover:bg-white/5">Home</Link>
            {LINKS.map((l) => (
              <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-[15px] hover:bg-white/5">
                {l.label}
              </Link>
            ))}
            <Link
              to="/start"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#c8ff3d] text-black font-semibold px-4 py-3"
            >
              Start a Project <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
