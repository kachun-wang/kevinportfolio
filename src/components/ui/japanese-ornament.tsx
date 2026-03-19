"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Japanese-inspired decorative elements
interface OrnamentProps {
  className?: string;
  variant?: "dots" | "lines" | "corner" | "divider";
}

export function JapaneseOrnament({
  className,
  variant = "dots",
}: OrnamentProps) {
  if (variant === "dots") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
          />
        ))}
      </div>
    );
  }

  if (variant === "lines") {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-px w-8 origin-left bg-gradient-to-r from-transparent to-purple-500/50"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="h-1 w-1 rounded-full bg-purple-500"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.1 }}
          className="h-px w-8 origin-right bg-gradient-to-l from-transparent to-purple-500/50"
        />
      </div>
    );
  }

  if (variant === "corner") {
    return (
      <div className={cn("relative h-6 w-6", className)}>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-purple-500/50 to-transparent"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.1 }}
          className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-purple-500/50 to-transparent"
        />
      </div>
    );
  }

  // Divider
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        className="h-px w-16 origin-right bg-gradient-to-l from-purple-500/30 to-transparent sm:w-24"
      />
      <motion.div
        initial={{ scale: 0, rotate: 45 }}
        whileInView={{ scale: 1, rotate: 45 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="h-2 w-2 border border-purple-500/50"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        className="h-px w-16 origin-left bg-gradient-to-r from-purple-500/30 to-transparent sm:w-24"
      />
    </div>
  );
}

// Section number with Japanese aesthetic
export function SectionNumber({
  number,
  className,
}: {
  number: string | number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={cn(
        "flex items-center gap-2 text-xs font-medium tracking-[0.3em] text-white/30",
        className
      )}
    >
      <span className="font-mono">{String(number).padStart(2, "0")}</span>
      <div className="h-px w-8 bg-white/20" />
    </motion.div>
  );
}

// Vertical text (Japanese style)
export function VerticalText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-xs tracking-widest text-white/30",
        className
      )}
      style={{ writingMode: "vertical-rl" }}
    >
      {text}
    </div>
  );
}
