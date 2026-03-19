"use client";
/* eslint-disable react-hooks/purity */

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ZabimaruEasterEggProps {
  onActivate?: () => void;
}

export function ZabimaruEasterEgg({ onActivate }: ZabimaruEasterEggProps) {
  const [triggered, setTriggered] = useState(false);
  const [inputBuffer, setInputBuffer] = useState("");
  const secretCode = "zabimaru";

  // Track keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const newBuffer = (inputBuffer + e.key.toLowerCase()).slice(
        -secretCode.length
      );
      setInputBuffer(newBuffer);

      if (newBuffer === secretCode && !triggered) {
        setTriggered(true);
        onActivate?.();

        // Reset after animation
        setTimeout(() => {
          setTriggered(false);
          setInputBuffer("");
        }, 3000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputBuffer, triggered, onActivate]);

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
        >
          {/* Background flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.5, times: [0, 0.1, 1] }}
            className="absolute inset-0 bg-red-500"
          />

          {/* Slash effects */}
          <motion.svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Main slash */}
            <motion.path
              d="M -10 110 L 110 -10"
              stroke="url(#slashGradient)"
              strokeWidth="0.8"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.8, times: [0, 0.1, 0.5, 1] }}
            />

            {/* Secondary slashes */}
            <motion.path
              d="M -10 120 L 120 -10"
              stroke="url(#slashGradient)"
              strokeWidth="0.3"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.5, 0.5, 0] }}
              transition={{
                duration: 0.8,
                delay: 0.05,
                times: [0, 0.1, 0.5, 1],
              }}
            />
            <motion.path
              d="M -20 110 L 110 -20"
              stroke="url(#slashGradient)"
              strokeWidth="0.3"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.5, 0.5, 0] }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                times: [0, 0.1, 0.5, 1],
              }}
            />

            {/* Cross slashes for Bankai effect */}
            <motion.path
              d="M 110 110 L -10 -10"
              stroke="url(#slashGradient2)"
              strokeWidth="0.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.8, 0.8, 0] }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                times: [0, 0.1, 0.5, 1],
              }}
            />

            {/* Gradient definitions */}
            <defs>
              <linearGradient
                id="slashGradient"
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#dc2626" stopOpacity="0" />
                <stop offset="30%" stopColor="#ef4444" stopOpacity="1" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
                <stop offset="70%" stopColor="#ef4444" stopOpacity="1" />
                <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="slashGradient2"
                x1="100%"
                y1="100%"
                x2="0%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
                <stop offset="30%" stopColor="#8b5cf6" stopOpacity="1" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
                <stop offset="70%" stopColor="#8b5cf6" stopOpacity="1" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Particle explosion */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => {
              const angle = (i / 30) * Math.PI * 2;
              const distance = 50 + Math.random() * 50;
              const endX = 50 + Math.cos(angle) * distance;
              const endY = 50 + Math.sin(angle) * distance;

              return (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                    background:
                      i % 2 === 0
                        ? "linear-gradient(135deg, #ef4444, #fbbf24)"
                        : "linear-gradient(135deg, #8b5cf6, #c084fc)",
                    boxShadow:
                      i % 2 === 0
                        ? "0 0 10px #ef4444, 0 0 20px #fbbf24"
                        : "0 0 10px #8b5cf6, 0 0 20px #c084fc",
                  }}
                  initial={{
                    x: "-50%",
                    y: "-50%",
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: `calc(${endX - 50}vw - 50%)`,
                    y: `calc(${endY - 50}vh - 50%)`,
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + Math.random() * 0.2,
                    ease: "easeOut",
                  }}
                />
              );
            })}
          </div>

          {/* Bankai text */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 1.2] }}
            transition={{ duration: 2, times: [0, 0.1, 0.7, 1] }}
          >
            <div className="text-center">
              <h2
                className="text-6xl font-black tracking-widest text-transparent sm:text-8xl"
                style={{
                  background:
                    "linear-gradient(135deg, #ef4444, #fbbf24, #ef4444)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  textShadow: "0 0 40px rgba(239, 68, 68, 0.5)",
                }}
              >
                卍解
              </h2>
              <motion.p
                className="mt-2 text-lg font-bold tracking-[0.3em] text-red-400 sm:text-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
                transition={{
                  duration: 2,
                  delay: 0.2,
                  times: [0, 0.1, 0.7, 1],
                }}
              >
                ZABIMARU
              </motion.p>
            </div>
          </motion.div>

          {/* Screen shake effect via CSS class */}
          <style jsx global>{`
            @keyframes screenShake {
              0%,
              100% {
                transform: translate(0, 0);
              }
              10% {
                transform: translate(-5px, -5px);
              }
              20% {
                transform: translate(5px, 5px);
              }
              30% {
                transform: translate(-5px, 5px);
              }
              40% {
                transform: translate(5px, -5px);
              }
              50% {
                transform: translate(-3px, -3px);
              }
              60% {
                transform: translate(3px, 3px);
              }
              70% {
                transform: translate(-2px, 2px);
              }
              80% {
                transform: translate(2px, -2px);
              }
              90% {
                transform: translate(-1px, -1px);
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
