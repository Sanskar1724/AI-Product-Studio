import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import AiCore, { type CoreKey } from "./AiCore";
import { MagneticButton } from "./ui";
import { PROJECTS, TECHS } from "../data/studio";
import { useGithubStats } from "../data/github";
import { CountUp, Typewriter } from "../fx/fx";

const WORDS: { t: string; accent?: boolean }[] = [
  { t: "Ideas" }, { t: "in." }, { t: "Intelligent", accent: true }, { t: "products", accent: true }, { t: "out." },
];

export default function Hero() {
  const [core, setCore] = useState<CoreKey | null>(null);
  const github = useGithubStats();
  const { scrollYProgress } = useScroll();
  const fade = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const rise = useTransform(scrollYProgress, [0, 0.12], [0, -70]);

  const stats = [
    { value: github.repos, label: "public repos" },
    { value: github.stars, label: "GitHub stars" },
    { value: PROJECTS.length, label: "featured builds" },
    { value: PROJECTS.filter((p) => p.demo).length, label: "live demos" },
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-24">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="absolute top-0 left-1/3 w-[600px] h-[380px] bg-[#c8ff3d]/[0.05] blur-[130px] rounded-full" aria-hidden />

      <motion.div style={{ opacity: fade }} className="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center min-h-[70vh]">
        {/* left */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono2 text-[11px] text-[#c6cdd8]">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[#c8ff3d] opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-[#c8ff3d]" />
            </span>
            Open to projects
            <span className="text-white/25">·</span>
            <span className="text-white/50">Pune, India</span>
          </div>

          <h1 className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.98] tracking-tight" aria-label="Ideas in. Intelligent products out.">
            {WORDS.map((wd, i) => (
              <span key={i}>
                <motion.span
                  className={`inline-block mr-[0.24em] ${wd.accent ? "text-[#c8ff3d]" : ""}`}
                  initial={{ opacity: 0, y: 26, rotateX: 24 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.65, delay: 0.08 + i * 0.09, ease: [0.21, 0.65, 0.35, 1] }}
                >
                  {wd.t}
                </motion.span>
                {i === 1 && <br />}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-6 text-lg text-[#9aa4b2] max-w-xl leading-relaxed"
          >
            I build AI agents, SaaS products and data systems, from idea to deployment.
            Browse my public builds, with the code behind each one.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <MagneticButton to="/work">See my work</MagneticButton>
            <MagneticButton to="/start" variant="ghost">Start a project</MagneticButton>
          </motion.div>

          {/* mini terminal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-7 max-w-xl rounded-2xl border border-white/10 bg-black/50 overflow-hidden"
            aria-label="Build console"
          >
            <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/8">
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="ml-1 font-mono2 text-[10px] text-[#9aa4b2]">forge — live</span>
            </div>
            <div className="px-4 py-3 font-mono2 text-[12px] leading-relaxed text-[#c6cdd8] min-h-[86px]">
              <Typewriter
                lines={["$ forge build --idea \"support copilot\"", "✓ agents linked · rag indexed · pipeline ready", "→ output: product.ship"]}
                speed={22}
              />
            </div>
          </motion.div>
        </div>

        {/* right: AI core */}
        <motion.div
          style={{ y: rise }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <AiCore active={core} onActive={setCore} />
        </motion.div>
      </motion.div>

      {/* proof strip + tech marquee */}
      <div id="next" className="relative mx-auto max-w-7xl px-4 sm:px-6 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur px-6 sm:px-10 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-bold"><CountUp to={s.value} /></p>
              <p className="mt-1 font-mono2 text-[11px] tracking-widest uppercase text-[#9aa4b2]">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="mt-8">
          <p className="text-center font-mono2 text-[11px] tracking-[0.25em] text-[#9aa4b2]">TECH I WORK WITH</p>
          <div className="mt-4 overflow-hidden group" role="list" aria-label="Technologies">
            <div className="flex gap-3 whitespace-nowrap animate-marquee w-max group-hover:[animation-play-state:paused]">
              {[...TECHS, ...TECHS].map((t, i) => (
                <span
                  key={`${t.name}-${i}`}
                  role="listitem"
                  data-tip={t.role}
                  aria-label={`${t.name}: ${t.role}`}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-5 py-2 text-sm font-mono2 text-[#c6cdd8] hover:border-[#c8ff3d]/60 hover:text-white transition-colors cursor-default"
                >
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm">
          <Link to="/services" className="inline-flex items-center gap-2 font-semibold text-[#c8ff3d] hover:gap-3.5 transition-all">
            Enter the studio <ArrowDown size={15} />
          </Link>
        </p>
      </div>
    </section>
  );
}
