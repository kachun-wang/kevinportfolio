"use client";
/* eslint-disable react-hooks/purity */

import { motion, type Variants } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Sparkles,
  MessageSquare,
  Zap,
} from "lucide-react";
import { ContactForm } from "./contact-form";
import { SocialLinks } from "./social-links";
import { contactInfo } from "./contact-data";
import { useMounted } from "@/hooks";
import { cn } from "@/lib/utils";

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

// Floating particles background
function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-purple-500/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

// Info card component
function InfoCard({
  icon: Icon,
  title,
  value,
  gradient,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  gradient: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -5 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/5 p-5",
        "backdrop-blur-md transition-all duration-300",
        "hover:border-white/20 hover:bg-white/10"
      )}
    >
      {/* Gradient accent */}
      <div
        className={cn(
          "absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-20 blur-2xl",
          "transition-opacity group-hover:opacity-40",
          gradient
        )}
      />

      <div className="relative flex items-start gap-4">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            gradient
          )}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm text-white/50">{title}</p>
          <p className="font-medium text-white">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ContactSection() {
  const mounted = useMounted();

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
      id="contact"
      className="relative min-h-screen overflow-hidden bg-slate-950 py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/5 to-slate-950" />

        {/* Gradient orbs */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-purple-600/5 blur-[150px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-0 h-[500px] w-[500px] rounded-full bg-cyan-600/5 blur-[120px]"
        />

        <FloatingParticles />
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
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2"
          >
            <MessageSquare className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              Get in Touch
            </span>
          </motion.div>

          <h2 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Let's Build Something
            </span>
            <br />
            <span className="text-white">Amazing Together</span>
          </h2>

          <p className="mx-auto max-w-2xl text-white/50">
            Whether you have a project in mind, want to collaborate, or just
            want to say hi — my inbox is always open.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column - Info & Social */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard
                icon={Mail}
                title="Email"
                value={contactInfo.email}
                gradient="bg-gradient-to-br from-purple-500 to-purple-600"
              />
              <InfoCard
                icon={MapPin}
                title="Location"
                value={contactInfo.location}
                gradient="bg-gradient-to-br from-cyan-500 to-cyan-600"
              />
              <InfoCard
                icon={Clock}
                title="Timezone"
                value={contactInfo.timezone}
                gradient="bg-gradient-to-br from-fuchsia-500 to-fuchsia-600"
              />
              <InfoCard
                icon={Zap}
                title="Response Time"
                value={contactInfo.responseTime}
                gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
              />
            </div>

            {/* Availability badge */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 sm:justify-start"
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <span className="font-medium text-emerald-300">
                {contactInfo.availability}
              </span>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-white/40 sm:text-left">
                Connect with me
              </h3>
              <SocialLinks />
            </motion.div>

            {/* Fun fact */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 h-5 w-5 shrink-0 text-purple-400" />
                <div>
                  <p className="font-medium text-white">Fun fact</p>
                  <p className="mt-1 text-sm text-white/60">
                    If you include &quot;Bankai&quot; in your message, you might
                    trigger a special surprise... 🗡️
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
