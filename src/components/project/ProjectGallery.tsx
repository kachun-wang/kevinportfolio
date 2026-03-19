"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROJECT_IMAGE_PLACEHOLDER } from "@/lib/placeholders";

interface ProjectGalleryProps {
  images: string[];
  alt?: string;
}

export function ProjectGallery({
  images,
  alt = "Project image",
}: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [failedIndices, setFailedIndices] = useState<Set<number>>(new Set());

  const getImageSrc = (index: number) =>
    failedIndices.has(index) ? PROJECT_IMAGE_PLACEHOLDER : images[index];

  const handleImageError = (index: number) => {
    setFailedIndices((prev) => new Set(prev).add(index));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        let next = prev + newDirection;
        if (next < 0) next = images.length - 1;
        if (next >= images.length) next = 0;
        return next;
      });
    },
    [images.length]
  );

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // Handle drag end
  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      const threshold = 50;
      const velocity = info.velocity.x;
      const offset = info.offset.x;

      if (offset < -threshold || velocity < -500) {
        paginate(1);
      } else if (offset > threshold || velocity > 500) {
        paginate(-1);
      }
    },
    [paginate]
  );

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={getImageSrc(currentIndex)}
              alt={`${alt} ${currentIndex + 1}`}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              priority={currentIndex === 0}
              onError={() => handleImageError(currentIndex)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows (Desktop) */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              className={cn(
                "absolute left-3 top-1/2 z-10 -translate-y-1/2",
                "hidden h-10 w-10 items-center justify-center rounded-full md:flex",
                "bg-black/50 text-white/80 backdrop-blur-sm",
                "border border-white/10",
                "opacity-0 transition-all duration-300 hover:bg-black/70 hover:text-white",
                "group-hover:opacity-100",
                // Always show on touch devices
                "md:opacity-0 md:hover:opacity-100"
              )}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className={cn(
                "absolute right-3 top-1/2 z-10 -translate-y-1/2",
                "hidden h-10 w-10 items-center justify-center rounded-full md:flex",
                "bg-black/50 text-white/80 backdrop-blur-sm",
                "border border-white/10",
                "opacity-0 transition-all duration-300 hover:bg-black/70 hover:text-white",
                "group-hover:opacity-100",
                "md:opacity-0 md:hover:opacity-100"
              )}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-3 left-3 z-10 rounded-full bg-black/50 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Swipe Hint (Mobile) */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/50 px-3 py-1 text-xs text-white/60 backdrop-blur-sm md:hidden">
            Swipe
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg",
                "border-2 transition-all duration-300",
                index === currentIndex
                  ? "border-purple-500 ring-2 ring-purple-500/30"
                  : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
              )}
              aria-label={`Go to image ${index + 1}`}
            >
              <Image
                src={getImageSrc(index)}
                alt={`${alt} thumbnail ${index + 1}`}
                fill
                unoptimized
                sizes="96px"
                className="object-cover"
                onError={() => handleImageError(index)}
              />
              {/* Active indicator overlay */}
              {index === currentIndex && (
                <motion.div
                  layoutId="activeThumbnail"
                  className="absolute inset-0 bg-purple-500/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Dot Indicators (Mobile alternative) */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 md:hidden">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-6 bg-purple-500"
                  : "w-2 bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
