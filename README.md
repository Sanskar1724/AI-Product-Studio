# FORGE// — Independent AI Product Studio

Production-quality, fully responsive SaaS-style business site for an independent AI product studio.
**Ideas in. Intelligent products out.**

## Stack

React + TypeScript + Vite + Tailwind CSS v4 · Framer Motion · GSAP-ready · Lenis smooth scroll · Lucide icons

## Develop

```bash
npm install
npm run dev
```

## Build (Vercel)

```bash
npm run build
```

Standard Vite static output in `dist/`. Deploy by connecting the repo to Vercel — no extra config needed (`vercel.json` included for SPA fallback + headers).

## Structure

- `src/data/studio.ts` — all content: capabilities, services, experiments, projects, tech, process (edit copy here)
- `src/components/` — Navbar, Hero, CapabilitySystem, Services, ProductBuilder, Solutions, AILab, LiveDemo, Process, BuiltTested, TechEcosystem, Independent, Estimator, Closing
- `public/` — favicon, OG image, robots.txt, sitemap.xml

## Notes

- All project/experiment content is grounded in public GitHub work at https://github.com/Sanskar1724. No clients, metrics or testimonials are fabricated.
- Product Builder, Live Demo and Estimator are frontend-only simulations; the code is structured so a future backend/LLM API can replace the mock logic without rebuilding the UI.
