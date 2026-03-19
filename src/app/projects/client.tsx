"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { Sparkles, ArrowDown, Search } from "lucide-react";
import { ProjectCard } from "@/components/project";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

const CATEGORY_PARAM = "category";

interface ProjectsPageClientProps {
  projects: Project[];
  categories: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export function ProjectsPageClient({
  projects,
  categories,
}: ProjectsPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const fullListRef = useRef<HTMLDivElement>(null);
  const isFullListInView = useInView(fullListRef, {
    once: true,
    margin: "-100px",
  });

  // Sync URL ?category=... to state on mount and when URL changes
  useEffect(() => {
    const category = searchParams.get(CATEGORY_PARAM);
    const valid = category && categories.includes(category) ? category : null;
    setActiveFilter(valid);
  }, [searchParams, categories]);

  const handleCategoryChange = (category: string | null) => {
    setActiveFilter(category);
    const url = category
      ? `/projects?${CATEGORY_PARAM}=${encodeURIComponent(category)}`
      : "/projects";
    router.replace(url, { scroll: false });
  };

  // Sort projects by year descending (newest first) so recent work (e.g. Zitro) is visible
  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => (b.year ?? 0) - (a.year ?? 0)),
    [projects]
  );

  // Featured projects (first 6 by newest) – when filtering, show filtered set
  const featuredProjects = useMemo(() => {
    const base = activeFilter
      ? sortedProjects.filter((p) => p.categories.includes(activeFilter))
      : sortedProjects;
    return base.slice(0, 6);
  }, [sortedProjects, activeFilter]);

  // Filtered projects (newest first)
  const filteredProjects = useMemo(() => {
    if (!activeFilter) return sortedProjects;
    return sortedProjects.filter((p) => p.categories.includes(activeFilter));
  }, [sortedProjects, activeFilter]);

  // Projects to display in grid (all or limited)
  const displayedProjects = useMemo(() => {
    if (showAllProjects) return filteredProjects;
    return filteredProjects.slice(0, 12);
  }, [filteredProjects, showAllProjects]);

  const scrollToFullList = () => {
    fullListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen min-w-0 overflow-x-hidden bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-32">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950" />
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]"
          />
        </div>

        <div className="relative z-10 mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2"
            >
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                Portfolio
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-auto max-w-2xl text-lg text-white/50 sm:text-xl"
            >
              <span className="font-semibold text-white/70">24</span> production
              AI & full-stack works with{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold text-transparent">
                real impact metrics
              </span>
            </motion.p>

            {/* Year range hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center justify-center gap-4 text-sm text-white/40"
            >
              <span>2020</span>
              <div className="h-px w-20 bg-gradient-to-r from-purple-500/50 to-cyan-500/50" />
              <span className="font-medium text-white/60">2026</span>
            </motion.div>

            {/* Search by category – visible in hero */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <p className="mb-3 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wider text-white/50">
                <Search className="h-3.5 w-3.5" />
                Search by category
              </p>
              <div className="scrollbar-hide -mx-4 flex justify-center overflow-x-auto overflow-y-hidden px-4 sm:mx-0 sm:flex-wrap sm:gap-2 [contain:inline-size]">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategoryChange(null)}
                  className={cn(
                    "flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:py-2 sm:text-sm",
                    "border backdrop-blur-sm",
                    !activeFilter
                      ? "border-purple-500/50 bg-purple-500/20 text-purple-300"
                      : "border-white/10 bg-black/30 text-white/60 hover:border-white/20 hover:text-white/80"
                  )}
                >
                  All
                </motion.button>
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategoryChange(cat)}
                    className={cn(
                      "flex-shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:py-2 sm:text-sm",
                      "border backdrop-blur-sm",
                      activeFilter === cat
                        ? "border-purple-500/50 bg-purple-500/20 text-purple-300"
                        : "border-white/10 bg-black/30 text-white/60 hover:border-white/20 hover:text-white/80"
                    )}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Featured Work
              </h2>
              <p className="mt-1 text-white/50">
                Highlights from recent projects
              </p>
            </div>
            <motion.button
              onClick={scrollToFullList}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 sm:flex"
            >
              View All 24
              <ArrowDown className="h-4 w-4" />
            </motion.button>
          </motion.div>

          {/* Featured Grid - Bento style */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                variants={itemVariants}
                className={cn(
                  index === 0 && "md:col-span-2 lg:col-span-2 lg:row-span-2"
                )}
              >
                <ProjectCard
                  project={project}
                  variant={index === 0 ? "featured" : "list"}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button (Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 flex justify-center sm:hidden"
          >
            <motion.button
              onClick={scrollToFullList}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-purple-500/25"
            >
              View All 24 Projects
              <ArrowDown className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Full Project List Section */}
      <section
        ref={fullListRef}
        className="relative py-16 sm:py-24"
        id="all-projects"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Section Header with Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFullListInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8 space-y-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  All Projects
                </h2>
                <p className="mt-1 text-white/50">
                  {activeFilter
                    ? `${filteredProjects.length} projects in ${activeFilter}`
                    : `${projects.length} projects across all categories`}
                </p>
              </div>
            </div>

            {/* Category Filters */}
            <div className="scrollbar-hide -mx-4 overflow-x-auto overflow-y-hidden px-4 sm:mx-0 sm:overflow-visible sm:px-0 [contain:inline-size]">
              <div className="flex min-w-max gap-2 pb-2 sm:flex-wrap sm:gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryChange(null)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all",
                    "border backdrop-blur-sm",
                    !activeFilter
                      ? "border-purple-500/50 bg-purple-500/20 text-purple-300"
                      : "border-white/10 bg-black/30 text-white/60 hover:border-white/20 hover:text-white/80"
                  )}
                >
                  All
                </motion.button>
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryChange(category)}
                    className={cn(
                      "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all",
                      "border backdrop-blur-sm",
                      activeFilter === category
                        ? "border-purple-500/50 bg-purple-500/20 text-purple-300"
                        : "border-white/10 bg-black/30 text-white/60 hover:border-white/20 hover:text-white/80"
                    )}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Projects Grid – key only by filter so "Show All" just adds cards without remounting */}
          <motion.div
            key={activeFilter || "all"}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
          >
            {displayedProjects.map((project, index) => (
              <motion.div key={project.slug} variants={itemVariants}>
                <ProjectCard project={project} variant="list" index={index} />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                No projects found
              </h3>
              <p className="text-white/50">
                Try selecting a different category
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange(null)}
                className="mt-4 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10"
              >
                Clear filter
              </motion.button>
            </motion.div>
          )}

          {/* Load More / Show Less */}
          {filteredProjects.length > 12 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAllProjects(!showAllProjects)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-8 py-3",
                  "border border-white/10 bg-white/5 backdrop-blur-sm",
                  "text-sm font-medium text-white/80",
                  "transition-all hover:border-white/20 hover:bg-white/10"
                )}
              >
                {showAllProjects ? (
                  <>Show Less</>
                ) : (
                  <>
                    Show All {filteredProjects.length} Projects
                    <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-300">
                      +{filteredProjects.length - 12}
                    </span>
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 p-8 backdrop-blur-sm sm:p-12"
          >
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mb-8 text-white/50">
              I'm always open to discussing new opportunities and interesting
              projects.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-3 font-medium text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-xl hover:shadow-purple-500/30"
              >
                Get in Touch
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3 font-medium text-white/80 transition-colors hover:bg-white/10"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
