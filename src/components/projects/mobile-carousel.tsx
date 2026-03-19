"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { projects, type Project } from "./project-data";
import { cn } from "@/lib/utils";

interface MobileCarouselProps {
  onSelectProject: (project: Project) => void;
}

export function MobileCarousel({ onSelectProject }: MobileCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const dragX = useMotionValue(0);

  const cardWidth = 280;
  const gap = 16;
  const totalWidth = cardWidth + gap;

  const scrollToIndex = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, projects.length - 1));
    setActiveIndex(clampedIndex);

    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: clampedIndex * totalWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / totalWidth);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <div className="relative">
      {/* Navigation arrows */}
      <div className="absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-2 pointer-events-none">
        <button
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            "bg-white/10 backdrop-blur-md",
            "text-white transition-all pointer-events-auto",
            activeIndex === 0 ? "opacity-30" : "hover:bg-white/20"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex === projects.length - 1}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            "bg-white/10 backdrop-blur-md",
            "text-white transition-all pointer-events-auto",
            activeIndex === projects.length - 1
              ? "opacity-30"
              : "hover:bg-white/20"
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Carousel container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 scrollbar-hide"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {projects.map((project, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={project.id}
              className="shrink-0 snap-center"
              style={{ width: cardWidth }}
              animate={{
                scale: isActive ? 1 : 0.95,
                opacity: isActive ? 1 : 0.7,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div
                onClick={() => onSelectProject(project)}
                className={cn(
                  "relative h-[380px] overflow-hidden rounded-2xl",
                  "border border-white/10",
                  "bg-slate-900/80 backdrop-blur-xl",
                  "cursor-pointer transition-all",
                  isActive && "shadow-2xl"
                )}
                style={{
                  boxShadow: isActive
                    ? `0 20px 60px -10px ${project.color}30`
                    : "none",
                }}
              >
                {/* Image/Gradient header */}
                <div
                  className="h-40 w-full"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}60, ${project.color}20)`,
                  }}
                >
                  {/* Grid overlay */}
                  <div
                    className="h-full w-full opacity-30"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                      backgroundSize: "20px 20px",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Metric badge */}
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                    <Zap className="h-3 w-3" style={{ color: project.color }} />
                    <span
                      className="text-sm font-bold"
                      style={{ color: project.color }}
                    >
                      {project.metric}
                    </span>
                    <span className="text-xs text-white/50">
                      {project.metricLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 line-clamp-2 text-sm text-white/50">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Tap indicator */}
                <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/30">
                  Tap to view details
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination dots */}
      <div className="mt-4 flex justify-center gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === activeIndex
                ? "w-6 bg-purple-500"
                : "w-2 bg-white/20 hover:bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
