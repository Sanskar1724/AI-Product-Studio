export const GITHUB_URL = "https://github.com/Sanskar1724";
export const STUDIO_REPO = "https://github.com/Sanskar1724/AI-Product-Studio";
export const LINKEDIN_URL = "https://www.linkedin.com/in/sanskar-chandawar";
export const EMAIL = "sanskarchandawar3@gmail.com";

export type CapabilityKey = "ai" | "software" | "automation" | "data" | "research";

export interface Capability {
  key: CapabilityKey;
  label: string;
  tagline: string;
  items: { name: string; desc: string }[];
  stack: string[];
}

export const CAPABILITIES: Capability[] = [
  {
    key: "ai",
    label: "AI",
    tagline: "LLM applications that reason, retrieve and act.",
    items: [
      { name: "AI Agents", desc: "ReAct think → act → observe loops, tool calling, memory." },
      { name: "RAG Systems", desc: "Retrieval pipelines over docs, tickets and knowledge bases." },
      { name: "LLM Applications", desc: "Assistants, copilots and support AI on OpenAI-compatible APIs." },
      { name: "Document Intelligence", desc: "Extraction, classification and Q&A over PDFs and records." },
      { name: "Fine-tuning", desc: "CPT → SFT → DPO pipelines with LoRA / QLoRA." },
      { name: "Customer Support AI", desc: "Intent, sentiment and priority routing with grounded answers." },
    ],
    stack: ["Python", "LangChain", "Hugging Face", "PyTorch", "Qwen 2.5", "FastAPI"],
  },
  {
    key: "software",
    label: "Software",
    tagline: "SaaS and web apps people can actually use.",
    items: [
      { name: "SaaS Products", desc: "Multi-page apps with auth, billing-ready structure, dashboards." },
      { name: "Web Applications", desc: "React + TypeScript frontends, Node / FastAPI backends." },
      { name: "APIs", desc: "REST APIs with validation, auth and clean contracts." },
      { name: "Dashboards", desc: "Admin, analytics and ops views with real data wiring." },
      { name: "Authentication", desc: "Sessions, OAuth-ready flows, Firebase / JWT patterns." },
      { name: "Databases", desc: "PostgreSQL, MongoDB, Firebase modeling that scales." },
    ],
    stack: ["React", "TypeScript", "Node.js", "FastAPI", "PostgreSQL", "MongoDB"],
  },
  {
    key: "automation",
    label: "Automation",
    tagline: "Boring work, handled by systems.",
    items: [
      { name: "Workflow Automation", desc: "Event-driven pipelines that remove manual steps." },
      { name: "API Integrations", desc: "Connect tools, webhooks and third-party services." },
      { name: "Bots", desc: "Notification, triage and ops bots for chat and email." },
      { name: "Data Pipelines", desc: "Scheduled ETL with validation and alerting." },
      { name: "Alerting", desc: "Risk scoring + prioritised queues, like PayTrust_AI." },
      { name: "Internal Tools", desc: "Small apps that save teams hours every week." },
    ],
    stack: ["Python", "FastAPI", "Webhooks", "Cron / Jobs", "REST APIs"],
  },
  {
    key: "data",
    label: "Data",
    tagline: "From raw tables to decisions.",
    items: [
      { name: "Analytics", desc: "EDA, metrics and dashboards stakeholders trust." },
      { name: "Lakehouse Pipelines", desc: "Bronze → Silver → Gold with Spark + Delta Lake." },
      { name: "Warehousing", desc: "Batch, real-time and distributed warehouse patterns." },
      { name: "Visualization", desc: "Tableau, Matplotlib and web-based charts." },
      { name: "ML Scoring", desc: "Risk and prioritisation models with explainable outputs." },
      { name: "Data Quality", desc: "Validation, dedup and schema discipline." },
    ],
    stack: ["Apache Spark", "Databricks", "Delta Lake", "Pandas", "SQL", "Tableau"],
  },
  {
    key: "research",
    label: "Research",
    tagline: "Experiments with models, datasets and architectures.",
    items: [
      { name: "Model Experiments", desc: "Decoder-only transformers built from scratch." },
      { name: "Dataset Experiments", desc: "Curated ChatML datasets for personality and domain fit." },
      { name: "Fine-tuning", desc: "QLoRA on Qwen 2.5, PEFT / TRL / Unsloth workflows." },
      { name: "Evaluation", desc: "Benchmarks, ablations and honest failure notes." },
      { name: "LLM Benchmarking", desc: "Compare providers on cost, latency and quality." },
      { name: "Prototypes", desc: "Fast spikes that de-risk the real build." },
    ],
    stack: ["PyTorch", "Transformers", "PEFT", "TRL", "Hugging Face"],
  },
];

