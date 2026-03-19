"use client";

import { motion } from "framer-motion";
import { Heart, Coffee } from "lucide-react";
import { SocialIconsFooter } from "./social-links";
import { GradientText } from "@/components/ui";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-slate-950">
      {/* Gradient line at top */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3 md:items-center">
          {/* Left - Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="mb-2 text-2xl font-bold">
              <GradientText>KC</GradientText>
            </div>
            <p className="text-sm text-white/40">Building the future with AI</p>
          </motion.div>

          {/* Center - Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center"
          >
            <SocialIconsFooter />
          </motion.div>

          {/* Right - Credits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="flex items-center justify-center gap-1 text-sm text-white/40 md:justify-end">
              Made with{" "}
              <Heart className="h-4 w-4 text-red-500" fill="currentColor" /> and{" "}
              <Coffee className="h-4 w-4 text-amber-500" />
            </p>
            <p className="mt-1 text-sm text-white/40">
              © {currentYear} Kevin Chung
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
