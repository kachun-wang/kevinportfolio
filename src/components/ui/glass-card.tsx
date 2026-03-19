"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  blur?: "sm" | "md" | "lg" | "xl";
  intensity?: "light" | "medium" | "heavy";
}

const blurMap = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
};

const intensityMap = {
  light: "bg-white/5 border-white/10",
  medium: "bg-white/10 border-white/15",
  heavy: "bg-white/20 border-white/25",
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    { className, blur = "lg", intensity = "medium", children, ...props },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-2xl border shadow-xl",
          blurMap[blur],
          intensityMap[intensity],
          "dark:shadow-purple-500/5",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
