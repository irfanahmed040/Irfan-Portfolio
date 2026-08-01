export type ProjectLink = {
  label: string;
  href: string;
  kind: "github" | "docs" | "video" | "audio" | "live";
};

export type Project = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  context: string;
  problem: string;
  built: string;
  impact: string;
  highlights: string[];
  tech: string[];
  image: string;
  links: ProjectLink[];
  confidential?: boolean;
};

export const identity = {
  name: "Irfan Mohammed Ahmed",
  shortName: "Irfan",
  initials: "IMA",
  headline: "I build AI agents that ship.",
  subline:
    "Agentic pipelines, voice agents, and automations — running in production, not in notebooks.",
  location: "Hyderabad, India",
  email: "irfanm.ahmed04@gmail.com",
  roles: [
    "AI Engineer",
    "Agentic AI Developer",
    "n8n Automations Builder",
    "AI Voice Agents Builder",
    "Python Developer",
    "Robotics Enthusiast",
  ],
  quote: "The best engineers don't just write code — they engineer outcomes.",
  resume: "/resume/Irfan_Mohammed_Ahmed_Resume.pdf",
  socials: {
    github: "https://github.com/irfanahmed040",
    linkedin: "https://www.linkedin.com/in/irfan-mohammed-ahmed-826306201/",
  },
};

export const about = {
  stream:
    "I'm an AI engineer who builds systems that work in the real world — not just in notebooks. My focus is the space where generative AI meets automation: multi-agent systems that reason, retrieve, and act on their own. I've shipped voice agents that make real phone calls — booking appointments, running feedback surveys — with no human in the loop, and agentic pipelines that turned multi-hour manual processes into minutes. I work across the full stack of AI development, from prompt engineering and model integration to FastAPI backends. Off the keyboard, I build robotic arms and racing simulators — hardware fused with intelligent control.",
  facts: [
    { label: "Focus", value: "Agentic AI & Automation" },
    { label: "Currently", value: "AI Intern @ Tericsoft" },
    { label: "Degree", value: "B.Tech AI — VJIT '26" },
    { label: "Based in", value: "Hyderabad, India" },
  ],
};

