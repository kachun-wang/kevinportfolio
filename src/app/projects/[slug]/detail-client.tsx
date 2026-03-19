"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Lightbulb,
  Wrench,
  ChevronRight,
  ArrowUp,
  ChevronLeft,
} from "lucide-react";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { PROJECT_IMAGE_PLACEHOLDER } from "@/lib/placeholders";
import { projects } from "@/data/projects";

// Inline lightweight components for instant rendering
function ProjectTechStack({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ProjectGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
        <Image
          src={images[activeIndex]}
          alt={`${alt} - Image ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative aspect-video overflow-hidden rounded-lg border transition-all",
                activeIndex === idx
                  ? "border-purple-500 ring-2 ring-purple-500/50"
                  : "border-white/10 hover:border-white/30"
              )}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="150px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface ProjectDetailClientProps {
  project: Project;
}

// Minimal page fade-in only
const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: "easeOut" as const,
    },
  },
};

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [heroImgError, setHeroImgError] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Memoize navigation projects for better performance
  const { prevProject, nextProject } = useMemo(() => {
    const currentIndex = projects.findIndex((p) => p.slug === project.slug);
    return {
      prevProject: currentIndex > 0 ? projects[currentIndex - 1] : null,
      nextProject:
        currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null,
    };
  }, [project.slug]);

  // Show back to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-slate-950"
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden sm:h-[70vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={
              heroImgError ? PROJECT_IMAGE_PLACEHOLDER : project.defaultImage
            }
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            onError={() => setHeroImgError(true)}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/50" />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6 sm:pb-16">
            {/* Back Button */}
            <div className="mb-6">
              <Link
                href="/#projects"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm text-white/80 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-black/50"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Projects
              </Link>
            </div>

            {/* Categories */}
            <div className="mb-4 flex flex-wrap gap-2">
              {project.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-purple-500/30 bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300 backdrop-blur-sm"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            {/* Impact Metric */}
            <p className="text-xl font-bold sm:text-2xl md:text-3xl">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {project.impact}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative -mt-8 sm:-mt-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Main Content Card */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl sm:p-8 md:p-10">
            {/* Description */}
            <div className="mb-10">
              <p className="text-lg leading-relaxed text-white/70 sm:text-xl">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <Sparkles className="h-5 w-5 text-purple-400" />
                Tech Stack
              </h2>
              <ProjectTechStack tech={project.techStack} />
            </div>

            {/* Technical Highlights */}
            <div className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <Lightbulb className="h-5 w-5 text-cyan-400" />
                Technical Highlights
              </h2>
              <ul className="space-y-3">
                {project.technicalHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-cyan-400" />
                    <span className="text-white/70">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges & Solutions */}
            <div className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <Wrench className="h-5 w-5 text-orange-400" />
                Challenges & Solutions
              </h2>
              <ul className="space-y-4">
                {project.challengesSolutions.map((item, index) => (
                  <li
                    key={index}
                    className="rounded-xl border border-white/5 bg-white/5 p-4"
                  >
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            {project.gallery.length > 0 && (
              <div className="mb-10">
                <h2 className="mb-4 text-lg font-semibold text-white">
                  Gallery
                </h2>
                <ProjectGallery images={project.gallery} alt={project.title} />
              </div>
            )}

            {/* Links */}
            {project.links && project.links.length > 0 && (
              <div>
                <h2 className="mb-4 text-lg font-semibold text-white">Links</h2>
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-5 py-2.5",
                        "border border-white/10 bg-white/5",
                        "text-sm font-medium text-white/80",
                        "transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {link.label}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-12 flex flex-col items-center justify-center gap-6 pb-16">
            {/* Previous/Next Project Navigation - Icon Only */}
            <div className="flex items-center gap-4">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className={cn(
                    "group flex h-12 w-12 items-center justify-center rounded-full",
                    "border border-white/20 bg-white/5",
                    "transition-all hover:scale-110 hover:border-purple-400 hover:bg-purple-500/20"
                  )}
                  aria-label="Previous project"
                >
                  <ChevronLeft className="h-5 w-5 text-white/70 transition-colors group-hover:text-purple-400" />
                </Link>
              ) : (
                <div className="h-12 w-12" />
              )}

              <Link
                href="/#projects"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-8 py-3",
                  "bg-gradient-to-r from-purple-600 to-cyan-600",
                  "font-medium text-white",
                  "shadow-lg shadow-purple-500/25",
                  "transition-all hover:shadow-xl hover:shadow-purple-500/30"
                )}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to All Projects
              </Link>

              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className={cn(
                    "group flex h-12 w-12 items-center justify-center rounded-full",
                    "border border-white/20 bg-white/5",
                    "transition-all hover:scale-110 hover:border-purple-400 hover:bg-purple-500/20"
                  )}
                  aria-label="Next project"
                >
                  <ChevronRight className="h-5 w-5 text-white/70 transition-colors group-hover:text-purple-400" />
                </Link>
              ) : (
                <div className="h-12 w-12" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button - Mobile Optimized */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className={cn(
              "fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8",
              "flex h-14 w-14 items-center justify-center rounded-full md:h-12 md:w-12",
              "border-2 border-purple-400/50 bg-purple-600 backdrop-blur-sm",
              "text-white shadow-xl shadow-purple-500/40",
              "transition-all hover:scale-110 hover:bg-purple-500 hover:shadow-2xl hover:shadow-purple-500/50",
              "active:scale-95",
              "focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            )}
            aria-label="Back to top"
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="h-6 w-6 md:h-5 md:w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
