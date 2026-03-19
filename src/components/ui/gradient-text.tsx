"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientTextProps extends HTMLMotionProps<"span"> {
  gradient?: "primary" | "secondary" | "accent";
}

const gradientMap = {
  primary: "from-purple-400 via-pink-500 to-cyan-400",
  secondary: "from-blue-400 via-purple-500 to-pink-400",
  accent: "from-cyan-400 via-blue-500 to-purple-400",
};

export function GradientText({
  className,
  gradient = "primary",
  children,
  ...props
}: GradientTextProps) {
  return (
    <motion.span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradientMap[gradient],
        className
      )}
      {...props}
    >
      {children}
    </motion.span>
  );
}
