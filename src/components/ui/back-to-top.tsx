"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackToTopProps {
  showAfter?: number; // Show button after scrolling this many pixels
  className?: string;
}

export function BackToTop({ showAfter = 300, className }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check on mount
    toggleVisibility();

    // Add scroll listener
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className={cn(
            // Position
            "fixed bottom-6 right-6 z-50",
            "xs:bottom-8 xs:right-8",
            "md:bottom-10 md:right-10",
            // Size - larger on mobile for better touch target
            "h-12 w-12 xs:h-14 xs:w-14 md:h-12 md:w-12",
            // Styling
            "flex items-center justify-center",
            "rounded-full",
            "bg-gradient-to-r from-purple-600 to-cyan-600",
            "text-white",
            "shadow-lg shadow-purple-500/30",
            "border border-white/10",
            "backdrop-blur-sm",
            // Interactions
            "transition-all duration-300",
            "hover:shadow-xl hover:shadow-purple-500/40",
            "hover:border-white/20",
            "active:scale-95",
            // Accessibility
            "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950",
            className
          )}
          aria-label="Back to top"
        >
          {/* Icon */}
          <ArrowUp className="h-5 w-5 xs:h-6 xs:w-6 md:h-5 md:w-5" />

          {/* Glow effect */}
          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 blur-xl" />

          {/* Pulse animation on hover */}
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-white/30"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{
              scale: 1.5,
              opacity: [0, 0.5, 0],
              transition: { duration: 0.6, repeat: Infinity },
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
