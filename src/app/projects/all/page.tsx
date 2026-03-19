import type { Metadata } from "next";
import { Suspense } from "react";
import { AllProjectsClient } from "./client";
import {
  projects,
  getAllCategories,
  getAllYears,
  getProjectsByYear,
} from "@/data/projects";
import { BreadcrumbSchema, siteConfig } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "All Projects - Chronological",
  description:
    "Complete chronological timeline of 24 production AI & full-stack projects from 2020 to 2026.",
  openGraph: {
    title: "All Projects | Kevin Chung",
    description: "Complete chronological timeline of AI & full-stack works.",
    url: `${siteConfig.url}/projects/all`,
  },
};

// ISR: Revalidate every hour
export const revalidate = 3600;

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500" />
      </div>
    </div>
  );
}

export default function AllProjectsPage() {
  const categories = getAllCategories();
  const years = getAllYears();
  const projectsByYear = getProjectsByYear();

  // Convert Map to serializable object for client component
  const projectsByYearObj: Record<number, typeof projects> = {};
  projectsByYear.forEach((value, key) => {
    projectsByYearObj[key] = value;
  });

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
          { name: "All Projects", url: "/projects/all" },
        ]}
      />
      <Suspense fallback={<LoadingSkeleton />}>
        <AllProjectsClient
          projectsByYear={projectsByYearObj}
          categories={categories}
          years={years}
          totalCount={projects.length}
        />
      </Suspense>
    </>
  );
}
