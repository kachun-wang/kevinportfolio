import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "./detail-client";
import { projects, getProjectBySlug } from "@/data/projects";
import { BreadcrumbSchema, siteConfig } from "@/lib/structured-data";

// Instant page transitions - no animations
export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Pre-generate all project pages
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  // Dynamic OG image using the project's default image or API route
  const ogImage = project.defaultImage.startsWith("/")
    ? `${siteConfig.url}${project.defaultImage}`
    : `/api/og?title=${encodeURIComponent(project.title)}&subtitle=${encodeURIComponent(project.impact)}&type=project`;

  return {
    title: project.title,
    description: project.description,
    keywords: [...project.categories, ...project.techStack],
    authors: [{ name: "Kevin Chung", url: siteConfig.url }],
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      authors: ["Kevin Chung"],
      url: `${siteConfig.url}/projects/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      creator: siteConfig.twitter,
      images: [ogImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: project.title,
    description: project.description,
    image: project.defaultImage,
    dateModified: new Date().toISOString().split("T")[0],
    author: {
      "@type": "Person",
      name: "Kevin Chung",
      jobTitle: "AI Engineer",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: "Kevin Chung",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/projects/${slug}`,
    },
    keywords: [...project.categories, ...project.techStack].join(", "),
    articleSection: project.categories[0] || "AI/ML Case Study",
    about: {
      "@type": "Thing",
      name: project.categories[0] || "Technology",
    },
  };

  // Breadcrumb items
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: project.title, url: `/projects/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <ProjectDetailClient project={project} />
    </>
  );
}
