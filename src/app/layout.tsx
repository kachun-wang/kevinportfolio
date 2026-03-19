import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar";
import { StructuredData, siteConfig } from "@/lib/structured-data";
import { WebGLErrorSuppressor } from "@/components/webgl-error-suppressor";
import "./globals.css";

// Primary sans-serif font with full Latin subset
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "arial"],
});

// Display font for headings - reduced weights
const fontDisplay = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Monospace font for code - lazy load since it's not critical
const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Kevin Chung",
  },
  description: siteConfig.description,
  keywords: [
    // AI & Machine Learning
    "AI Engineer",
    "Machine Learning Engineer",
    "Deep Learning Engineer",
    "AI Developer",
    "ML Engineer",
    "MLOps Engineer",
    "AI Specialist",
    "Artificial Intelligence Engineer",

    // LLM & NLP
    "LLM Engineer",
    "Large Language Model Developer",
    "ChatGPT Developer",
    "OpenAI Developer",
    "RAG Developer",
    "Retrieval Augmented Generation",
    "NLP Engineer",
    "Natural Language Processing",
    "Chatbot Developer",
    "AI Chatbot Development",
    "LangChain Developer",

    // Computer Vision
    "Computer Vision Engineer",
    "Image Recognition",
    "Object Detection",
    "CV Engineer",

    // Full-Stack Development
    "Full-Stack Developer",
    "Full-Stack Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Software Engineer",
    "JavaScript Developer",
    "TypeScript Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Python Developer",

    // SaaS & Cloud
    "SaaS Developer",
    "SaaS Engineer",
    "SaaS Architect",
    "Cloud Engineer",
    "Cloud Architect",
    "AWS Developer",
    "Azure Developer",
    "Serverless Developer",
    "Microservices Developer",
    "API Developer",
    "REST API",
    "GraphQL",

    // Specific Technologies
    "PyTorch",
    "TensorFlow",
    "Keras",
    "scikit-learn",
    "Hugging Face",
    "FastAPI",
    "Flask",
    "Django",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Kubernetes",
    "CI/CD",

    // MLOps & Data
    "MLOps",
    "DataOps",
    "ML Pipeline",
    "Model Deployment",
    "Databricks",
    "MLflow",
    "Data Engineering",
    "ETL Developer",
    "Big Data",

    // Specialized AI
    "Demand Forecasting",
    "Time Series Forecasting",
    "Predictive Analytics",
    "Recommendation Systems",
    "Anomaly Detection",
    "Sentiment Analysis",

    // Location
    "California",
    "USA",
    "Remote Developer",
    "Freelance Developer",

    // Industry
    "AI Consultant",
    "Tech Consultant",
    "Startup CTO",
    "Technical Lead",
  ],
  authors: [{ name: "Kevin Chung", url: siteConfig.url }],
  creator: "Kevin Chung",
  publisher: "Kevin Chung",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/profile.png", type: "image/png", sizes: "any" }],
    apple: [{ url: "/profile.png", type: "image/png", sizes: "180x180" }],
    shortcut: [{ url: "/profile.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kevin Chung - AI Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitter,
    images: ["/og-image.png"],
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
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
  },
  alternates: {
    canonical: siteConfig.url,
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://vercel.live" />

        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Preload critical assets */}
        <link rel="preload" href="/profile.png" as="image" type="image/png" />

        {/* Minimal structured data - defer full schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kevin Chung",
              jobTitle: "AI Engineer & Full-Stack Developer",
              url: siteConfig.url,
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${fontDisplay.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <WebGLErrorSuppressor />
        <Providers>
          <Navbar />
          {children}
        </Providers>

        {/* Vercel Analytics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
