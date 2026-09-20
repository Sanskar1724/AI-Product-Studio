import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const META: Record<string, { title: string; desc: string }> = {
  "/": {
    title: "Forge — Independent AI Product Studio | AI, Software & Automation",
    desc: "Ideas in. Intelligent products out. AI products, SaaS, automation and data systems — designed, built and shipped by one builder.",
  },
  "/services": {
    title: "Services — AI, Software, Automation & Data | FORGE//",
    desc: "What you can get built: AI products, SaaS, automation, custom software, data platforms and research prototypes.",
  },
  "/builder": {
    title: "Product Builder — Blueprint & Scope | FORGE//",
    desc: "Configure your product blueprint and estimate project scope with interactive studio tools.",
  },
  "/automation": {
    title: "Automation — Workflows & AI Triage | FORGE//",
    desc: "Watch support-AI triage, workflow patterns and before/after automation in action.",
  },
  "/lab": {
    title: "AI Lab — Experiments & Fine-tuning | FORGE//",
    desc: "Real experiments: fine-tuning, agents, transformers and applied ML with code links.",
  },
  "/work": {
    title: "Built & Tested — Proof of Work | FORGE//",
    desc: "Selected public builds with case studies, architectures and repository links.",
  },
  "/start": {
    title: "Start a Project | FORGE//",
    desc: "Bring an idea, a problem or a workflow. Work directly with the builder.",
  },
  "/creator": {
    title: "Sanskar Chandawar — AI Builder | FORGE//",
    desc: "Sanskar Chandawar is an independent AI builder working across LLMs, agentic AI, data engineering and software products.",
  },
};

export default function RouteSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const m = META[pathname] ?? META["/"];
    document.title = m.title;
    const set = (sel: string, attr: string, val: string) => {
      let el = document.head.querySelector(sel) as HTMLMetaElement | HTMLLinkElement | null;
      if (!el) {
        el = sel.startsWith("link")
          ? document.createElement("link")
          : (document.createElement("meta") as HTMLMetaElement);
        if (sel.includes("rel=")) {
          const rel = sel.match(/rel="([^"]+)"/)?.[1];
          if (rel) (el as HTMLLinkElement).rel = rel;
        } else {
          const key = sel.includes("property=") ? "property" : "name";
          const name = sel.match(/(?:property|name)="([^"]+)"/)?.[1];
          if (name) (el as HTMLMetaElement).setAttribute(key, name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
    };
    set('meta[name="description"]', "content", m.desc);
    set('meta[property="og:title"]', "content", m.title);
    set('meta[property="og:description"]', "content", m.desc);
    set('meta[name="twitter:title"]', "content", m.title);
    set('meta[name="twitter:description"]', "content", m.desc);
    set('link[rel="canonical"]', "href", `/${pathname === "/" ? "" : pathname.slice(1)}`);
  }, [pathname]);
  return null;
}
