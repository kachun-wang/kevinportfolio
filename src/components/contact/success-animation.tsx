"use client";
/* eslint-disable react-hooks/purity */

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Sparkles } from "lucide-react";

interface SuccessAnimationProps {
  isVisible: boolean;
  isBankaiMode?: boolean;
  onComplete?: () => void;
}

// Particle explosion effect
function ParticleExplosion({ color }: { color: string }) {
  const particles = Array.from({ length: 40 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const velocity = 100 + Math.random() * 150;
        const size = 4 + Math.random() * 8;

        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: size,
              height: size,
              background: `linear-gradient(135deg, ${color}, transparent)`,
              boxShadow: `0 0 ${size * 2}px ${color}`,
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: Math.cos(angle) * velocity,
              y: Math.sin(angle) * velocity,
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 1 + Math.random() * 0.5,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}

// Bankai special animation
function BankaiAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Dramatic background */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1] }}
        transition={{ duration: 0.8 }}
        className="absolute h-64 w-64 rounded-full bg-gradient-to-r from-red-600/30 to-orange-500/30 blur-3xl"
      />

      {/* Sword slashes */}
      <svg
        className="absolute h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 0 100 L 100 0"
          stroke="url(#bankaiGradient)"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 0.6, times: [0, 0.3, 1] }}
        />
        <motion.path
          d="M 100 100 L 0 0"
          stroke="url(#bankaiGradient)"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 0.6, delay: 0.1, times: [0, 0.3, 1] }}
        />
        <defs>
          <linearGradient
            id="bankaiGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
      </svg>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative text-center"
      >
        <motion.h3
          className="text-4xl font-black text-transparent sm:text-5xl"
          style={{
            background: "linear-gradient(135deg, #ef4444, #f97316, #fbbf24)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
          animate={{
            textShadow: [
              "0 0 20px rgba(239, 68, 68, 0.5)",
              "0 0 40px rgba(249, 115, 22, 0.8)",
              "0 0 20px rgba(239, 68, 68, 0.5)",
            ],
          }}
          transition={{ duration: 1, repeat: 2 }}
        >
          卍解
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-sm tracking-widest text-orange-400"
        >
          MESSAGE RECEIVED
        </motion.p>
      </motion.div>

      <ParticleExplosion color="#ef4444" />
    </motion.div>
  );
}

// Normal success animation
function NormalSuccessAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500">
          <CheckCircle className="h-10 w-10 text-white" />
        </div>

        {/* Sparkles */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.cos((i / 4) * Math.PI * 2) * 50 - 8,
              y: Math.sin((i / 4) * Math.PI * 2) * 50 - 8,
            }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
          >
            <Sparkles className="h-4 w-4 text-emerald-400" />
          </motion.div>
        ))}
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-center"
      >
        <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
        <p className="mt-2 text-sm text-white/60">
          I'll get back to you within 24 hours.
        </p>
      </motion.div>

      <ParticleExplosion color="#10b981" />
    </motion.div>
  );
}

export function SuccessAnimation({
  isVisible,
  isBankaiMode,
  onComplete,
}: SuccessAnimationProps) {
  useEffect(() => {
    if (isVisible && onComplete) {
      const timer = setTimeout(onComplete, isBankaiMode ? 3000 : 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isBankaiMode, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-slate-900/95 backdrop-blur-md"
        >
          {isBankaiMode ? <BankaiAnimation /> : <NormalSuccessAnimation />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
