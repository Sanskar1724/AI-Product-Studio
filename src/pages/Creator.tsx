import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, Brain, Bot, Database, Code2, ShieldCheck, Package,
  FileText, ExternalLink, GraduationCap,
} from "lucide-react";
import { CODE_PROFILES, CREATOR, CREATOR_BUILDS, CREATOR_CAPS, CERTS, CERTS_FOLDER, EDUCATION_JOURNEY, HF_MODEL, HF_PROFILE, HF_SPACES, PHILOSOPHY, SIGNALS, SOCIALS, STACK_GROUPS } from "../data/creator";
import { LINKEDIN_URL } from "../data/studio";
import { Reveal, SectionHeading } from "../components/ui";
import { AmbientParticles, Aurora, CountUp, PageShell, StatusDot, Tilt } from "../fx/fx";
import { PageHeader } from "./shared";

const CAP_ICONS: Record<string, typeof Brain> = {
  brain: Brain, bot: Bot, database: Database, code: Code2, shield: ShieldCheck, package: Package,
};

function IdentityCard() {
  return (
    <Tilt max={6} className="relative">
      <div className="relative rounded-3xl g-border p-7 sm:p-8 overflow-hidden bg-[#0a0e17]/90">
        <AmbientParticles density={22} color="200,255,61" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <p className="font-display font-bold text-lg">FORGE<span className="text-[#c8ff3d]">//</span></p>
            <StatusDot label="builder active" />
          </div>
          <p className="mt-6 font-mono2 text-[11px] tracking-[0.3em] text-[#9aa4b2]">BUILT BY</p>
          <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-1">SANSKAR</p>
          <div className="mt-6 grid grid-cols-2 gap-2">
            {["AI", "AGENTS", "DATA", "SOFTWARE"].map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.12 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 font-mono2 text-xs font-bold tracking-[0.2em] flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8ff3d] animate-pulse" /> {t}
              </motion.div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 font-mono2 text-[11px] text-white/40">
            <GraduationCap size={14} /> B.Tech CSE · MIT Academy of Engineering
          </div>
        </div>
        <div className="orbit-ring" aria-hidden />
      </div>
    </Tilt>
  );
}