export const projects: Project[] = [
  {
    id: "seo-pipeline",
    index: "01",
    title: "Autonomous SEO Blog Pipeline",
    tagline: "Research → strategy → publish, on autopilot",
    context: "Internship · Tericsoft — live in production",
    problem:
      "Publishing one SEO blog post meant hours of SERP research, competitor analysis, planning, and writing — per post.",
    built:
      "An autonomous n8n workflow that scrapes live top-ranking pages via DataForSEO, then chains three models — LLaMA 3.1 8B for extraction, GPT-4.1 mini for filtering, GPT-4.1 for strategy and final writing — with human review kept at exactly two checkpoints: the content plan and the final draft.",
    impact:
      "Actively used at Tericsoft to research, write, and publish blogs live on tericsoft.com — a multi-hour manual process cut to minutes.",
    highlights: [
      "Live SERP + competitor scraping before a single word is written",
      "Multi-model chain matched to task: extraction, filtering, strategy, writing",
      "Human-in-the-loop only at the two decisions that matter",
      "Published output live on tericsoft.com",
    ],
    tech: [
      "n8n",
      "GPT-4.1",
      "GPT-4.1 mini",
      "LLaMA 3.1 8B",
      "Groq",
      "DataForSEO",
      "Google Sheets",
      "GitHub Gists",
      "Notion",
      "JavaScript",
    ],
    image: "/projects/blog.png",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/irfanahmed040/n8n-Blog-Writing-Workflow",
        kind: "github",
      },
      {
        label: "Notion Docs",
        href: "https://fanatical-fog-322.notion.site/SEO-Automation-2f611c48ddd7807393a1d2d872b47264?pvs=74",
        kind: "docs",
      },
      {
        label: "Watch Video",
        href: "https://drive.google.com/file/d/1M7CDPYNlVqN9M83QZpv5wfRECyHTdta_/preview",
        kind: "video",
      },
    ],
  },
  {
    id: "eng-analytics",
    index: "02",
    title: "Engineering Team Analytics Platform",
    tagline: "Ask your org anything, in plain English",
    context: "Internship · Tericsoft — source confidential",
    problem:
      "Engineering managers at Tericsoft stitched together reports by hand across GitHub, Jira, and Keka HR — hours of cross-platform digging for every question.",
    built:
      "A four-model agentic pipeline over 35 live BigQuery tables: LightRAG retrieves schema, Gemini 2.5 Flash writes SQL, BigQuery executes, Mistral Large visualises — one conversational turn. SQL is dry-run validated and auto-repaired by Gemini up to five times on failure. A custom LoopAgnosticLock solved an asyncio conflict where LightRAG's module-level locks bound to the wrong Streamlit event loop.",
    impact:
      "An 11-chart productivity dashboard plus a freeform NL→SQL chat — managers get instant, accurate team insights instead of hours of manual reporting.",
    highlights: [
      "4-model pipeline: LightRAG → Gemini 2.5 Flash → BigQuery → Mistral Large",
      "Self-healing SQL: dry-run validated, auto-repaired up to 5×",
      "11-chart dashboard: productivity scores, code churn, risk register",
      "Custom LoopAgnosticLock for cross-page asyncio safety in Streamlit",
    ],
    tech: [
      "Python",
      "Streamlit",
      "LightRAG",
      "Llama 4 Scout",
      "Gemini 2.5 Flash",
      "Mistral Large",
      "Groq",
      "Google BigQuery",
      "SentenceTransformers",
      "Plotly",
      "asyncio",
    ],
    image: "/projects/codeEditor.png",
    links: [],
    confidential: true,
  },
  {
    id: "doctor-voice",
    index: "03",
    title: "Doctor Appointment Voice Agent",
    tagline: "The clinic's front desk, minus the front desk",
    context: "Voice AI · real-time availability",
    problem:
      "Appointment booking needs a human on the phone during clinic hours — and stops the moment they go home.",
    built:
      "An ElevenLabs conversational agent wired to Cal.com through Make.com webhooks. A check_availability tool returns the nearest open slot in real time; the agent collects name, email, and phone, reads everything back for verbal confirmation, then a book_appointment tool creates the booking. Shipped with a custom branded patient-facing clinic frontend.",
    impact:
      "24/7 appointment booking with zero humans on the clinic side and zero operational cost per booking.",
    highlights: [
      "Real-time slot lookup: webhook → Make.com → Cal.com → agent",
      "Verbal read-back confirmation before anything is booked",
      "End-to-end booking created directly in Cal.com",
      "Custom branded clinic frontend for patients",
    ],
    tech: ["ElevenLabs", "Make.com", "Cal.com", "Webhooks", "HTML/CSS/JS"],
    image: "/projects/doctor.png",
    links: [
      {
        label: "Watch Demo",
        href: "https://drive.google.com/file/d/1QDX9KHOsEtiCych9ODAjbhwHGFU9NuCn/preview",
        kind: "video",
      },
    ],
  },
  {
    id: "dealership-calls",
    index: "04",
    title: "Dealership Outbound Call Agent",
    tagline: "Every customer called. No staff involved.",
    context: "Voice AI · fully automated follow-ups",
    problem:
      "Post-purchase follow-up calls at a car dealership were manual — so they happened inconsistently or not at all.",
    built:
      "A pipeline where adding a customer row to Google Sheets instantly triggers a personalised outbound call via ElevenLabs and Twilio — the agent greets the customer by name, references their exact car and purchase date, and runs a structured 3-question satisfaction survey conversationally.",
    impact:
      "100% follow-up coverage with zero human effort after the sale — every call's transcript, AI summary, duration, and recording URL logged back to Sheets automatically.",
    highlights: [
      "Sheets row → instant personalised call, no trigger button",
      "Personalised per customer: name, car model, purchase date",
      "3-question voice survey: score (1–10), process feedback, suggestions",
      "Full auto-logging: transcript, summary, duration, recording URL",
    ],
    tech: [
      "ElevenLabs",
      "Make.com",
      "Google Sheets",
      "Twilio",
      "Gemini 2.5 Flash",
      "Webhooks",
    ],
    image: "/projects/codeEditor.png",
    links: [
      {
        label: "Listen to Call",
        href: "https://drive.google.com/file/d/1tHY-4s50FaOYREoo2Sm4IulfliPRvfKb/preview",
        kind: "audio",
      },
    ],
  },
  {
    id: "thyroid-cnn",
    index: "05",
    title: "Thyroid Cancer Detection — Bilinear CNN",
    tagline: "Published research · ICICC-2025, Springer",
    context: "Deep learning · computer vision",
    problem:
      "TIRADS grading of thyroid nodules in ultrasound depends on fine-grained texture differences that are hard to classify reliably.",
    built:
      "A bilinear CNN with a dual VGG16 backbone that captures the fine-grained texture features critical for nodule classification, aligned with the clinically established TIRADS scoring system. XML-based ROI extraction and dataset augmentation improved generalisation on limited medical data.",
    impact:
      "Peer-reviewed and published in the Proceedings of ICICC-2025 by Springer LNNS (ISSN 2367-3389).",
    highlights: [
      "Dual VGG16 bilinear architecture for fine-grained texture",
      "Output aligned with clinical TIRADS diagnostic standards",
      "XML-based ROI extraction + augmentation for small medical datasets",
      "Published in Springer LNNS — internationally peer-reviewed",
    ],
    tech: ["Python", "TensorFlow", "VGG16", "OpenCV", "NumPy", "XML Parsing"],
    image: "/projects/thyroid.png",
    links: [],
  },
  {
    id: "robotic-arm",
    index: "06",
    title: "Colour-Sorting Robotic Arm",
    tagline: "Detect, classify, pick, place — hands off",
    context: "Robotics · Arduino hardware",
    problem:
      "Sorting objects by colour is a repetitive manual task that's trivially automatable — with the right sensing and actuation loop.",
    built:
      "An Arduino Uno system: a TCS3200 colour sensor handles real-time RGB detection and classification, servo motors drive precise multi-axis arm positioning, and an electromagnet grips and releases objects without contact.",
    impact:
      "A fully autonomous sorting loop — detects, classifies, picks, and places with no manual input once calibrated.",
    highlights: [
      "TCS3200 real-time RGB detection and classification",
      "Servo-driven multi-axis positioning",
      "Electromagnet for contactless grip and release",
      "Zero-touch operation after calibration",
    ],
    tech: ["Arduino Uno", "C++", "TCS3200", "Servo Motors", "Electromagnet"],
    image: "/projects/robot.png",
    links: [],
  },
  {
    id: "racing-sim",
    index: "07",
    title: "Racing Simulator Rig",
    tagline: "Sim-racing hardware at a fraction of retail",
    context: "Hardware · built from scratch",
    problem:
      "Commercial sim-racing rigs cost more than most people will pay to find out if they love the hobby.",
    built:
      "A custom peripheral on a repurposed gaming-controller motherboard: a handcrafted steering wheel with paddle shifters and control buttons, plus potentiometer-based pedals delivering analogue throttle, brake, and clutch. Chassis, wiring, and calibration all fabricated from scratch.",
    impact:
      "A realistic sim-racing experience at a fraction of commercial cost — plug-and-play with any console or PC.",
    highlights: [
      "Handcrafted wheel with paddle shifters and control buttons",
      "Potentiometer pedals: analogue throttle, brake, clutch",
      "Repurposed controller PCB — plug-and-play everywhere",
      "Fabricated end to end: chassis, wiring, calibration",
    ],
    tech: [
      "Electronics",
      "Potentiometers",
      "Gaming Controller PCB",
      "Custom Fabrication",
    ],
    image: "/projects/leaf.png",
    links: [],
  },
];

