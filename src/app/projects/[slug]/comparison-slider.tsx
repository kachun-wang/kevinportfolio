"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonSliderProps {
  before: {
    title: string;
    description: string;
    metrics: string[];
  };
  after: {
    title: string;
    description: string;
    metrics: string[];
  };
  color: string;
}

export function ComparisonSlider({
  before,
  after,
  color,
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-2xl border border-white/10"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Before side */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-red-950/50 to-slate-950"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div className="flex h-full flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-400" />
              <h3 className="text-xl font-bold text-white">{before.title}</h3>
            </div>
            <p className="mb-6 text-sm text-white/60">{before.description}</p>
          </div>
          <ul className="space-y-2">
            {before.metrics.map((metric, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                {metric}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* After side */}
      <div
        className="relative bg-gradient-to-br from-emerald-950/50 to-slate-950"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      >
        <div className="flex h-full min-h-[400px] flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">{after.title}</h3>
            </div>
            <p className="mb-6 text-sm text-white/60">{after.description}</p>
          </div>
          <ul className="space-y-2">
            {after.metrics.map((metric, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {metric}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Slider handle */}
      <div
        className="absolute inset-y-0 z-10 flex cursor-ew-resize items-center"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Vertical line */}
        <div className="h-full w-0.5 bg-white/30" />

        {/* Handle button */}
        <div
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "flex h-12 w-12 items-center justify-center rounded-full",
            "border-2 border-white/30 bg-slate-900/90 backdrop-blur-md",
            "shadow-xl transition-transform hover:scale-110"
          )}
          style={{ boxShadow: `0 0 20px ${color}40` }}
        >
          <ArrowLeftRight className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Labels */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-20">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            "bg-red-500/20 text-red-400"
          )}
          style={{ opacity: sliderPosition > 20 ? 1 : 0 }}
        >
          Before
        </span>
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 z-20">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            "bg-emerald-500/20 text-emerald-400"
          )}
          style={{ opacity: sliderPosition < 80 ? 1 : 0 }}
        >
          After
        </span>
      </div>

      {/* Instruction */}
      <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/50 backdrop-blur-md">
          Drag to compare
        </span>
      </div>
    </motion.div>
  );
}
