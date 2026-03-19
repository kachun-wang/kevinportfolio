"use client";

import { motion, type Variants } from "framer-motion";
import { Briefcase, GraduationCap, Star } from "lucide-react";
import { timeline, type TimelineEvent } from "./about-data";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const iconMap: Record<
  TimelineEvent["type"],
  React.ComponentType<{ className?: string }>
> = {
  work: Briefcase,
  education: GraduationCap,
  milestone: Star,
};

const colorMap: Record<TimelineEvent["type"], string> = {
  work: "from-purple-500 to-purple-600",
  education: "from-cyan-500 to-cyan-600",
  milestone: "from-amber-500 to-amber-600",
};

function TimelineItem({
  event,
  index,
  isLast,
}: {
  event: TimelineEvent;
  index: number;
  isLast: boolean;
}) {
  const Icon = iconMap[event.type];
  const gradientColor = colorMap[event.type];

  return (
    <motion.div variants={itemVariants} className="group relative flex gap-4">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[19px] top-12 h-[calc(100%-2rem)] w-0.5 bg-gradient-to-b from-white/20 to-transparent" />
      )}

      {/* Icon */}
      <div
        className={cn(
          "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          "bg-gradient-to-br shadow-lg transition-transform group-hover:scale-110",
          gradientColor
        )}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        {/* Year badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/70"
        >
          {event.year}
        </motion.div>

        {/* Title & Company */}
        <h3 className="mb-1 text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
          {event.title}
        </h3>
        <p className="mb-2 text-sm font-medium text-purple-400">
          {event.company}
        </p>

        {/* Description */}
        <p className="mb-3 text-sm text-white/60">{event.description}</p>

        {/* Highlights */}
        {event.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {event.highlights.map((highlight, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="rounded-lg bg-white/5 px-2 py-1 text-xs text-white/50"
              >
                {highlight}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function CareerTimeline() {
  return (
    <div className="relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h3 className="mb-2 text-2xl font-bold text-white">Career Journey</h3>
        <p className="text-sm text-white/50">2018 — Present</p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative"
      >
        {timeline.map((event, index) => (
          <TimelineItem
            key={`${event.year}-${event.title}`}
            event={event}
            index={index}
            isLast={index === timeline.length - 1}
          />
        ))}
      </motion.div>
    </div>
  );
}
