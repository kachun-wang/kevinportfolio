"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { MapPin, Mail, Github, Send, Sparkles, Download } from "lucide-react";
import { bio } from "./about-data";
import { CareerTimeline } from "./career-timeline";
import { SpotifyPlayer } from "./spotify-player";
import { SkillsDisplay } from "./skills-display";
import { useMounted } from "@/hooks";
import { cn } from "@/lib/utils";

// Dynamically import 3D avatar scene
const AvatarScene = dynamic(
  () => import("./avatar-scene").then((mod) => mod.AvatarScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 rounded-full border-2 border-purple-500/30 border-t-purple-500"
        />
      </div>
    ),
  }
);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// Social links
const socialLinks = [
  { icon: Github, href: bio.github, label: "GitHub" },
  { icon: Mail, href: `mailto:${bio.email}`, label: "Email" },
];

export function AboutSection() {
  const mounted = useMounted();
  const [avatarMouse, setAvatarMouse] = useState({ x: 0, y: 0 });

  // Track mouse position relative to avatar container
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      const avatarContainer = document.getElementById("avatar-container");
      if (!avatarContainer) return;

      const rect = avatarContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setAvatarMouse({
        x: (e.clientX - centerX) / (rect.width / 2),
        y: (e.clientY - centerY) / (rect.height / 2),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted]);

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
      id="about"
      className="relative min-h-screen overflow-hidden bg-slate-950 py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/5 to-slate-950" />
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 top-1/4 h-[600px] w-[600px] rounded-full bg-purple-600/5 blur-[150px] pointer-events-none"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-0 h-[500px] w-[500px] rounded-full bg-cyan-600/5 blur-[120px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2"
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">About Me</span>
          </motion.div>
          <h2 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              The Human Behind the Code
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-white/50">
            AI Engineer, open-source contributor, and eternal student of machine
            intelligence.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Avatar & Bio */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* 3D Avatar */}
            <motion.div
              variants={itemVariants}
              id="avatar-container"
              className="relative aspect-square max-h-[500px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/20 to-cyan-900/20"
            >
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10" />

              {/* Avatar scene */}
              <AvatarScene mousePosition={avatarMouse} />

              {/* Name overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">{bio.name}</h3>
                <p className="text-purple-300">{bio.title}</p>
              </div>
            </motion.div>

            {/* Location & Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2 text-white/60">
                <MapPin className="h-4 w-4 text-purple-400" />
                <span className="text-sm">{bio.location}</span>
              </div>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-lg font-medium leading-relaxed text-white/80">
                {bio.tagline}
              </p>
              <p className="text-sm leading-relaxed text-white/50 whitespace-pre-line">
                {bio.description}
              </p>
            </motion.div>

            {/* Spotify Player */}
            <motion.div variants={itemVariants}>
              <SpotifyPlayer />
            </motion.div>
          </motion.div>

          {/* Right Column - Timeline & Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Career Timeline */}
            <motion.div variants={itemVariants}>
              <CareerTimeline />
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Section (Full Width) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="mb-8 text-center">
            <h3 className="mb-2 text-2xl font-bold text-white">
              Technical Arsenal
            </h3>
            <p className="text-sm text-white/50">
              Tools and technologies I work with daily
            </p>
          </div>
          <SkillsDisplay />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="mb-6 text-white/50">
            Interested in working together? Let&apos;s build something amazing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
