"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, ArrowRight, Zap } from "lucide-react";
import type { Project } from "./project-data";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative max-h-[90vh] w-full max-w-3xl overflow-y-auto",
              "rounded-3xl border border-white/10",
              "bg-slate-900/95 backdrop-blur-xl",
              "shadow-2xl shadow-purple-500/10"
            )}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header with gradient */}
            <div
              className="relative h-48 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${project.color}40, ${project.color}10)`,
              }}
            >
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: "30px 30px",
                }}
              />

              {/* Metric badge */}
              <div className="absolute bottom-6 left-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 rounded-2xl bg-black/30 px-5 py-3 backdrop-blur-md"
                >
                  <Zap className="h-6 w-6" style={{ color: project.color }} />
                  <div>
                    <div
                      className="text-3xl font-black"
                      style={{ color: project.color }}
                    >
                      {project.metric}
                    </div>
                    <div className="text-sm text-white/60">
                      {project.metricLabel}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Title and description */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4 text-2xl font-bold text-white sm:text-3xl"
              >
                {project.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-6 text-white/60"
              >
                {project.description}
              </motion.p>

              {/* Tech stack */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 flex flex-wrap gap-2"
              >
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>

              {/* Case Study */}
              {project.caseStudy && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-6"
                >
                  {/* Challenge */}
                  <div>
                    <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/40">
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      Challenge
                    </h3>
                    <p className="text-white/70">
                      {project.caseStudy.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/40">
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      Solution
                    </h3>
                    <p className="text-white/70">
                      {project.caseStudy.solution}
                    </p>
                  </div>

                  {/* Results */}
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/40">
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      Results
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {project.caseStudy.results.map((result, i) => (
                        <motion.div
                          key={result}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3"
                        >
                          <ArrowRight
                            className="h-4 w-4 shrink-0"
                            style={{ color: project.color }}
                          />
                          <span className="text-sm text-white/80">
                            {result}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-medium text-white transition-all hover:scale-105"
                    style={{ backgroundColor: project.color }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition-all hover:bg-white/10"
                  >
                    <Github className="h-4 w-4" />
                    Source Code
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
