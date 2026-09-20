export const CREATOR = {
  name: "Sanskar Chandawar",
  roles: ["Independent AI Builder", "AI / LLMs / Agents / Data / Software"],
  intro:
    "I'm Sanskar Chandawar, a Computer Science Engineering student and independent builder working across AI/LLMs, agentic systems, data engineering, and full-stack software. I build practical systems to understand how modern AI can be turned into useful products.",
  education: {
    period: "2024 → Present",
    degree: "B.Tech in Computer Science Engineering",
    school: "MIT Academy of Engineering",
    cgpa: "7.84 / 10",
  },
  resumeUrl: "https://hackerrank-resume.s3.us-east-1.amazonaws.com/uploads/30565348/MzA1NjUzNDg=.pdf",
};

export interface CreatorCap {
  icon: string;
  title: string;
  desc: string;
}

export const CREATOR_CAPS: CreatorCap[] = [
  { icon: "brain", title: "AI / LLM SYSTEMS", desc: "LLM applications, RAG, model evaluation, fine-tuning and AI experimentation." },
  { icon: "bot", title: "AGENTIC AI", desc: "ReAct, tool calling, memory, workflows and autonomous task execution." },
  { icon: "database", title: "DATA ENGINEERING", desc: "Apache Spark, PySpark, Databricks, Delta Lake, ETL and scalable pipelines." },
  { icon: "code", title: "SOFTWARE ENGINEERING", desc: "React, TypeScript, FastAPI, Node.js, REST APIs and full-stack systems." },
  { icon: "shield", title: "AI SAFETY & EVALUATION", desc: "Risk systems, evaluation, deterministic decision layers and AI reliability." },
  { icon: "package", title: "PRODUCT BUILDING", desc: "Turning technical experiments into usable applications and product experiences." },
];

export interface CreatorBuild {
  no: string;
  name: string;
  tagline: string;
  tech: string[];
  desc: string;
  repo: string;
}

export const CREATOR_BUILDS: CreatorBuild[] = [
  {
    no: "01",
    name: "CAMPUSOPS",
    tagline: "AI College Operating System",
    tech: ["Python", "FastAPI", "React", "PostgreSQL", "AI Agents"],
    desc: "An AI agent designed to unify college operations, academic information, deadlines, documents, notifications, timetable context and proactive alerts into a conversational workflow.",
    repo: "https://github.com/Sanskar1724/CampusOps",
  },
  {
    no: "02",
    name: "PAYTRUST AI",
    tagline: "Evidence-Driven Payment Safety",
    tech: ["Python", "FastAPI", "Streamlit", "ML", "LLMs"],
    desc: "A deterministic payment authorization layer for AI agents combining risk analysis, authorization decisions, audit trails and fraud-model evaluation.",
    repo: "https://github.com/Sanskar1724/PayTrust_AI",
  },
  {
    no: "03",
    name: "REACT ASSISTANT",
    tagline: "Multi-Tool LLM Agent",
    tech: ["Python", "ReAct", "OpenAI-Compatible APIs", "CLI"],
    desc: "A terminal-first ReAct agent with tools, persistent memory, structured logging, retries, timeouts and safe execution.",
    repo: "https://github.com/Sanskar1724/ReAct-Agent",
  },
  {
    no: "04",
    name: "DATABRICKS LAKEHOUSE",
    tagline: "Scalable Data Engineering",
    tech: ["Apache Spark", "PySpark", "Databricks", "Delta Lake"],
    desc: "A production-style Lakehouse pipeline implementing Bronze → Silver → Gold architecture for scalable data transformation and analytics.",
    repo: "https://github.com/Sanskar1724/Retail-Lakehouse-with-Databricks",
  },
];

export interface StackGroup {
  name: string;
  purpose: string;
  items: string[];
}

export const STACK_GROUPS: StackGroup[] = [
  { name: "AI / ML", purpose: "Models, adaptation and prompting", items: ["PyTorch", "Transformers", "Hugging Face", "PEFT", "LoRA", "QLoRA", "TRL", "RAG", "ReAct", "DPO", "RLVR / GRPO", "Prompt Engineering"] },
  { name: "Backend", purpose: "APIs and services", items: ["FastAPI", "Flask", "Node.js", "REST APIs"] },
  { name: "Frontend", purpose: "Interfaces and demos", items: ["React", "TypeScript", "Streamlit"] },
  { name: "Data", purpose: "Scale compute and pipelines", items: ["Apache Spark", "PySpark", "Databricks", "Delta Lake", "ETL"] },
  { name: "Databases", purpose: "Persistence layer", items: ["PostgreSQL", "MongoDB", "SQLite", "Firebase"] },
  { name: "Languages", purpose: "Daily drivers", items: ["Python", "C++", "Java", "SQL", "JavaScript", "TypeScript"] },
  { name: "Infra / Tools", purpose: "Build, run and experiment", items: ["Git", "GitHub", "Linux", "Docker", "Google Colab", "Kaggle", "NVIDIA APIs"] },
];

export const SIGNALS: { value: number; suffix: string; label: string }[] = [
  { value: 25, suffix: "", label: "PUBLIC REPOSITORIES" },
  { value: 35, suffix: "", label: "GITHUB STARS" },
  { value: 10, suffix: "+", label: "AI / SOFTWARE BUILDS" },
  { value: 300, suffix: "+", label: "DSA PROBLEMS" },
  { value: 10, suffix: "+", label: "CERTIFICATIONS" },
];