export const skills = {
  clusters: [
    {
      name: "LLM & Generative AI",
      items: [
        "LangChain",
        "OpenAI API",
        "Gemini",
        "Anthropic",
        "RAG",
        "LightRAG",
        "FAISS",
        "SentenceTransformers",
        "HuggingFace",
        "Ollama",
        "Prompt Engineering",
      ],
    },
    {
      name: "Agentic AI & Automation",
      items: [
        "n8n",
        "Make.com",
        "Agentic Workflows",
        "Claude Code",
        "ElevenLabs Voice AI",
        "Twilio",
      ],
    },
    {
      name: "Languages & Frameworks",
      items: ["Python", "Java", "C", "FastAPI", "Streamlit", "JavaScript"],
    },
    {
      name: "Data & Analytics",
      items: ["MySQL", "Google BigQuery", "Power BI", "Pandas", "NumPy"],
    },
    {
      name: "Hardware & Robotics",
      items: ["Arduino", "Sensors & Servos", "Custom Fabrication"],
    },
    {
      name: "Tooling & Deploy",
      items: ["GitHub", "Docker", "Vercel"],
    },
  ],
};

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  kind: "work" | "research" | "education" | "leadership" | "certification";
  points: string[];
};

export const timeline: TimelineEntry[] = [
  {
    period: "Feb 2026 — July 2026",
    title: "AI & Automations Intern",
    org: "Tericsoft Technology Solutions, Hyderabad",
    kind: "work",
    points: [
      "Officially engaged as an AI & Automations Intern within Tericsoft's engineering team, developing automation workflows and intelligent agent systems for internal operations and client-facing products",
      "Built and deployed agentic pipelines integrating LLMs, voice AI, and data platforms across multiple production projects under Tericsoft's engineering umbrella",
      "Built an internal AI chatbot that acts as a virtual Engineering Manager with access to company-wide engineering data, used by the CTO to understand team performance and manage the entire engineering organization",
      "Built an end-to-end n8n automation workflow that performs competitor analysis and keyword research, then auto-generates SEO-optimized blog content for publishing on the company website — reducing manual content research and drafting time",
      "Trusted with ownership of internal AI tooling initiatives, working directly with engineering and operations stakeholders to identify, design, and deploy automation solutions used across teams",
    ],
  },
];
