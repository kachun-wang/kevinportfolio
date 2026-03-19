"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Zap, Search, X } from "lucide-react";
import { ProjectCard } from "@/components/project";
import { projects, getAllCategories } from "@/data/projects";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";
function CategoryFilters({
  categories,
  activeFilter,
  onFilterChange,
}: {
  categories: string[];
  activeFilter: string | null;
  onFilterChange: (category: string | null) => void;
}) {
  return (
    <div className="mb-8">
      <div className="scrollbar-hide -mx-4 overflow-x-auto overflow-y-hidden px-4 sm:mx-0 sm:overflow-visible sm:px-0 [contain:inline-size]">
        <div className="flex min-w-max gap-2 pb-2 sm:flex-wrap sm:justify-center sm:gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(null)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              "border backdrop-blur-sm",
              !activeFilter
                ? "border-purple-500/50 bg-purple-500/20 text-purple-300"
                : "border-white/10 bg-black/30 text-white/60 hover:border-white/20 hover:text-white/80"
            )}
          >
            All Projects
          </motion.button>
          {categories.slice(0, 8).map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onFilterChange(category)}
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
    </div>
  );
}

export function ProjectsShowcase() {
  const ref = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const categories = useMemo(() => getAllCategories(), []);

  // Sort by year descending (newest first) so Zitro and recent work appear first
  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => (b.year ?? 0) - (a.year ?? 0)),
    []
  );

  // Filter projects - memoized with proper dependencies
  const filteredProjects = useMemo(() => {
    let filtered = sortedProjects;

    // Apply category filter
    if (activeFilter) {
      filtered = filtered.filter((p) => p.categories.includes(activeFilter));
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.techStack.some((tech) => tech.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [activeFilter, sortedProjects, searchQuery]);

  // Reset visible count when filter or search changes
  useEffect(() => {
    setVisibleCount(4); // Reset to 4 (changed from 3)
    setShowAll(false);
  }, [activeFilter, searchQuery]);

  // Determine how many projects to show
  const displayedProjects = useMemo(() => {
    if (showAll) return filteredProjects;

    // Mobile: show based on visibleCount (starts at 4, adds 4 each time)
    if (isMobile) {
      return filteredProjects.slice(0, visibleCount);
    }

    // Desktop: show rows of 4 (2 rows = 8 initially, then add 4 per click)
    const desktopCount = 8 + (visibleCount - 4) * 4;
    return filteredProjects.slice(
      0,
      Math.min(desktopCount, filteredProjects.length)
    );
  }, [filteredProjects, showAll, visibleCount, isMobile]);

  const handleShowMore = () => {
    if (isMobile) {
      // Mobile: add 4 more projects (changed from 5)
      setVisibleCount((prev) => prev + 4);
    } else {
      // Desktop: add 1 row (4 projects)
      setVisibleCount((prev) => prev + 1);
    }
  };

  const hasMore = useMemo(() => {
    if (showAll) return false;

    if (isMobile) {
      return visibleCount < filteredProjects.length;
    }

    // Desktop: check if there are more projects beyond current rows (2 rows = 8 initially)
    const desktopCount = 8 + (visibleCount - 4) * 4;
    return desktopCount < filteredProjects.length;
  }, [filteredProjects.length, showAll, visibleCount, isMobile]);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative min-h-screen overflow-hidden bg-slate-950 py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950" />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]"
        />
      </div>

      <div className="relative z-10 mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-6 xs:mb-8 text-center">
          {/* Badge */}
          <div className="mb-4 xs:mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 xs:px-4 xs:py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
            </span>
            <span className="text-xs xs:text-sm font-medium text-purple-300">
              Case Studies
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-3 xs:mb-4 text-3xl xs:text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl px-2">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Selected Works
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-sm xs:text-base text-white/50 px-4">
            <span className="font-semibold text-white/70">
              {projects.length}
            </span>{" "}
            production AI & full-stack projects delivering{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold text-transparent">
              measurable business impact
            </span>
          </p>
        </div>

        {/* Stats */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {[
            {
              icon: Brain,
              label: "AI Projects",
              value: projects.length.toString(),
            },
            { icon: Cpu, label: "Technologies", value: "50+" },
            { icon: Zap, label: "Impact Delivered", value: "$10M+" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md sm:px-5"
            >
              <Icon className="h-5 w-5 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-white sm:text-xl">
                  {value}
                </div>
                <div className="text-xs text-white/50">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search projects by title, description, or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full rounded-full border border-white/10 bg-black/30 py-3 pl-12 pr-12",
                "text-white placeholder:text-white/40",
                "backdrop-blur-sm transition-all",
                "focus:border-purple-500/50 focus:bg-black/40 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              )}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white/80"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 text-center text-sm text-white/50">
              Found {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Category Filters */}
        <div>
          <CategoryFilters
            categories={categories}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Projects Grid - Single unified grid */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {displayedProjects.map((project, index) => (
            <div key={project.slug}>
              <ProjectCard project={project} variant="list" index={index} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="mb-2 text-xl font-semibold text-white">
              No projects found
            </h3>
            <p className="text-white/50">Try selecting a different category</p>
          </div>
        )}

        {/* Show More / View All */}
        {hasMore && (
          <div className="mt-12 flex flex-col items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShowMore}
              className={cn(
                "flex items-center gap-2 rounded-full px-8 py-3",
                "bg-gradient-to-r from-purple-600 to-cyan-600",
                "font-medium text-white",
                "shadow-lg shadow-purple-500/25",
                "transition-all hover:shadow-xl hover:shadow-purple-500/30"
              )}
            >
              <span className="md:hidden">
                Show More
                <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                  +4
                </span>
              </span>
              <span className="hidden md:inline">
                Show More
                <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                  +4
                </span>
              </span>
            </motion.button>
          </div>
        )}

        {/* Show Less button when all are shown */}
        {showAll && (
          <div className="mt-12 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowAll(false);
                setVisibleCount(4);
              }}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-white/80 transition-colors hover:bg-white/10"
            >
              Show Less
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
