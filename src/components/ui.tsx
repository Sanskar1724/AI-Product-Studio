import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.65, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
}) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p className="font-mono2 text-[11px] tracking-[0.25em] uppercase text-[#c8ff3d]">{"//"} {eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight text-balance">{title}</h2>
      </Reveal>
      {sub ? (
        <Reveal delay={0.16}>
          <p className="mt-4 text-base sm:text-lg text-[#9aa4b2] leading-relaxed">{sub}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "group inline-flex items-center gap-2 rounded-full font-semibold text-sm transition-all duration-300 focus-visible:outline-none";
  const styles =
    variant === "primary"
      ? "bg-[#c8ff3d] text-black px-6 py-3 hover:shadow-[0_0_40px_-6px_rgba(200,255,61,0.6)] hover:-translate-y-0.5"
      : "border border-white/15 text-white px-6 py-3 hover:border-[#c8ff3d]/60 hover:text-[#c8ff3d] hover:-translate-y-0.5";
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </a>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="Forge home">
      <svg width={compact ? 28 : 32} height={compact ? 28 : 32} viewBox="0 0 64 64" aria-hidden>
        <rect width="64" height="64" rx="14" fill="#0e1422" stroke="rgba(255,255,255,0.12)" />
        <path d="M20 44 L32 12 L44 44" fill="none" stroke="#C8FF3D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="34" r="4.5" fill="#0e1422" stroke="#C8FF3D" strokeWidth="3" />
        <path d="M26 44 H38" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      </svg>
      <span className="font-display font-bold tracking-tight text-[17px]">
        FORGE<span className="text-[#c8ff3d]">//</span>
        <span className="hidden sm:inline text-[#9aa4b2] font-medium text-[13px] ml-2">AI Product Studio</span>
      </span>
    </a>
  );
}

export function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
    </svg>
  );
}