export default function Creator() {
  const [openBuild, setOpenBuild] = useState<string | null>(null);

  return (
    <PageShell tone="ai">
      <PageHeader
        eyebrow="Creator"
        title={<>THE BUILDER <span className="text-[#c8ff3d]">BEHIND FORGE</span></>}
        sub="Independent AI builder focused on turning ideas into intelligent products, systems, and experiments."
      />

      {/* 1. hero */}
      <section className="relative py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Reveal>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Sanskar Chandawar</h2>
              <p className="mt-3 font-mono2 text-xs tracking-[0.2em] text-[#c8ff3d]">INDEPENDENT AI BUILDER</p>
              <p className="mt-1 font-mono2 text-xs tracking-[0.2em] text-[#9aa4b2]">AI / LLMs / AGENTS / DATA / SOFTWARE</p>
              <p className="mt-5 text-[#9aa4b2] leading-relaxed max-w-xl">{CREATOR.intro}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={CREATOR.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-black text-sm font-bold px-6 py-3 hover:bg-[#c8ff3d] transition-colors active:scale-95"
                >
                  <FileText size={15} /> View Resume
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#c8ff3d] text-black text-sm font-bold px-6 py-3 hover:shadow-[0_0_36px_-6px_rgba(200,255,61,0.7)] transition-all active:scale-95"
                >
                  Connect <ArrowUpRight size={15} />
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <IdentityCard />
          </Reveal>
        </div>
      </section>

      {/* 2. about */}
      <section className="py-16 sm:py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10">
          <div>
            <SectionHeading
              eyebrow="Profile"
              title={<>BUILDING TO LEARN.<br />LEARNING TO <span className="text-[#c8ff3d]">BUILD.</span></>}
              sub="I work at the intersection of AI engineering, software development, and data systems. My projects range from LLM agents and fine-tuning experiments to AI-powered applications, payment safety systems, and scalable data pipelines."
            />
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-3xl card-border p-6 sm:p-8">
              <p className="font-mono2 text-[11px] tracking-[0.25em] text-[#c8ff3d]">EDUCATION JOURNEY</p>
              <div className="mt-4 space-y-0">
                {EDUCATION_JOURNEY.map((e, i) => (
                  <div key={e.title} className="flex gap-4">
                    <div className="flex flex-col items-center" aria-hidden>
                      <span className={`w-2.5 h-2.5 rounded-full mt-1 ${i === 0 ? "bg-[#c8ff3d]" : "bg-white/25"}`} />
                      {i < EDUCATION_JOURNEY.length - 1 && <span className="w-px flex-1 min-h-[24px] bg-white/12" />}
                    </div>
                    <div className="pb-5">
                      <p className="font-mono2 text-xs text-[#9aa4b2]">{e.period}</p>
                      <h3 className={`font-display font-bold mt-0.5 ${i === 0 ? "text-xl" : "text-base text-[#c6cdd8]"}`}>{e.title}</h3>
                      <p className="text-sm text-[#9aa4b2] mt-0.5">{e.place}</p>
                      {i === 0 && (
                        <p className="mt-2.5 inline-block rounded-full border border-[#c8ff3d]/30 bg-[#c8ff3d]/[0.06] px-3.5 py-1.5 font-mono2 text-xs">
                          CGPA <span className="text-[#c8ff3d] font-bold">{CREATOR.education.cgpa}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <blockquote className="mt-2 border-l-2 border-[#c8ff3d]/60 pl-4 text-sm text-[#9aa4b2] italic leading-relaxed">
                "{PHILOSOPHY}"
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. capabilities */}
      <section className="py-16 sm:py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Focus" title={<>WHAT I <span className="text-[#c8ff3d]">WORK ON</span></>} />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CREATOR_CAPS.map((c, i) => {
              const Icon = CAP_ICONS[c.icon] ?? Brain;
              return (
                <Reveal key={c.title} delay={(i % 3) * 0.07}>
                  <Tilt max={5} className="h-full">
                    <article className="spot group rounded-3xl card-border p-6 h-full hover:border-[#c8ff3d]/40 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-[#c8ff3d]/10 border border-[#c8ff3d]/20 flex items-center justify-center text-[#c8ff3d] group-hover:scale-110 transition-transform">
                        <Icon size={18} />
                      </div>
                      <h3 className="font-mono2 text-sm font-bold tracking-widest mt-4">{c.title}</h3>
                      <p className="mt-2 text-sm text-[#9aa4b2] leading-relaxed">{c.desc}</p>
                    </article>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. selected builds */}
      <section className="py-16 sm:py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Selected builds"
            title={<>SELECTED <span className="text-[#c8ff3d]">BUILDS</span></>}
            sub="Systems I've built to explore real-world applications of AI and software."
          />
          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {CREATOR_BUILDS.map((b, i) => {
              const open = openBuild === b.no;
              return (
                <Reveal key={b.no} delay={(i % 2) * 0.08}>
                  <article className={`rounded-3xl card-border p-6 sm:p-7 h-full transition-colors ${open ? "border-[#c8ff3d]/40" : "hover:border-white/20"}`}>
                    <div className="flex items-center gap-3">
                      <span className="font-mono2 text-xs text-[#c8ff3d]">PROJECT {b.no}</span>
                      <button
                        onClick={() => setOpenBuild(open ? null : b.no)}
                        aria-expanded={open}
                        className="ml-auto font-mono2 text-[11px] text-white/40 hover:text-[#c8ff3d] transition-colors"
                      >
                        {open ? "collapse −" : "expand +"}
                      </button>
                    </div>
                    <h3 className="font-display text-2xl font-bold mt-2">{b.name}</h3>
                    <p className="text-sm text-[#8b7bff] font-mono2 mt-0.5">{b.tagline}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {b.tech.map((t) => (
                        <span key={t} className="rounded-full border border-white/10 px-2.5 py-1 font-mono2 text-[11px] text-[#c6cdd8]">{t}</span>
                      ))}
                    </div>
                    <AnimatePresence initial={false}>
                      {(open || i < 2) && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden text-sm text-[#9aa4b2] leading-relaxed"
                        >
                          <span className="block pt-4">{b.desc}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <a
                      href={b.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold hover:border-[#c8ff3d]/60 hover:text-[#c8ff3d] transition-colors"
                    >
                      VIEW ON GITHUB <ArrowUpRight size={15} />
                    </a>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. stack */}
      <section className="py-16 sm:py-20 border-t border-white/5 relative overflow-hidden">
        <Aurora blobs={[["#8b7bff", "80%", "10%", 380, 0.08]]} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Stack" title={<>TOOLS I <span className="text-[#c8ff3d]">BUILD WITH</span></>} sub="Hover any tool for its group — every item is used in public work." />
          <div className="mt-10 space-y-5">
            {STACK_GROUPS.map((g, gi) => (
              <Reveal key={g.name} delay={gi * 0.04}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.015] p-5">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-mono2 text-xs font-bold tracking-[0.2em] text-[#c8ff3d]">{g.name.toUpperCase()}</h3>
                    <span className="text-xs text-[#9aa4b2]">{g.purpose}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {g.items.map((t) => (
                      <span
                        key={t}
                        data-tip={`${g.name} · ${g.purpose}`}
                        className="rounded-full border border-white/10 px-3.5 py-1.5 text-[13px] text-[#c6cdd8] hover:border-[#c8ff3d]/60 hover:text-white hover:-translate-y-0.5 transition-all cursor-default"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5b. certifications (sourced from portfolio) */}
      <section className="py-16 sm:py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end gap-4">
            <SectionHeading eyebrow="Credentials" title={<>PROFESSIONAL <span className="text-[#c8ff3d]">CERTIFICATIONS</span></>} sub="Industry-recognized certifications across AI, cybersecurity and programming." />
            <Reveal delay={0.15} className="ml-auto">
              <a href={CERTS_FOLDER} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#c8ff3d] hover:gap-3 transition-all">
                View all certificates <ArrowUpRight size={15} />
              </a>
            </Reveal>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTS.map((c, i) => (
              <Reveal key={c.name} delay={(i % 3) * 0.06}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-[#c8ff3d]/40 hover:-translate-y-0.5 transition-all h-full">
                  <p className="font-mono2 text-[11px] tracking-[0.18em] text-[#8b7bff]">{c.issuer.toUpperCase()}</p>
                  <h3 className="font-display font-bold mt-1.5 leading-snug">{c.name}</h3>
                  <p className="mt-1 text-[13px] text-[#9aa4b2]">{c.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5c. hugging face (public profile) */}
      <section className="py-16 sm:py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Open models" title={<>ON <span className="text-[#c8ff3d]">HUGGING FACE</span></>} sub="Public model and Spaces under EquilStable — linked live, not screenshots." />
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            <Reveal>
              <a href={HF_MODEL} target="_blank" rel="noreferrer" className="spot group block rounded-3xl card-border p-6 h-full hover:border-[#c8ff3d]/40 transition-colors">
                <p className="font-mono2 text-[11px] tracking-[0.2em] text-[#c8ff3d]">MODEL · TEXT GENERATION</p>
                <h3 className="font-display text-xl font-bold mt-2 group-hover:text-[#c8ff3d] transition-colors">EquilStable/MEETME</h3>
                <p className="mt-2 text-sm text-[#9aa4b2]">The fine-tuned personal twin — published weights, open to inspect.</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80">Open model <ArrowUpRight size={14} /></span>
              </a>
            </Reveal>
            {HF_SPACES.map((s, i) => (
              <Reveal key={s.name} delay={(i + 1) * 0.07}>
                <a href={s.url} target="_blank" rel="noreferrer" className="spot group block rounded-3xl card-border p-6 h-full hover:border-[#c8ff3d]/40 transition-colors">
                  <p className="font-mono2 text-[11px] tracking-[0.2em] text-[#8b7bff]">SPACE · {s.desc.toUpperCase()}</p>
                  <h3 className="font-display text-xl font-bold mt-2 group-hover:text-[#c8ff3d] transition-colors">{s.name}</h3>
                  <p className="mt-2 text-sm text-[#9aa4b2]">Live demo running on Hugging Face Spaces.</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80">Try it live <ArrowUpRight size={14} /></span>
                </a>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-sm">
            <a href={HF_PROFILE} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-[#c8ff3d] hover:gap-3 transition-all">
              Full HF profile — EquilStable <ArrowUpRight size={15} />
            </a>
          </p>
        </div>
      </section>

      {/* 6. signals */}
      <section className="py-16 sm:py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Proof" title={<>BUILDING IN <span className="text-[#c8ff3d]">PUBLIC</span></>} sub="Figures from my resume — clean technical metrics, not marketing." />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SIGNALS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="rounded-2xl card-border px-5 py-6 text-center hover:border-[#c8ff3d]/30 transition-colors">
                  <p className="font-display text-4xl font-bold"><CountUp to={s.value} suffix={s.suffix} /></p>
                  <p className="mt-2 font-mono2 text-[10px] tracking-[0.18em] text-[#9aa4b2]">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. coding profiles */}
      <section className="py-16 sm:py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Practice" title={<>WHERE I BUILD <span className="text-[#c8ff3d]">AND LEARN</span></>} />
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {CODE_PROFILES.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <Tilt max={5} className="h-full">
                  <article className="spot rounded-3xl card-border p-6 sm:p-7 h-full flex flex-col hover:border-[#c8ff3d]/35 transition-colors">
                    <p className="font-mono2 text-xs font-bold tracking-[0.2em] text-[#c8ff3d]">{p.name}</p>
                    <p className="mt-2 font-display text-lg font-bold break-all">{p.username}</p>
                    <ul className="mt-4 space-y-1.5 flex-1">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-2 text-sm text-[#9aa4b2]">
                          <span className="w-1 h-1 rounded-full bg-[#c8ff3d]" /> {pt}
                        </li>
                      ))}
                    </ul>
                    <a href={p.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#c8ff3d] transition-colors">
                      {p.cta} <ArrowUpRight size={15} />
                    </a>
                  </article>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. socials */}
      <section className="py-16 sm:py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Elsewhere" title={<>FIND ME AROUND <span className="text-[#c8ff3d]">THE WEB</span></>} />
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {SOCIALS.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 0.06}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 hover:border-[#c8ff3d]/50 hover:-translate-y-0.5 transition-all"
                >
                  <span className="flex-1 min-w-0">
                    <span className="block font-mono2 text-xs font-bold tracking-widest">{s.name}</span>
                    <span className="block text-xs text-[#9aa4b2] truncate mt-0.5">{s.desc} · {s.handle}</span>
                  </span>
                  <ExternalLink size={15} className="text-white/30 group-hover:text-[#c8ff3d] shrink-0 transition-colors" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. resume */}
      <section className="py-16 sm:py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="rounded-3xl g-border p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[#c8ff3d]/10 border border-[#c8ff3d]/25 flex items-center justify-center text-[#c8ff3d] shrink-0">
                <FileText size={24} />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl sm:text-3xl font-bold">RESUME</h2>
                <p className="mt-1 text-[#9aa4b2]">Education, technical skills, projects and experience.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={CREATOR.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#c8ff3d] text-black text-sm font-bold px-6 py-3 active:scale-95 transition-transform">
                  VIEW RESUME <ArrowUpRight size={15} />
                </a>
                <a href={CREATOR.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 text-sm font-semibold px-6 py-3 hover:border-[#c8ff3d]/60 hover:text-[#c8ff3d] transition-colors">
                  OPEN IN NEW TAB <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. connect */}
      <section className="relative py-20 sm:py-24 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden />
        <AmbientParticles density={30} color="200,255,61" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-balance">BUILD SOMETHING WITH ME.</h2>
            <p className="mt-4 text-[#9aa4b2] leading-relaxed max-w-2xl mx-auto">
              Have an idea, technical problem, research direction, or product you want to explore? I'm always interested in
              building useful systems, experimenting with AI, and turning interesting ideas into working software.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/start" className="inline-flex items-center gap-2 rounded-full bg-[#c8ff3d] text-black text-sm font-bold px-7 py-3.5 hover:shadow-[0_0_40px_-6px_rgba(200,255,61,0.7)] transition-all active:scale-95">
                START A PROJECT <ArrowUpRight size={16} />
              </Link>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 text-sm font-semibold px-7 py-3.5 hover:border-[#c8ff3d]/60 hover:text-[#c8ff3d] transition-colors">
                CONNECT WITH ME <ArrowUpRight size={16} />
              </a>
              <Link to="/work" className="inline-flex items-center gap-2 rounded-full border border-white/15 text-sm font-semibold px-7 py-3.5 hover:border-white/40 transition-colors">
                VIEW MY WORK →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
