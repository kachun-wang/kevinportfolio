export interface ProjectLink {
  label: string;
  url: string;
}

/**
 * Project summary for listings and cards
 */
export interface Project {
  /** Project title */
  title: string;
  /** URL-friendly slug (kebab-case) */
  slug: string;
  /** Key metric or impact statement (e.g. "+20% forecasting accuracy") */
  impact: string;
  /** Short description (2-3 sentences) */
  description: string;
  /** Path to hero/default image (e.g. "/projects/slug/hero.webp") */
  defaultImage: string;
  /** Gallery image paths (2-5 images) */
  gallery: string[];
  /** Technical highlights as bullet points */
  technicalHighlights: string[];
  /** Challenges faced and solutions implemented */
  challengesSolutions: string[];
  /** Optional external links (GitHub, live demo, etc.) */
  links?: ProjectLink[];
  /** Project categories (e.g. ["AI/ML", "Predictive Modeling"]) */
  categories: string[];
  /** Technologies used (e.g. ["PyTorch", "FastAPI"]) */
  techStack: string[];
  /** Year the project was completed (for chronological sorting) */
  year: number;
}

/**
 * Detailed project information for case study pages
 */
export interface ProjectDetails {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  ogImage: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  metrics: {
    value: string;
    label: string;
    description: string;
  }[];
  problem: {
    title: string;
    description: string;
    painPoints: string[];
  };
  solution: {
    title: string;
    description: string;
    highlights: string[];
  };
  architecture: {
    title: string;
    description: string;
    layers: {
      name: string;
      description: string;
      tech: string[];
    }[];
  };
  results: {
    title: string;
    description: string;
    achievements: {
      metric: string;
      value: string;
      comparison?: string;
    }[];
  };
  techStack: {
    name: string;
    icon: string;
    category: "ml" | "backend" | "frontend" | "infra" | "data";
  }[];
  codeSnippets: {
    title: string;
    language: string;
    code: string;
    description: string;
  }[];
  testimonials: {
    quote: string;
    author: string;
    role: string;
    company: string;
  }[];
  tableOfContents: {
    id: string;
    title: string;
  }[];
  beforeAfter?: {
    before: {
      title: string;
      description: string;
      metrics: string[];
    };
    after: {
      title: string;
      description: string;
      metrics: string[];
    };
  };
}

export type ProjectCategory =
  | "AI/ML"
  | "Computer Vision"
  | "NLP"
  | "Predictive Modeling"
  | "Data Engineering"
  | "Full-Stack"
  | "DevOps/MLOps"
  | "Real-Time Systems"
  | "LLM/GenAI"
  | "Open Source";