export interface Service {
  icon: string;
  title: string;
  desc: string;
  points: string[];
  cta: string;
}

export const SERVICES: Service[] = [
  {
    icon: "sparkles",
    title: "AI Products",
    desc: "Intelligent applications built around modern language models — agents, assistants and copilots.",
    points: ["AI agents & ReAct loops", "RAG over your docs", "Support & triage AI"],
    cta: "Scope an AI build",
  },
  {
    icon: "layers",
    title: "SaaS Products",
    desc: "Turn a product idea into usable software — auth, database, dashboard, deploy.",
    points: ["MVP in weeks", "React + TypeScript", "API-first backend"],
    cta: "Plan your MVP",
  },
  {
    icon: "workflow",
    title: "Automation",
    desc: "Automate repetitive workflows across tools, inboxes, sheets and APIs.",
    points: ["Workflow pipelines", "Integrations & webhooks", "Alerts & queues"],
    cta: "Automate a workflow",
  },
  {
    icon: "code",
    title: "Custom Software",
    desc: "Web apps, dashboards, APIs and internal tools that fit how you work.",
    points: ["Dashboards & admin", "REST APIs", "Internal tools"],
    cta: "Describe your tool",
  },
  {
    icon: "database",
    title: "Data & Intelligence",
    desc: "Lakehouse pipelines, warehousing and analytics that turn raw data into decisions.",
    points: ["Spark + Delta Lake", "Medallion ETL", "Analytics & viz"],
    cta: "Fix your data",
  },
  {
    icon: "flask",
    title: "AI Research",
    desc: "Model, dataset and architecture experiments — fine-tuning, evals and prototypes.",
    points: ["QLoRA fine-tuning", "Transformer builds", "Honest evals"],
    cta: "Run an experiment",
  },
];

export interface Experiment {
  no: string;
  title: string;
  area: string;
  model: string;
  objective: string;
  status: "active" | "shipped" | "exploring";
  link: string;
}

export const EXPERIMENTS: Experiment[] = [
  {
    no: "EXP-01",
    title: "Personal AI Digital Twin",
    area: "Fine-tuning",
    model: "Qwen 2.5 · QLoRA · Unsloth",
    objective: "Teach a small model to answer in a specific voice using a hand-curated ChatML dataset.",
    status: "shipped",
    link: `${GITHUB_URL}/MeetMe-Digital_Twin`,
  },
  {
    no: "EXP-02",
    title: "ReAct Agent from Scratch",
    area: "Agents",
    model: "Python · ReAct · Tool calling",
    objective: "Terminal-first agent with iterative think → act → observe, safe tools and JSON memory.",
    status: "shipped",
    link: `${GITHUB_URL}/ReAct-Agent`,
  },
  {
    no: "EXP-03",
    title: "CPT → SFT → DPO → RLVR Pipeline",
    area: "Fine-tuning",
    model: "PyTorch · PEFT · TRL · GRPO",
    objective: "End-to-end alignment pipeline: pretrain, instruct-tune, prefer, then reward-verify.",
    status: "active",
    link: `${GITHUB_URL}/Fine-Tuning-LLMs`,
  },
  {
    no: "EXP-04",
    title: "Mini Modern LLM",
    area: "Transformers",
    model: "PyTorch · RoPE · GQA · SwiGLU",
    objective: "Decoder-only transformer from scratch to understand every layer that matters.",
    status: "shipped",
    link: `${GITHUB_URL}/Mini-Modern-LLM`,
  },
  {
    no: "EXP-05",
    title: "Payment-Abuse Risk Scorer",
    area: "Applied ML",
    model: "Python · Risk scoring",
    objective: "Detect one defined fraud class, estimate expected loss, recommend bounded response.",
    status: "shipped",
    link: `${GITHUB_URL}/PayTrust_AI`,
  },
  {
    no: "EXP-06",
    title: "Campus Operating Agent",
    area: "Agents",
    model: "Python · Agents · Web",
    objective: "An agent that acts as the OS for a class community — notices, events, Q&A.",
    status: "active",
    link: `${GITHUB_URL}/CampusOps`,
  },
];

export interface Project {
  name: string;
  problem: string;
  solution: string;
  tech: string[];
  repo: string;
  demo?: string;
  tag: string;
  stars?: number;
  arch: string[];
}

