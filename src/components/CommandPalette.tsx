import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Compass, FlaskConical, Hammer, Workflow, Wrench, Rocket, Home } from "lucide-react";

const ITEMS = [
  { label: "Home", hint: "Living hero + audience", href: "/", icon: Home },
  { label: "Explore Services", hint: "Capability explorer + architectures", href: "/services", icon: Compass },
  { label: "Build a Product", hint: "Blueprint configurator + scope tool", href: "/builder", icon: Hammer },
  { label: "Automation", hint: "Workflow visualizer + before/after", href: "/automation", icon: Workflow },
  { label: "AI Lab", hint: "Experiments and fine-tuning", href: "/lab", icon: FlaskConical },
  { label: "Built & Tested", hint: "Real projects, case studies", href: "/work", icon: Wrench },
  { label: "Start a Project", hint: "Intake + contact", href: "/start", icon: Rocket },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = ITEMS.filter(
    (i) => i.label.toLowerCase().includes(query.toLowerCase()) || i.hint.toLowerCase().includes(query.toLowerCase())
  );

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    nav(href);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-1.5 text-xs font-mono2 text-[#9aa4b2] hover:border-white/30 hover:text-white transition-colors"
        aria-label="Open command palette"
      >
        <span className="text-white/50">⌘K</span> explore…
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm p-4 flex items-start justify-center pt-[12vh]"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <motion.div
              initial={{ y: -16, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-white/12 bg-[#0a0e17] overflow-hidden shadow-2xl"
            >
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && results[0]) go(results[0].href);
                }}
                placeholder="Type a command — services, lab, builder…"
                className="w-full bg-transparent px-5 py-4 text-[15px] outline-none placeholder:text-white/25 border-b border-white/8"
                aria-label="Search pages"
              />
              <ul className="max-h-[320px] overflow-y-auto p-2">
                {results.map((r) => (
                  <li key={r.href}>
                    <button
                      onClick={() => go(r.href)}
                      className="w-full flex items-center gap-3 rounded-xl px-3.5 py-3 text-left hover:bg-[#c8ff3d]/10 group"
                    >
                      <span className="text-[#c8ff3d]"><r.icon size={17} /></span>
                      <span>
                        <span className="block text-sm font-semibold">{r.label}</span>
                        <span className="block text-xs text-[#9aa4b2]">{r.hint}</span>
                      </span>
                      <span className="ml-auto font-mono2 text-[11px] text-white/30 group-hover:text-[#c8ff3d]">↵</span>
                    </button>
                  </li>
                ))}
                {results.length === 0 && (
                  <li className="px-4 py-6 text-sm text-[#9aa4b2] text-center">No match — try “lab”, “builder”, “work”…</li>
                )}
              </ul>
              <p className="px-5 py-2.5 border-t border-white/8 font-mono2 text-[11px] text-white/30">ctrl/⌘ K to toggle · esc to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
