"use client";

import { motion } from "framer-motion";
import { Github, Send, Mail, type LucideProps } from "lucide-react";
import { socialLinks } from "./contact-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  github: Github,
  mail: Mail,
  send: Send,
};

export function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {socialLinks.map((link, index) => {
        const Icon = iconMap[link.icon];

        return (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative"
          >
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-2 rounded-2xl opacity-0 blur-xl transition-opacity group-hover:opacity-100"
              style={{ backgroundColor: link.color }}
            />

            {/* Button */}
            <div
              className={cn(
                "relative flex items-center gap-3 rounded-xl",
                "border border-white/10 bg-white/5 px-5 py-3",
                "backdrop-blur-md transition-all duration-300",
                "group-hover:border-white/20 group-hover:bg-white/10"
              )}
            >
              {/* Icon with glow */}
              <div className="relative">
                <Icon
                  className="h-5 w-5 transition-colors"
                  style={{ color: link.color }}
                />
                {/* Icon glow */}
                <motion.div
                  className="absolute inset-0 blur-md opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ backgroundColor: link.color }}
                />
              </div>

              {/* Text */}
              <div className="text-left">
                <p className="text-sm font-medium text-white">{link.name}</p>
                <p className="text-xs text-white/50">{link.handle}</p>
              </div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}

// Footer version with icons only
export function SocialIconsFooter() {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((link, index) => {
        const Icon = iconMap[link.icon];

        return (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.2, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="group relative"
            aria-label={link.name}
          >
            {/* Glow */}
            <motion.div
              className="absolute -inset-3 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50"
              style={{ backgroundColor: link.color }}
            />

            {/* Icon */}
            <div
              className={cn(
                "relative flex h-12 w-12 items-center justify-center rounded-full",
                "border border-white/10 bg-white/5 backdrop-blur-md",
                "transition-all duration-300",
                "group-hover:border-white/20 group-hover:bg-white/10"
              )}
            >
              <Icon
                className="h-5 w-5 text-white/60 transition-colors group-hover:text-white"
                style={{
                  filter: "drop-shadow(0 0 0 transparent)",
                  transition: "filter 0.3s, color 0.3s",
                }}
              />

              {/* Hover glow on icon */}
              <motion.div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <Icon
                  className="h-5 w-5"
                  style={{
                    color: link.color,
                    filter: `drop-shadow(0 0 8px ${link.color})`,
                  }}
                />
              </motion.div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
