"use client";

import { Suspense, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  useDeviceCapabilities,
  useMousePosition,
  useScrollProgress,
  useMounted,
} from "@/hooks";
import { HeroContent } from "./hero-content";

// Dynamically import the 3D scene to avoid SSR issues
const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => null,
  }
);

// Beautiful loading fallback
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {/* Animated gradient orb */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-32 w-32 rounded-full bg-gradient-to-r from-purple-600/30 to-cyan-600/30 blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 blur-2xl"
        />
        {/* Loading spinner */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="h-12 w-12 rounded-full border-2 border-purple-500/30 border-t-purple-500"
          />
        </div>
      </div>
    </div>
  );
}

// Static gradient fallback for low-end devices
function StaticGradientFallback() {
  return (
    <div className="absolute inset-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-slate-950 to-cyan-950" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-purple-600/20 blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-600/20 blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/15 blur-[80px]"
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}

export function HeroSection() {
  const mounted = useMounted();
  const { isMobile, isLowEnd, supportsWebGL2 } = useDeviceCapabilities();
  const mousePosition = useMousePosition();
  const scrollProgress = useScrollProgress();

  // Calculate particle count based on device capabilities
  const particleCount = useMemo(() => {
    if (isLowEnd) return 150; // 92.5% reduction for low-end
    if (isMobile) return 300; // 85% reduction for mobile
    return 1000; // 50% reduction for desktop (still looks great)
  }, [isMobile, isLowEnd]);

  // Should we show the 3D scene?
  const show3DScene = useMemo(() => {
    return supportsWebGL2 && !isLowEnd;
  }, [supportsWebGL2, isLowEnd]);

  const handleScrollToProjects = useCallback(() => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // Scroll down one viewport height if projects section doesn't exist yet
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const handleContact = useCallback(() => {
    navigator.clipboard.writeText("chung@kevinchung.dev");
    toast.success("Email copied to clipboard!", {
      description: "chung@kevinchung.dev",
    });
  }, []);

  if (!mounted) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-slate-950">
        {/* Fast static background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-slate-950 to-cyan-950" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-600/20 blur-[100px]" />

        {/* Show content immediately */}
        <HeroContent
          onScrollToProjects={handleScrollToProjects}
          onContact={handleContact}
        />
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-slate-950">
        <AnimatePresence mode="wait">
          {show3DScene ? (
            <Suspense fallback={<LoadingFallback />}>
              <motion.div
                key="3d-scene"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <HeroScene
                  particleCount={particleCount}
                  mousePosition={{
                    x: mousePosition.normalizedX,
                    y: mousePosition.normalizedY,
                  }}
                  scrollProgress={scrollProgress}
                  isLowEnd={isMobile}
                />
              </motion.div>
            </Suspense>
          ) : (
            <motion.div
              key="fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <StaticGradientFallback />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Noise overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Vignette overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Content Layer */}
      <HeroContent
        onScrollToProjects={handleScrollToProjects}
        onContact={handleContact}
      />

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}