export const PROJECTS: Project[] = [
  {
    name: "CampusOps",
    problem: "College communities run on scattered chats — notices get lost, events lack owners, questions repeat.",
    solution: "An AI agent that acts as the community OS: structured notices, event flows and grounded Q&A.",
    tech: ["Python", "AI Agents", "React", "Vercel"],
    repo: `${GITHUB_URL}/CampusOps`,
    demo: "https://campus-ops-chi.vercel.app",
    tag: "AI Agent · SaaS",
    stars: 3,
    arch: ["App UI", "Agent runtime", "Tools + memory", "Database"],
  },
  {
    name: "PayTrust_AI",
    problem: "Payment abuse needs detection without blocking legitimate users.",
    solution: "Scores one defined fraud class, estimates expected loss and recommends a bounded defensive response.",
    tech: ["Python", "Risk Scoring", "ML"],
    repo: `${GITHUB_URL}/PayTrust_AI`,
    tag: "Applied ML",
    stars: 2,
    arch: ["Event intake", "Risk scoring", "Bounded response", "Audit log"],
  },
  {
    name: "ReAct-Agent",
    problem: "Most agent demos hide the reasoning loop — hard to debug or extend.",
    solution: "Terminal-first ReAct agent in pure Python: think → act → observe, safe tools, JSON memory, clean CLI.",
    tech: ["Python", "ReAct", "Tool Calling"],
    repo: `${GITHUB_URL}/ReAct-Agent`,
    tag: "AI Agent",
    stars: 3,
    arch: ["CLI", "Reasoning loop", "Tool sandbox", "JSON memory"],
  },
  {
    name: "MeetMe Digital Twin",
    problem: "Generic chatbots don't sound like you and forget your context.",
    solution: "QLoRA fine-tune of Qwen 2.5 on a curated ChatML dataset via Unsloth for a personal-voice twin.",
    tech: ["Qwen 2.5", "QLoRA", "Unsloth"],
    repo: `${GITHUB_URL}/MeetMe-Digital_Twin`,
    tag: "Fine-tuning",
    stars: 3,
    arch: ["ChatML dataset", "QLoRA trainer", "Qwen 2.5", "Eval prompts"],
  },
  {
    name: "Retail Lakehouse",
    problem: "Raw retail data can't answer business questions without engineered pipelines.",
    solution: "Medallion ETL (bronze/silver/gold) on Databricks with PySpark, Delta Lake and Unity Catalog.",
    tech: ["PySpark", "Databricks", "Delta Lake"],
    repo: `${GITHUB_URL}/Retail-Lakehouse-with-Databricks`,
    tag: "Data",
    stars: 3,
    arch: ["Raw ingest", "Bronze → Silver → Gold", "Unity Catalog", "SQL marts"],
  },
  {
    name: "Signalcraft AI",
    problem: "Creators guess what to post; trend + audience + history signals stay disconnected.",
    solution: "Content-intelligence platform that analyses trends and history, then drafts platform-ready posts.",
    tech: ["Python", "LLMs", "Analytics"],
    repo: `${GITHUB_URL}/signalcraft-ai`,
    tag: "AI Product",
    stars: 2,
    arch: ["Trend signals", "LLM analysis", "Content drafts", "History store"],
  },
  {
    name: "Cisco Troubleshooting AI",
    problem: "Network faults take too long to triage from raw device evidence.",
    solution: "Assistant combining Packet Tracer evidence, rule-based diagnosis and LLM explanation.",
    tech: ["Python", "LLMs", "Rules Engine"],
    repo: `${GITHUB_URL}/cisco-network-troubleshooting-ai`,
    tag: "AI Assistant",
    stars: 4,
    arch: ["Device evidence", "Rules engine", "LLM explainer", "Fix playbook"],
  },
  {
    name: "Aarogya Setu Plus",
    problem: "Clinic workflows split across calls, papers and disconnected apps.",
    solution: "Healthcare platform: medicine assistant, appointments, WebRTC visits, React + TypeScript frontend.",
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "WebRTC"],
    repo: `${GITHUB_URL}/Aarogya-Setu-Plus`,
    tag: "SaaS",
    arch: ["React frontend", "Node API", "MongoDB", "WebRTC media"],
  },
];

export interface Tech {
  name: string;
  role: string;
  proof: string;
  orbit: number;
}

