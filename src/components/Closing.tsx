import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Copy, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, STUDIO_REPO } from "../data/studio";
import { Logo, Reveal } from "./ui";
import { Aurora, StatusDot, useToast } from "../fx/fx";

const NEEDS = ["I have an idea", "I have a business problem", "I need automation", "I want to add AI", "I'm exploring an idea"];

export function FinalCTA() {
  const [need, setNeed] = useState(NEEDS[0]);
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const toast = useToast();
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Project: ${need}`)}&body=${encodeURIComponent(msg || "Hi — here's what I want to build:\n\n")}`;

  const copyMail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast("Email copied — talk soon");
    } catch {
      toast(EMAIL);
    }
  };

  return (
    <section id="start" className="relative py-28 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-[#c8ff3d]/[0.08] blur-[120px] rounded-full" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <Reveal>
          <p className="font-mono2 text-[11px] tracking-[0.25em] text-[#c8ff3d] uppercase">{"//"} Final call</p>
          <h2 className="font-display mt-4 text-4xl sm:text-6xl font-bold tracking-tight text-balance">What should we build?</h2>
          <p className="mt-4 text-lg text-[#9aa4b2]">Bring an idea, a problem, or a workflow. Let's turn it into something useful.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {NEEDS.map((n) => (
              <button key={n} onClick={() => setNeed(n)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${need === n ? "bg-[#c8ff3d] text-black border-[#c8ff3d]" : "border-white/12 text-[#c6cdd8] hover:border-white/35"}`}>{n}</button>
            ))}
          </div>
          <div className="mt-6 rounded-3xl card-border p-4 sm:p-6 text-left">
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={3}
              placeholder="One paragraph: what should the product do? (opens in your email app — no data stored here)"
              className="w-full rounded-2xl bg-black/40 border border-white/10 p-4 text-[15px] placeholder:text-white/25 focus:border-[#c8ff3d]/60 outline-none resize-none" aria-label="Project description" />
            <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
              <a
                href={href}
                onClick={() => { setSent(true); window.setTimeout(() => setSent(false), 2600); }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c8ff3d] text-black font-bold px-8 py-3.5 hover:shadow-[0_0_40px_-6px_rgba(200,255,61,0.7)] hover:-translate-y-0.5 transition-all"
              >
                {sent ? "✓ Opening your email app…" : <>{`Start a Project`} <ArrowUpRight size={17} /></>}
              </a>
              <button onClick={copyMail} data-tip="Copy to clipboard" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold hover:border-[#c8ff3d]/60 hover:text-[#c8ff3d] transition-colors">
                <Copy size={15} /> {EMAIL}
              </button>
            </div>
            <p className="mt-3 text-xs text-[#9aa4b2]">Typically replies within a couple of days · no data stored here</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="relative border-t border-white/8 pt-10 pb-8 overflow-hidden">
      <Aurora blobs={[["#c8ff3d", "5%", "60%", 320, 0.05], ["#8b7bff", "85%", "20%", 360, 0.07]]} />
      {/* status strip */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-white/8 bg-black/30 px-5 py-3">
          <StatusDot label="AI online" />
          <StatusDot color="#5eead4" label="build ready" pulse={false} />
          <span className="font-mono2 text-[11px] tracking-widest text-[#9aa4b2] uppercase">Pune · {time || "--:--:--"}</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-tip="Back to top" className="ml-auto font-mono2 text-[11px] tracking-widest text-white/50 hover:text-[#c8ff3d] transition-colors uppercase">
            ↑ top
          </button>
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 mt-10">
        <div className="grid md:grid-cols-[1.2fr_1fr_1fr] gap-10">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-[#9aa4b2] max-w-sm leading-relaxed">
              Independent AI product studio. Ideas in, intelligent products out — AI, software, automation and data, from concept to deployment.
            </p>
            <p className="mt-3 text-xs font-mono2 text-white/40">Operated independently by Sanskar Chandawar · Pune, India</p>
          </div>
          <nav aria-label="Footer">
            <p className="font-mono2 text-[11px] tracking-[0.2em] text-[#9aa4b2]">STUDIO</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[["Services", "/services"], ["Builder", "/builder"], ["Automation", "/automation"], ["AI Lab", "/lab"], ["Built & Tested", "/work"], ["Start a Project", "/start"]].map(([l, h]) => (
                <li key={h}><Link to={h} className="text-[#c6cdd8] hover:text-[#c8ff3d] transition-colors">{l}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-mono2 text-[11px] tracking-[0.2em] text-[#9aa4b2]">ELSEWHERE</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href={GITHUB_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#c6cdd8] hover:text-[#c8ff3d]"><GithubIcon size={15} /> GitHub — Sanskar1724</a></li>
              <li><a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#c6cdd8] hover:text-[#c8ff3d]"><LinkedinIcon size={15} /> LinkedIn</a></li>
              <li><a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 text-[#c6cdd8] hover:text-[#c8ff3d]"><Mail size={15} /> {EMAIL}</a></li>
              <li>
                <a
                  href={STUDIO_REPO}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-2xl g-border px-4 py-3 font-semibold text-white hover:shadow-[0_0_32px_-8px_rgba(200,255,61,0.55)] hover:-translate-y-0.5 transition-all"
                >
                  <GithubIcon size={17} className="text-[#c8ff3d]" />
                  <span>
                    <span className="block text-sm">This site's repository</span>
                    <span className="block font-mono2 text-[11px] text-[#9aa4b2] group-hover:text-[#c8ff3d] transition-colors">React · TS · Tailwind — open source →</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/8 flex flex-col sm:flex-row gap-2 justify-between text-xs text-white/35 font-mono2">
          <span>© 2026 Forge // AI Product Studio. All systems operational.</span>
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            <span>⌘K / Ctrl+K to explore</span>
            <span>No clients invented · No metrics fabricated · Code is the proof.</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
