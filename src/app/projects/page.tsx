import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectsPageClient } from "./client";
import { projects, getAllCategories } from "@/data/projects";
import { BreadcrumbSchema, siteConfig } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore 24 production AI & full-stack projects, from demand forecasting to real-time computer vision systems. Each project showcases production-ready solutions with measurable impact.",
  openGraph: {
    title: "Projects | Kevin Chung",
    description:
      "24 production AI & full-stack works with real impact metrics.",
    url: `${siteConfig.url}/projects`,
    images: [
      {
        url: `/api/og?title=Projects&subtitle=24%20Production%20AI%20%26%20Full-Stack%20Works`,
        width: 1200,
        height: 630,
        alt: "Kevin Chung Projects",
      },
    ],
  },
};

// ISR: Revalidate every hour
export const revalidate = 3600;

// Loading skeleton for Suspense
function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500" />
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const categories = getAllCategories();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
        ]}
      />
      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsPageClient projects={projects} categories={categories} />
      </Suspense>
    </>
  );
}