export const TECHS: Tech[] = [
  { name: "React", role: "Product UI", proof: "CampusOps, Aarogya Setu Plus", orbit: 0 },
  { name: "TypeScript", role: "Type-safe apps", proof: "Aarogya Setu Plus", orbit: 40 },
  { name: "Python", role: "AI + backend core", proof: "ReAct-Agent, PayTrust_AI", orbit: 80 },
  { name: "FastAPI", role: "APIs", proof: "Agent + product backends", orbit: 120 },
  { name: "PyTorch", role: "Models", proof: "Mini Modern LLM, fine-tuning", orbit: 160 },
  { name: "Hugging Face", role: "Models + data", proof: "QLoRA, TRL pipelines", orbit: 200 },
  { name: "Qwen 2.5", role: "Fine-tuned LLM", proof: "MeetMe Digital Twin", orbit: 240 },
  { name: "LangChain", role: "Agent wiring", proof: "ReAct-Agent, AI_Agents", orbit: 280 },
  { name: "PostgreSQL", role: "Primary DB", proof: "SaaS backends", orbit: 320 },
  { name: "MongoDB", role: "Doc store", proof: "Aarogya Setu Plus", orbit: 20 },
  { name: "Spark", role: "Scale compute", proof: "Retail Lakehouse", orbit: 100 },
  { name: "Databricks", role: "Lakehouse", proof: "Delta + medallion ETL", orbit: 180 },
  { name: "Docker", role: "Ship it", proof: "Reproducible builds", orbit: 260 },
  { name: "Node.js", role: "Realtime + APIs", proof: "WebRTC, Socket.IO apps", orbit: 300 },
];

export const PROCESS = [
  { id: "01", name: "Discover", desc: "A sharp call about your idea, problem or workflow. What must this product do on day one?", out: "Problem statement + success criteria" },
  { id: "02", name: "Define", desc: "Scope the smallest useful version. Features in, features later, features never.", out: "MVP scope + milestones" },
  { id: "03", name: "Architect", desc: "Pick the boring-reliable stack: data model, API shape, AI components, deploy target.", out: "Architecture blueprint" },
  { id: "04", name: "Prototype", desc: "A clickable or working slice in days — AI loop, dashboard or pipeline first.", out: "Working prototype" },
  { id: "05", name: "Build", desc: "Weekly shipped increments with direct communication. No telephone game.", out: "Tested product" },
  { id: "06", name: "Deploy", desc: "Vercel / cloud deploy, env config, docs and handover so you can run it.", out: "Live product + docs" },
  { id: "07", name: "Improve", desc: "Measure, fix the sharp edges, add the next AI capability when it earns its place.", out: "Iteration plan" },
];

export const SOLUTIONS = [
  { for: "Founders", what: "Validate fast: landing + working MVP with auth, DB and one killer AI feature.", icon: "rocket" },
  { for: "Small businesses", what: "Kill spreadsheet chaos: booking, billing helpers, dashboards and automations.", icon: "store" },
  { for: "Students", what: "Ship portfolio-grade builds: guided MVP with clean code you can explain.", icon: "grad" },
  { for: "Researchers", what: "Turn papers into runnable prototypes: fine-tunes, evals and demos.", icon: "flask" },
  { for: "Developers", what: "Accelerate: agent scaffolds, RAG starters and review of your AI architecture.", icon: "code" },
  { for: "Operators", what: "Automate ops: triage queues, alerts, reports and integrations that just run.", icon: "gear" },
];

export interface Audience {
  id: string;
  label: string;
  headline: string;
  copy: string;
  picks: string[];
  cta: string;
  href: string;
}

export const AUDIENCES: Audience[] = [
  {
    id: "idea",
    label: "I have an idea",
    headline: "From napkin sketch to working product.",
    copy: "Bring the idea as it is — rough is fine. You'll leave the first call with a scoped MVP and an architecture sketch.",
    picks: ["MVP scoping", "Prototype", "AI Products", "SaaS"],
    cta: "Blueprint my idea",
    href: "/builder",
  },
  {
    id: "business",
    label: "I run a business",
    headline: "Remove the busywork draining your week.",
    copy: "Support triage, reporting, notifications and spreadsheet chaos — replaced with automations and dashboards that just run.",
    picks: ["Automation", "AI Support", "Internal Tools", "Analytics"],
    cta: "Automate my ops",
    href: "/automation",
  },
  {
    id: "startup",
    label: "I'm building a startup",
    headline: "Ship the MVP that earns the next conversation.",
    copy: "Auth, database, dashboard and one killer AI feature — the smallest version investors and users can touch.",
    picks: ["MVP", "SaaS", "AI Products", "Prototype"],
    cta: "Scope the MVP",
    href: "/builder",
  },
  {
    id: "student",
    label: "I'm a student",
    headline: "Build the project that teaches you the stack.",
    copy: "Guided, portfolio-grade builds with clean code you can explain line by line — AI/ML, web apps and data pipelines.",
    picks: ["Technical Projects", "AI/ML", "Research", "Development"],
    cta: "See proof of work",
    href: "/work",
  },
  {
    id: "research",
    label: "I'm researching AI",
    headline: "Turn papers into runnable systems.",
    copy: "Fine-tunes, evals, agent scaffolds and honest ablations — experiments with methods, datasets and code you can inspect.",
    picks: ["Fine-tuning", "Agents", "Evaluation", "Prototypes"],
    cta: "Explore the lab",
    href: "/lab",
  },
];

