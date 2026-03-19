import type { ReactNode } from "react";

// Base URL for the site
export const siteConfig = {
  url: "https://kevinchung.dev",
  name: "Kevin Chung",
  title:
    "Kevin Chung | AI Engineer, Full-Stack Developer & SaaS Architect Portfolio",
  description:
    "Hire Kevin Chung - Senior AI Engineer & Full-Stack Developer in Japan specializing in production AI systems, LLM development, RAG, SaaS architecture, and MLOps. 8+ years building scalable AI applications with PyTorch, TensorFlow, Next.js, Python. Proven results: +20% forecasting accuracy, +15% model performance, $10M+ business value. Available for freelance AI consulting and full-stack development projects.",
  locale: "en_US",
  twitter: "@Kevin010718",
  image: "/og-image.png",
};

// Person schema
export function PersonSchema() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kevin Chung",
    url: siteConfig.url,
    image: `${siteConfig.url}/avatar.png`,
    sameAs: [
      "https://github.com/kevinchung",
      "https://x.com/Kevin010718",
      "https://t.me/kevinchung",
      "https://www.linkedin.com/in/kevinchung",
    ],
    jobTitle: "AI Engineer, Full-Stack Developer & SaaS Architect",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fukuoka",
      addressCountry: "JP",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Large Language Models",
      "LLM Development",
      "RAG Systems",
      "Computer Vision",
      "Natural Language Processing",
      "MLOps",
      "AI Engineering",
      "SaaS Development",
      "SaaS Architecture",
      "Full-Stack Development",
      "Cloud Architecture",
      "Microservices",
      "API Development",
      "PyTorch",
      "TensorFlow",
      "LangChain",
      "OpenAI",
      "Python",
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
      "FastAPI",
      "Flask",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "AWS",
      "Azure",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "DevOps",
      "Databricks",
      "MLflow",
      "Demand Forecasting",
      "Predictive Analytics",
      "Time Series Analysis",
      "Chatbot Development",
      "AI Automation",
      "Web3",
      "Blockchain",
    ],
    description: siteConfig.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
    />
  );
}

// Website schema
export function WebsiteSchema() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: "Kevin Chung",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/projects?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
    />
  );
}

// Breadcrumb schema
export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${siteConfig.url}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
    />
  );
}

// Profile page schema
export function ProfilePageSchema() {
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Kevin Chung",
      alternateName: "朽木 恋次",
      description: siteConfig.description,
      image: `${siteConfig.url}/avatar.png`,
    },
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
    />
  );
}

// FAQ Schema for SEO
export function FAQSchema() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What AI technologies does Kevin Chung specialize in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kevin Chung specializes in Large Language Models (LLMs), RAG systems, computer vision, NLP, MLOps, and production AI deployment. Expert in PyTorch, TensorFlow, LangChain, OpenAI, and Hugging Face transformers.",
        },
      },
      {
        "@type": "Question",
        name: "What full-stack technologies does Kevin Chung use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Full-stack expertise includes React, Next.js, TypeScript, Node.js, Python, FastAPI, Flask, PostgreSQL, MongoDB, Redis, and modern cloud platforms (AWS, Azure, GCP). Experienced in building scalable SaaS applications and microservices.",
        },
      },
      {
        "@type": "Question",
        name: "What types of SaaS projects has Kevin Chung built?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Built production SaaS applications including AI chatbots, demand forecasting systems, customer segmentation platforms, recommendation engines, and MLOps pipelines. Delivered $10M+ in measurable business value across 16+ production projects.",
        },
      },
      {
        "@type": "Question",
        name: "Does Kevin Chung offer freelance AI development services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, available for freelance AI engineering, full-stack development, and SaaS architecture consulting. Specializes in building production-ready AI systems, LLM applications, and scalable cloud infrastructure.",
        },
      },
      {
        "@type": "Question",
        name: "What is Kevin Chung's experience with MLOps?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Extensive MLOps experience including model deployment, CI/CD pipelines, monitoring, drift detection, and automated retraining. Proficient with MLflow, Databricks, Docker, Kubernetes, and cloud-native ML platforms.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
    />
  );
}

// Combine all schemas
export function StructuredData({ children }: { children?: ReactNode }) {
  return (
    <>
      <PersonSchema />
      <WebsiteSchema />
      <ProfilePageSchema />
      <FAQSchema />
      {children}
    </>
  );
}
