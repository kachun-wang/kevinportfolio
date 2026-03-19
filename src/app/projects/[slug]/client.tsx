"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  ChevronRight,
  Zap,
  Target,
  Layers,
  BarChart3,
  Code2,
  Quote,
  ArrowRight,
} from "lucide-react";
import type { ProjectDetails } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ErrorBoundary } from "@/components/error-boundary";

// Dynamically import 3D scene
const TimeSeriesScene = dynamic(
  () => import("./time-series-scene").then((mod) => mod.TimeSeriesScene),
  { ssr: false }
);

// Syntax highlighted code block
const CodeBlock = dynamic(
  () => import("./code-block").then((mod) => mod.CodeBlock),
  {
    ssr: false,
  }
);

// Before/After comparison slider
const ComparisonSlider = dynamic(
  () => import("./comparison-slider").then((mod) => mod.ComparisonSlider),
  { ssr: false }
);

interface ProjectPageClientProps {
  project: ProjectDetails;
}

// Table of Contents Sidebar
function TableOfContents({
  items,
  activeId,
}: {
  items: { id: string; title: string }[];
  activeId: string;
}) {
  return (
    <nav className="sticky top-24 hidden lg:block">
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
        On this page
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block border-l-2 py-1 pl-4 text-sm transition-all",
                activeId === item.id
                  ? "border-purple-500 text-white"
                  : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/70"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Metric Card Component
function MetricCard({
  value,
  label,
  description,
  index,
  color,
}: {
  value: string;
  label: string;
  description: string;
  index: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10"
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at center, ${color}20, transparent 70%)`,
        }}
      />
      <div className="relative">
        <div className="mb-2 text-4xl font-black" style={{ color }}>
          {value}
        </div>
        <div className="mb-1 text-lg font-semibold text-white">{label}</div>
        <div className="text-sm text-white/50">{description}</div>
      </div>
    </motion.div>
  );
}

// Tech Stack Badge
function TechBadge({
  name,
  category,
  index,
}: {
  name: string;
  category: string;
  index: number;
}) {
  const categoryColors: Record<string, string> = {
    ml: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
    backend: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
    frontend: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
    infra: "from-orange-500/20 to-orange-500/5 border-orange-500/30",
    data: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2",
        "bg-gradient-to-r backdrop-blur-sm",
        categoryColors[category] || categoryColors.backend
      )}
    >
      <span className="text-sm font-medium text-white">{name}</span>
    </motion.div>
  );
}

// Section Header
function SectionHeader({
  icon: Icon,
  title,
  id,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  id: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      id={id}
      className="mb-8 flex items-center gap-3 scroll-mt-24"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20">
        <Icon className="h-5 w-5 text-purple-400" />
      </div>
      <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
    </motion.div>
  );
}

export function ProjectPageClient({ project }: ProjectPageClientProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  // Track active section for TOC
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    project.tableOfContents.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { rootMargin: "-20% 0% -60% 0%" }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [project.tableOfContents]);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-950">
      {/* Progress bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-purple-500 to-cyan-500"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed left-6 top-6 z-40"
      >
        <Link
          href="/#projects"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-white/70 backdrop-blur-md transition-all hover:border-white/20 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
      >
        {/* 3D Background */}
        <div className="absolute inset-0">
          <ErrorBoundary
            fallback={
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${project.color}15 0%, transparent 70%)`,
                }}
              />
            }
          >
            <TimeSeriesScene color={project.color} />
          </ErrorBoundary>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Reading time & date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-center gap-4 text-sm text-white/50"
          >
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {project.readingTime} min read
            </span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(project.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
              }}
            >
              {project.title}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 text-lg text-white/60 md:text-xl"
          >
            {project.subtitle}
          </motion.p>

          {/* Key metrics preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {project.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="text-center">
                <div
                  className="text-3xl font-black"
                  style={{ color: project.color }}
                >
                  {metric.value}
                </div>
                <div className="text-sm text-white/50">{metric.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-white/30">Scroll to explore</span>
            <ChevronRight className="h-4 w-4 rotate-90 text-white/30" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_250px]">
            {/* Main content */}
            <div className="space-y-24">
              {/* Overview / Metrics */}
              <div id="overview" className="scroll-mt-24">
                <SectionHeader icon={Zap} title="Key Metrics" id="metrics" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.metrics.map((metric, i) => (
                    <MetricCard
                      key={metric.label}
                      {...metric}
                      index={i}
                      color={project.color}
                    />
                  ))}
                </div>
              </div>

              {/* Problem */}
              <div id="problem" className="scroll-mt-24">
                <SectionHeader
                  icon={Target}
                  title={project.problem.title}
                  id="problem-header"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 md:p-8"
                >
                  <p className="mb-6 text-lg text-white/70">
                    {project.problem.description}
                  </p>
                  <ul className="space-y-3">
                    {project.problem.painPoints.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                        <span className="text-white/60">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Solution */}
              <div id="solution" className="scroll-mt-24">
                <SectionHeader
                  icon={Zap}
                  title={project.solution.title}
                  id="solution-header"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 md:p-8"
                >
                  <p className="mb-6 text-lg text-white/70">
                    {project.solution.description}
                  </p>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {project.solution.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                        <span className="text-white/60">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Before/After Comparison */}
              {project.beforeAfter && (
                <div className="scroll-mt-24">
                  <SectionHeader
                    icon={ArrowRight}
                    title="Before & After"
                    id="comparison"
                  />
                  <ComparisonSlider
                    before={project.beforeAfter.before}
                    after={project.beforeAfter.after}
                    color={project.color}
                  />
                </div>
              )}

              {/* Architecture */}
              <div id="architecture" className="scroll-mt-24">
                <SectionHeader
                  icon={Layers}
                  title={project.architecture.title}
                  id="arch-header"
                />
                <p className="mb-8 text-white/60">
                  {project.architecture.description}
                </p>
                <div className="space-y-4">
                  {project.architecture.layers.map((layer, i) => (
                    <motion.div
                      key={layer.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <span
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold"
                              style={{
                                backgroundColor: `${project.color}30`,
                                color: project.color,
                              }}
                            >
                              {i + 1}
                            </span>
                            <h3 className="text-lg font-semibold text-white">
                              {layer.name}
                            </h3>
                          </div>
                          <p className="text-sm text-white/50">
                            {layer.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {layer.tech.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div id="results" className="scroll-mt-24">
                <SectionHeader
                  icon={BarChart3}
                  title={project.results.title}
                  id="results-header"
                />
                <p className="mb-8 text-white/60">
                  {project.results.description}
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {project.results.achievements.map((achievement, i) => (
                    <motion.div
                      key={achievement.metric}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-xl border border-white/10 bg-white/5 p-5 text-center"
                    >
                      <div
                        className="mb-1 text-3xl font-black"
                        style={{ color: project.color }}
                      >
                        {achievement.value}
                      </div>
                      <div className="text-sm font-medium text-white">
                        {achievement.metric}
                      </div>
                      {achievement.comparison && (
                        <div className="mt-1 text-xs text-white/40">
                          {achievement.comparison}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div id="tech-stack" className="scroll-mt-24">
                <SectionHeader
                  icon={Layers}
                  title="Tech Stack"
                  id="stack-header"
                />
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech, i) => (
                    <TechBadge key={tech.name} {...tech} index={i} />
                  ))}
                </div>
              </div>

              {/* Code Snippets */}
              <div id="code" className="scroll-mt-24">
                <SectionHeader
                  icon={Code2}
                  title="Code Deep Dive"
                  id="code-header"
                />
                <div className="space-y-8">
                  {project.codeSnippets.map((snippet, i) => (
                    <CodeBlock key={i} {...snippet} />
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div id="testimonials" className="scroll-mt-24">
                <SectionHeader
                  icon={Quote}
                  title="What They Said"
                  id="quotes-header"
                />
                <div className="grid gap-6 md:grid-cols-2">
                  {project.testimonials.map((testimonial, i) => (
                    <motion.blockquote
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative rounded-2xl border border-white/10 bg-white/5 p-6"
                    >
                      <Quote
                        className="absolute right-4 top-4 h-8 w-8 text-white/10"
                        fill="currentColor"
                      />
                      <p className="mb-4 text-white/70">
                        &quot;{testimonial.quote}&quot;
                      </p>
                      <footer>
                        <div className="font-semibold text-white">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-white/50">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </footer>
                    </motion.blockquote>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <TableOfContents
                items={project.tableOfContents}
                activeId={activeSection}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Interested in similar results?
          </h2>
          <p className="mb-8 text-white/50">
            Let&apos;s discuss how AI can transform your business operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: project.color }}
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