export interface Workflow {
  id: string;
  label: string;
  trigger: string;
  steps: { node: string; detail: string }[];
  result: string;
}

export const WORKFLOWS: Workflow[] = [
  {
    id: "support",
    label: "Customer Support",
    trigger: "New ticket arrives",
    steps: [
      { node: "AI", detail: "Classify intent, sentiment, priority" },
      { node: "DECISION", detail: "Auto-draft or escalate?" },
      { node: "ACTION", detail: "Draft grounded reply" },
      { node: "DATABASE", detail: "Log ticket + resolution" },
    ],
    result: "Inbox triaged, replies drafted, humans approve",
  },
  {
    id: "leads",
    label: "Lead Management",
    trigger: "New signup / inquiry",
    steps: [
      { node: "AI", detail: "Score fit + extract needs" },
      { node: "DECISION", detail: "Route: hot, nurture, archive" },
      { node: "ACTION", detail: "Personalized follow-up" },
      { node: "DATABASE", detail: "CRM updated + reminders" },
    ],
    result: "Every lead scored, routed and followed up",
  },
  {
    id: "reporting",
    label: "Reporting",
    trigger: "Schedule / new data lands",
    steps: [
      { node: "AI", detail: "Summarize changes + anomalies" },
      { node: "DECISION", detail: "Needs attention?" },
      { node: "ACTION", detail: "Generate digest + charts" },
      { node: "DATABASE", detail: "Snapshot stored for history" },
    ],
    result: "Stakeholders get answers, not spreadsheets",
  },
  {
    id: "notify",
    label: "Notifications",
    trigger: "Event fires (payment, alert, update)",
    steps: [
      { node: "AI", detail: "Decide urgency + channel" },
      { node: "DECISION", detail: "Notify now or batch?" },
      { node: "ACTION", detail: "Send via mail / chat / SMS" },
      { node: "DATABASE", detail: "Delivery + receipt logged" },
    ],
    result: "Right message, right channel, zero spam",
  },
];

export interface Architecture {
  id: string;
  label: string;
  layers: { node: string; detail: string }[];
  note: string;
}

export const ARCHITECTURES: Architecture[] = [
  {
    id: "ai",
    label: "AI Product",
    layers: [
      { node: "USER", detail: "Chat / app interface" },
      { node: "FRONTEND", detail: "React + TypeScript" },
      { node: "API", detail: "FastAPI — validated routes" },
      { node: "AI", detail: "LLM + retrieval + tools" },
      { node: "DATABASE", detail: "Postgres + vector store" },
    ],
    note: "Every AI answer is grounded in retrieved context — the model never freelances facts in v1.",
  },
  {
    id: "saas",
    label: "SaaS",
    layers: [
      { node: "USER", detail: "Marketing + app" },
      { node: "FRONTEND", detail: "React + TypeScript" },
      { node: "API", detail: "Node / FastAPI + auth" },
      { node: "WORKERS", detail: "Jobs, emails, webhooks" },
      { node: "DATABASE", detail: "PostgreSQL + storage" },
    ],
    note: "Boring-reliable core: auth, billing-ready structure, background jobs, documented API.",
  },
  {
    id: "auto",
    label: "Automation",
    layers: [
      { node: "TRIGGER", detail: "Webhook / schedule / event" },
      { node: "ROUTER", detail: "Rules + AI classifier" },
      { node: "ACTIONS", detail: "API calls, drafts, alerts" },
      { node: "HUMAN", detail: "Approve high-stakes steps" },
      { node: "DATABASE", detail: "Audit log of everything" },
    ],
    note: "Automate the routine, escalate the risky — a full audit trail stays queryable.",
  },
  {
    id: "data",
    label: "Data Platform",
    layers: [
      { node: "SOURCES", detail: "Apps, sheets, APIs" },
      { node: "INGEST", detail: "Spark jobs (bronze)" },
      { node: "REFINE", detail: "Cleaned marts (silver → gold)" },
      { node: "SERVE", detail: "SQL + dashboards + ML" },
      { node: "CONSUME", detail: "Decisions, alerts, models" },
    ],
    note: "Medallion pattern on Spark + Delta Lake: raw stays raw, gold stays trustworthy.",
  },
];
