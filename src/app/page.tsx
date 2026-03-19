import type { Metadata } from "next";
import { BreadcrumbSchema, siteConfig } from "@/lib/structured-data";
import { HomePage } from "@/components/home";

export const metadata: Metadata = {
  title:
    "Kevin Chung | AI Engineer & Full-Stack Developer Portfolio - Hire for LLM, SaaS & MLOps Projects",
  description:
    "Professional AI Engineer & Full-Stack Developer portfolio. Specializing in LLM development, RAG systems, SaaS architecture, and production MLOps. 16+ AI projects, 8+ years experience. Available for freelance consulting in Japan and remote. Expert in PyTorch, TensorFlow, Next.js, Python, AWS. Proven track record: +20% accuracy improvements, $10M+ business value delivered.",
  keywords: [
    // Primary keywords
    "AI engineer portfolio",
    "full-stack developer portfolio",
    "hire AI engineer",
    "freelance AI developer",
    "AI consultant Japan",
    "machine learning engineer",

    // Location-based
    "AI engineer California",
    "AI developer USA",
    "remote AI engineer",
    "freelance developer USA",

    // Service-based
    "LLM development services",
    "RAG system development",
    "SaaS architecture consulting",
    "MLOps consulting",
    "AI chatbot development",
    "custom AI solutions",

    // Technology-specific
    "PyTorch developer",
    "TensorFlow engineer",
    "Next.js developer",
    "Python AI developer",
    "OpenAI integration",
    "LangChain developer",

    // Project-based
    "AI project portfolio",
    "machine learning projects",
    "production AI systems",
    "enterprise AI solutions",

    // Experience-based
    "senior AI engineer",
    "15 years AI experience",
    "AI team lead",
    "ML engineer portfolio",
  ],
  authors: [{ name: "Kevin Chung", url: siteConfig.url }],
  creator: "Kevin Chung",
  publisher: "Kevin Chung",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Kevin Chung - AI Engineer Portfolio",
    title:
      "Kevin Chung | AI Engineer & Full-Stack Developer - Hire for AI Projects",
    description:
      "Professional AI Engineer with 15+ years experience. Specializing in LLM, RAG, SaaS, and MLOps. 16+ production projects. Available for freelance consulting. Expert in PyTorch, TensorFlow, Next.js, Python.",
    images: [
      {
        url: "/api/og?title=Kevin%20Chung&subtitle=AI%20Engineer%2C%20Full-Stack%20Developer%20%26%20SaaS%20Architect",
        width: 1200,
        height: 630,
        alt: "Kevin Chung - AI Engineer, Full-Stack Developer & SaaS Architect Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Kevin010718",
    creator: "@Kevin010718",
    title: "Kevin Chung | AI Engineer & Full-Stack Developer Portfolio",
    description:
      "Professional AI Engineer with 15+ years experience. Specializing in LLM, RAG, SaaS, and MLOps. 16+ production projects. Available for freelance consulting.",
    images: [
      "/api/og?title=Kevin%20Chung&subtitle=AI%20Engineer%2C%20Full-Stack%20Developer%20%26%20SaaS%20Architect",
    ],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-site-verification": "your-verification-code-here",
  },
};

export default function Home() {
  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }]} />

      {/* Home page content (client component) */}
      <HomePage />
    </>
  );
}
