export interface TimelineEvent {
  year: string;
  title: string;
  company: string;
  description: string;
  highlights: string[];
  type: "work" | "education" | "milestone";
}

export interface Skill {
  name: string;
  icon: string;
  category: "ml" | "backend" | "devops" | "frontend" | "data";
  proficiency: number; // 0-100
}

export const bio = {
  name: "Kevin Chung",
  title: "AI Engineer & Full-Stack Developer",
  location: "California, USA",
  tagline:
    "Formerly led AI at Quackshift. I specialize in production MLOps, real-time computer vision, and full-stack AI integration.",
  description: `I'm an AI Engineer passionate about turning cutting-edge research into production systems that actually work. With 15+ years of experience shipping ML models at scale, I've learned that the hardest part isn't building the model—it's making it reliable, fast, and maintainable.

When I'm not optimizing inference latency or debugging data pipelines, you'll find me exploring California's tech scene, practicing kendo, or contributing to open-source ML tools.`,
  email: "kevinchung523@outlook.com",
  github: "https://github.com/kevindev523",
  x: "",
  telegram: "",
};

export const timeline: TimelineEvent[] = [
  {
    year: "2020-2026",
    title: "Sr. Web Developer",
    company: "NVIDIA",
    description:
      "Lead development of high-performance, scalable web applications and maintain enterprise-level websites with a focus on usability and visual excellence. Collaborate with cross-functional teams, optimize front-end performance, and ensure code quality through best practices and modern development standards.",
    highlights: [],
    type: "work",
  },
  {
    year: "2019-2020",
    title: "Sr. Web Developer",
    company: "Mellanox Technologies",
    description:
      "Developed and maintained responsive web applications and internal tools while collaborating with design and product teams to implement UI/UX improvements. Enhanced system performance and reliability through efficient coding practices.",
    highlights: [],
    type: "work",
  },
  {
    year: "2015-2019",
    title: "Sr. Web Developer / Software Engineer",
    company: "NETSCOUT",
    description:
      "Built and maintained enterprise web solutions for network performance monitoring, designing scalable front-end architectures, integrating backend services, and improving application responsiveness and system efficiency.",
    highlights: [],
    type: "work",
  },
  {
    year: "2009-2015",
    title: "Sr. Software Engineer / Web Developer",
    company: "Fluke Corporation",
    description:
      "Developed web-based tools for network diagnostics and analytics, contributing to the full software development lifecycle and collaborating with teams to deliver reliable, high-quality software products.",
    highlights: [],
    type: "work",
  },
  {
    year: "2004-2009",
    title: "Software Engineer / Web Developer",
    company: "Air Magnet Inc",
    description:
      "Completed an internship during university, gaining practical experience and applying academic knowledge in a professional setting.",
    highlights: [],
    type: "work",
  },
];

export const skills: Skill[] = [
  // ML & AI
  { name: "PyTorch", icon: "🔥", category: "ml", proficiency: 95 },
  { name: "TensorFlow", icon: "🧠", category: "ml", proficiency: 85 },
  { name: "LangChain", icon: "🔗", category: "ml", proficiency: 90 },
  { name: "Transformers", icon: "🤖", category: "ml", proficiency: 92 },
  { name: "scikit-learn", icon: "📊", category: "ml", proficiency: 90 },
  { name: "OpenAI", icon: "✨", category: "ml", proficiency: 92 },
  { name: "Hugging Face", icon: "🤗", category: "ml", proficiency: 88 },
  { name: "LightGBM", icon: "⚡", category: "ml", proficiency: 85 },
  { name: "FAISS", icon: "🔍", category: "ml", proficiency: 87 },
  { name: "Stable Diffusion", icon: "🎨", category: "ml", proficiency: 82 },
  { name: "Ollama", icon: "🦙", category: "ml", proficiency: 85 },
  { name: "MLflow", icon: "📈", category: "ml", proficiency: 88 },
  { name: "Evidently AI", icon: "📉", category: "ml", proficiency: 80 },

  // Backend
  { name: "Python", icon: "🐍", category: "backend", proficiency: 98 },
  { name: "FastAPI", icon: "⚡", category: "backend", proficiency: 95 },
  { name: "Node.js", icon: "💚", category: "backend", proficiency: 85 },
  { name: "Flask", icon: "🌶️", category: "backend", proficiency: 88 },
  { name: "tRPC", icon: "🔄", category: "backend", proficiency: 82 },

  // Frontend
  { name: "React", icon: "⚛️", category: "frontend", proficiency: 88 },
  { name: "TypeScript", icon: "💙", category: "frontend", proficiency: 90 },
  { name: "Next.js", icon: "▲", category: "frontend", proficiency: 85 },
  { name: "Vite", icon: "⚡", category: "frontend", proficiency: 83 },
  { name: "Tailwind CSS", icon: "🎨", category: "frontend", proficiency: 92 },
  { name: "Framer Motion", icon: "🎬", category: "frontend", proficiency: 85 },
  { name: "Three.js", icon: "🎲", category: "frontend", proficiency: 78 },
  { name: "GSAP", icon: "🎭", category: "frontend", proficiency: 80 },
  { name: "Streamlit", icon: "📊", category: "frontend", proficiency: 85 },
  { name: "Gradio", icon: "🎛️", category: "frontend", proficiency: 82 },

  // DevOps & Cloud
  { name: "Docker", icon: "🐳", category: "devops", proficiency: 92 },
  { name: "Kubernetes", icon: "☸️", category: "devops", proficiency: 88 },
  { name: "AWS", icon: "☁️", category: "devops", proficiency: 90 },
  { name: "Vercel", icon: "▲", category: "devops", proficiency: 85 },
  { name: "Argo CD", icon: "🚀", category: "devops", proficiency: 83 },
  { name: "Databricks", icon: "🧱", category: "devops", proficiency: 82 },
  { name: "Nginx", icon: "🌐", category: "devops", proficiency: 85 },

  // Data & Databases
  { name: "PostgreSQL", icon: "🐘", category: "data", proficiency: 90 },
  { name: "MongoDB", icon: "🍃", category: "data", proficiency: 88 },
  { name: "Redis", icon: "🔴", category: "data", proficiency: 88 },
  { name: "Elasticsearch", icon: "🔎", category: "data", proficiency: 85 },
  { name: "Prisma", icon: "💎", category: "data", proficiency: 87 },
  { name: "PySpark", icon: "⚡", category: "data", proficiency: 83 },
  { name: "Delta Lake", icon: "🏞️", category: "data", proficiency: 80 },
];

export const currentlyListening = {
  track: "Asterisk",
  artist: "Orange Range",
  album: "musiQ",
  albumArt: "/spotify/asterisk.jpg",
  spotifyUrl: "https://open.spotify.com/search/Orange%20Range%20Asterisk",
};