export interface CodeProfile {
  name: string;
  username: string;
  points: string[];
  url: string;
  cta: string;
}

export const CODE_PROFILES: CodeProfile[] = [
  {
    name: "LEETCODE",
    username: "IjxdheI4ij",
    points: ["137 Python3 problems", "36 MySQL problems", "100 Days Badge", "50 Days Badge"],
    url: "https://leetcode.com/u/IjxdheI4ij/",
    cta: "VIEW LEETCODE",
  },
  {
    name: "HACKERRANK",
    username: "@sanskarchandawa1",
    points: ["B.Tech CSE", "MIT Academy of Engineering", "CGPA 7.84", "Problem Solving certification"],
    url: "https://www.hackerrank.com/profile/sanskarchandawa1",
    cta: "VIEW HACKERRANK",
  },
  {
    name: "GEEKSFORGEEKS",
    username: "@user_8eqdqjstjhx",
    points: ["Practice & contests", "DSA problem solving"],
    url: "https://www.geeksforgeeks.org/profile/user_8eqdqjstjhx?tab=activity",
    cta: "VIEW GFG",
  },
  {
    name: "CODEDEX",
    username: "@Sanskiyy",
    points: ["Creative coding tracks", "Project-based learning"],
    url: "https://www.codedex.io/@Sanskiyy",
    cta: "VIEW CODEDEX",
  },
  {
    name: "GITHUB",
    username: "Sanskar1724",
    points: ["AI agents & fine-tuning", "Data lakehouses", "Full-stack builds"],
    url: "https://github.com/Sanskar1724",
    cta: "VIEW GITHUB",
  },
];

export interface Social {
  name: string;
  desc: string;
  handle: string;
  url: string;
}
export const EDUCATION_JOURNEY = [
  {
    period: "Present",
    title: "B.Tech Computer Engineering",
    place: "Second Year — Programming, Data Structures, Web Technologies, AI Tools",
  },
  { period: "2024", title: "12th Grade — 83.83%", place: "Jawahar Nehru Vidyalaya Barbada" },
  { period: "2022", title: "10th Grade — 88.4%", place: "Swami Vivekanand Public School" },
];

export interface Cert {
  name: string;
  issuer: string;
  note: string;
}

export const CERTS: Cert[] = [
  { name: "AI Fluency: Framework & Foundations", issuer: "Anthropic", note: "AI fundamentals and Claude capabilities" },
  { name: "AI Fluency for Students", issuer: "Anthropic", note: "AI literacy and practical applications" },
  { name: "Cisco AICTE Virtual Internship — Cybersecurity", issuer: "Cisco Networking Academy", note: "Cybersecurity fundamentals" },
  { name: "Cyber Physical System Engineering", issuer: "L&T EduTech", note: "12 courses · 30 hours" },
  { name: "Cybersecurity Essentials", issuer: "Cisco Networking Academy", note: "Core security concepts and practices" },
  { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", note: "Foundational principles" },
  { name: "Fundamentals of Deep Learning", issuer: "NVIDIA", note: "Deep learning concepts and neural networks" },
  { name: "Python Essentials 1", issuer: "Cisco Networking Academy", note: "Python fundamentals and syntax" },
  { name: "Python Essentials 2", issuer: "Cisco Networking Academy", note: "Advanced Python and OOP" },
];

export const CERTS_FOLDER = "https://drive.google.com/drive/u/1/folders/1NppF2HtRuewBGFKGprZZSKHqQYDLKaGM";

export const HF_PROFILE = "https://huggingface.co/EquilStable";
export const HF_MODEL = "https://huggingface.co/EquilStable/MEETME";
export const HF_SPACES = [
  { name: "Green Carbon Credit Platform", desc: "Running Space", url: "https://huggingface.co/spaces/EquilStable/green-carbon-credit-platform-g2gj1" },
  { name: "DeepSite Project", desc: "Running Space", url: "https://huggingface.co/spaces/EquilStable/deepsite-project-0tta9" },
];

export const AI_TOOLS = ["ChatGPT", "Claude", "Midjourney", "GitHub Copilot", "Lovable", "Canva AI"];

export const INTERESTS = ["Software Development", "Artificial Intelligence", "Prompt Engineering", "UI/UX Design", "Ethical Hacking", "Content Creation"];
export const PHILOSOPHY = "The best engineers of tomorrow won't just write code — they'll orchestrate AI systems that amplify human creativity.";

export const SOCIALS: Social[] = [
  { name: "LINKEDIN", desc: "Professional / career", handle: "in/sanskar-chandawar", url: "https://www.linkedin.com/in/sanskar-chandawar/" },
  { name: "GITHUB", desc: "Code / projects", handle: "Sanskar1724", url: "https://github.com/Sanskar1724" },
  { name: "LEETCODE", desc: "Problem solving", handle: "IjxdheI4ij", url: "https://leetcode.com/u/IjxdheI4ij/" },
  { name: "HACKERRANK", desc: "Skills / certifications", handle: "@sanskarchandawa1", url: "https://www.hackerrank.com/profile/sanskarchandawa1" },
  { name: "INSTAGRAM", desc: "@sansk_r17.exe", handle: "sansk_r17.exe", url: "https://www.instagram.com/sansk_r17.exe/" },
  { name: "X / TWITTER", desc: "@Sanskar_learner", handle: "Sanskar_learner", url: "https://x.com/Sanskar_learner" },
];
