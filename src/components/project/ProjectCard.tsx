"use client";

import { useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { PROJECT_IMAGE_PLACEHOLDER } from "@/lib/placeholders";

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "list" | "timeline";
  index?: number;
}

function ProjectCardComponent({
  project,
  variant = "list",
  index = 0,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (variant === "timeline") return; // No tilt for timeline variant

    // Capture values before async operation
    const target = e.currentTarget;
    const clientX = e.clientX;
    const clientY = e.clientY;

    // Use requestAnimationFrame to throttle tilt updates
    requestAnimationFrame(() => {
      // Check if element still exists
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      // Limit rotation to ±10 degrees
      setTilt({
        x: Math.max(-10, Math.min(10, y * 15)),
        y: Math.max(-10, Math.min(10, -x * 15)),
      });
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const isFeatured = variant === "featured";
  const isTimeline = variant === "timeline";

  // List variant: no inner opacity 0 so cards below the fold after "Show All" stay visible
  const useViewAnimation = variant !== "list";

  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <motion.article
        initial={
          useViewAnimation ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }
        }
        whileInView={useViewAnimation ? { opacity: 1, y: 0 } : undefined}
        viewport={
          useViewAnimation ? { once: true, margin: "-50px" } : undefined
        }
        transition={{
          duration: 0.5,
          delay: Math.min(index * 0.05, 0.5), // Cap delay to prevent long waits
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            isHovered && !isTimeline
              ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
              : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
          willChange: isHovered ? "transform" : "auto",
        }}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-white/10",
          "bg-black/30 backdrop-blur-md",
          "transition-all duration-300 ease-out",
          "hover:border-white/20 hover:bg-black/40",
          "hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]",
          // Variant-specific styles
          isFeatured && "md:col-span-2 md:row-span-2",
          isTimeline && "flex flex-row items-center gap-4 p-4",
          !isTimeline && "flex flex-col"
        )}
      >
        {/* Image Container */}
        <div
          className={cn(
            "relative overflow-hidden",
            isTimeline
              ? "h-20 w-20 flex-shrink-0 rounded-xl"
              : "aspect-[16/10] w-full",
            isFeatured && "md:aspect-[16/9]"
          )}
        >
          <Image
            src={imgError ? PROJECT_IMAGE_PLACEHOLDER : project.defaultImage}
            alt={project.title}
            fill
            sizes={
              isFeatured
                ? "(max-width: 768px) 100vw, 66vw"
                : isTimeline
                  ? "80px"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
            priority={isFeatured && index < 2}
            loading={isFeatured && index < 2 ? "eager" : "lazy"}
            onError={() => setImgError(true)}
            className={cn(
              "object-cover transition-transform duration-500",
              "group-hover:scale-110"
            )}
          />
          {/* Gradient overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent",
              "opacity-60 transition-opacity duration-300 group-hover:opacity-80"
            )}
          />
        </div>

        {/* Content */}
        <div
          className={cn(
            "relative z-10",
            isTimeline ? "flex-1 min-w-0" : "p-4 sm:p-5",
            isFeatured && "md:p-6"
          )}
        >
          {/* Categories */}
          {!isTimeline && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {project.categories.slice(0, 2).map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/60 sm:text-xs"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3
            className={cn(
              "font-bold text-white transition-colors group-hover:text-white",
              isTimeline ? "text-sm line-clamp-1" : "text-lg sm:text-xl",
              isFeatured && "md:text-2xl"
            )}
          >
            {project.title}
          </h3>

          {/* Impact Metric */}
          <p
            className={cn(
              "mt-1 font-semibold",
              "bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent",
              isTimeline ? "text-xs" : "text-sm sm:text-base"
            )}
          >
            {project.impact}
          </p>

          {/* Description */}
          {!isTimeline && (
            <p
              className={cn(
                "mt-2 text-white/50 line-clamp-2",
                "text-sm",
                isFeatured && "md:line-clamp-3 md:text-base"
              )}
            >
              {project.description}
            </p>
          )}

          {/* Tech Stack Pills (Featured only) */}
          {isFeatured && (
            <div className="mt-4 hidden flex-wrap gap-1.5 md:flex">
              {project.techStack.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 5 && (
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60">
                  +{project.techStack.length - 5}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Arrow indicator */}
        <div
          className={cn(
            "absolute right-3 top-3 flex h-8 w-8 items-center justify-center",
            "rounded-full bg-white/10 text-white/60 backdrop-blur-sm",
            "opacity-0 transition-all duration-300",
            "group-hover:opacity-100 group-hover:bg-white/20 group-hover:text-white",
            isTimeline && "relative right-0 top-0 opacity-100"
          )}
        >
          <ArrowUpRight className="h-4 w-4" />
        </div>

        {/* Hover glow effect */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl",
            "bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10",
            "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          )}
        />
      </motion.article>
    </Link>
  );
}

// Memoize to prevent unnecessary re-renders
export const ProjectCard = memo(ProjectCardComponent);
