"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Filter, X } from "lucide-react";
import { ProjectCard } from "@/components/project";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

interface AllProjectsClientProps {
  projectsByYear: Record<number, Project[]>;
  categories: string[];
  years: number[];
  totalCount: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export function AllProjectsClient({
  projectsByYear,
  categories,
  years,
  totalCount,
}: AllProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Filter projects by category
  const filteredProjectsByYear = useMemo(() => {
    if (!activeFilter) return projectsByYear;

    const filtered: Record<number, Project[]> = {};
    Object.entries(projectsByYear).forEach(([year, projects]) => {
      const yearProjects = projects.filter((p) =>
        p.categories.includes(activeFilter)
      );
      if (yearProjects.length > 0) {
        filtered[Number(year)] = yearProjects;
      }
    });
    return filtered;
  }, [projectsByYear, activeFilter]);

  const filteredYears = useMemo(() => {
    return Object.keys(filteredProjectsByYear)
      .map(Number)
      .sort((a, b) => b - a);
  }, [filteredProjectsByYear]);

  const filteredCount = useMemo(() => {
    return Object.values(filteredProjectsByYear).reduce(
      (sum, projects) => sum + projects.length,
      0
    );
  }, [filteredProjectsByYear]);

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Header */}
      <section className="relative overflow-hidden pb-8 pt-24 sm:pb-12 sm:pt-32">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">
              <Calendar className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                Timeline View
              </span>
            </div>
            <h1 className="mb-3 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                All Projects
              </span>
            </h1>
            <p className="text-white/50">
              {activeFilter
                ? `${filteredCount} projects in ${activeFilter}`
                : `${totalCount} projects from ${years[years.length - 1]} to ${years[0]}`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/80 py-4 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-4">
            {/* Active Filter Badge */}
            {activeFilter && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setActiveFilter(null)}
                className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-3 py-1.5 text-sm text-purple-300 transition-colors hover:bg-purple-500/30"
              >
                <Filter className="h-3 w-3" />
                {activeFilter}
                <X className="h-3 w-3" />
              </motion.button>
            )}

            {/* Filter Chips */}
            <div className="scrollbar-hide flex-1 overflow-x-auto">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveFilter(null)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                    "border backdrop-blur-sm",
                    !activeFilter
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-white/5 bg-white/5 text-white/50 hover:border-white/10 hover:text-white/70"
                  )}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={cn(
                      "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                      "border backdrop-blur-sm",
                      activeFilter === category
                        ? "border-white/20 bg-white/10 text-white"
                        : "border-white/5 bg-white/5 text-white/50 hover:border-white/10 hover:text-white/70"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter || "all"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {filteredYears.map((year) => (
                <div key={year} className="relative">
                  {/* Year Separator */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-8 flex items-center gap-4"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10">
                      <span className="text-xl font-bold text-purple-300">
                        {year}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="h-px w-full bg-gradient-to-r from-purple-500/30 to-transparent" />
                    </div>
                    <span className="text-sm text-white/40">
                      {filteredProjectsByYear[year]?.length || 0} project
                      {(filteredProjectsByYear[year]?.length || 0) !== 1
                        ? "s"
                        : ""}
                    </span>
                  </motion.div>

                  {/* Projects Grid */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
                  >
                    {filteredProjectsByYear[year]?.map((project, index) => (
                      <motion.div key={project.slug} variants={itemVariants}>
                        <ProjectCard
                          project={project}
                          variant="list"
                          index={index}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredYears.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                No projects found
              </h3>
              <p className="mb-4 text-white/50">
                No projects match the selected filter
              </p>
              <button
                onClick={() => setActiveFilter(null)}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10"
              >
                Clear filter
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
          >
            <p className="mb-4 text-white/60">
              Interested in collaborating on a project?
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-500/25"
              >
                Get in Touch
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10"
              >
                Featured Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
