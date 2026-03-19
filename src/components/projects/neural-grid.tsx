"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { Sparkles, Brain, Cpu } from "lucide-react";
import { toast } from "sonner";
import { useMediaQuery, useMounted } from "@/hooks";
import { projects, type Project } from "./project-data";
import { MobileCarousel } from "./mobile-carousel";
import { ProjectModal } from "./project-modal";
import { ZabimaruEasterEgg } from "./zabimaru-easter-egg";
import { cn } from "@/lib/utils";

// Dynamically import 3D scene
const NeuralGridScene = dynamic(
  () => import("./neural-grid-scene").then((mod) => mod.NeuralGridScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[600px] items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mx-auto mb-4 h-12 w-12 rounded-full border-2 border-purple-500/30 border-t-purple-500"
          />
          <p className="text-sm text-white/40">Loading Neural Grid...</p>
        </div>
      </div>
    ),
  }
);

const titleVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// Animated title with stagger
function AnimatedTitle({ text }: { text: string }) {
  return (
    <motion.h2
      variants={titleVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="mb-4 flex flex-wrap justify-center gap-x-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
    >
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="flex">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              variants={letterVariants}
              className={cn(
                "inline-block",
                wordIndex === 1
                  ? "bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
                  : "text-white"
              )}
              style={{
                textShadow:
                  wordIndex === 1 ? "0 0 40px rgba(139, 92, 246, 0.5)" : "none",
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
}

// Stats bar
function StatsBar() {
  const stats = [
    { icon: Brain, label: "AI Projects", value: "6+" },
    { icon: Cpu, label: "Models Deployed", value: "20+" },
    { icon: Sparkles, label: "Impact Delivered", value: "$10M+" },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mx-auto mb-12 flex max-w-3xl flex-wrap items-center justify-center gap-4 sm:gap-8"
    >
      {stats.map(({ icon: Icon, label, value }) => (
        <motion.div
          key={label}
          variants={itemVariants}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md"
        >
          <Icon className="h-5 w-5 text-purple-400" />
          <div>
            <div className="text-lg font-bold text-white">{value}</div>
            <div className="text-xs text-white/50">{label}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function NeuralGrid() {
  const mounted = useMounted();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleEasterEgg = useCallback(() => {
    toast.success("卍解 Zabimaru activated!", {
      description: "You found the secret!",
      duration: 3000,
    });
  }, []);

  if (!mounted) {
    return (
      <section className="relative min-h-screen bg-slate-950 py-24">
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="relative min-h-screen overflow-hidden bg-slate-950 py-24"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950" />

        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
            </span>
            <span className="text-sm font-medium text-purple-300">
              Neural Grid
            </span>
          </motion.div>

          {/* Animated title */}
          <AnimatedTitle text="Selected Works" />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mx-auto max-w-2xl text-white/50"
          >
            Production AI systems delivering measurable business impact.
            {!isMobile && " Explore the grid in 3D."}
          </motion.p>
        </motion.div>

        {/* Stats */}
        <StatsBar />

        {/* Project grid - Desktop 3D / Mobile Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {isMobile ? (
            <MobileCarousel onSelectProject={handleSelectProject} />
          ) : (
            <NeuralGridScene
              onSelectProject={handleSelectProject}
              selectedProject={selectedProject}
            />
          )}
        </motion.div>

        {/* Hint for desktop */}
        {!isMobile && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-6 text-center text-sm text-white/30"
          >
            Drag to orbit • Hover to inspect • Click for details
          </motion.p>
        )}
      </div>

      {/* Project modal */}
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />

      {/* Easter egg */}
      <ZabimaruEasterEgg onActivate={handleEasterEgg} />

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
