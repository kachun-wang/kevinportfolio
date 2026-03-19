"use client";

import { motion } from "framer-motion";
import { Music, ExternalLink } from "lucide-react";
import { currentlyListening } from "./about-data";
import { cn } from "@/lib/utils";

export function SpotifyPlayer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/5 backdrop-blur-md",
        "transition-all hover:border-white/20 hover:bg-white/10"
      )}
    >
      {/* Spotify gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-50" />

      {/* Content */}
      <div className="relative space-y-3 p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4 text-green-400" />
            <p className="text-xs font-medium uppercase tracking-wider text-green-400">
              Currently Listening
            </p>
          </div>
          <a
            href={currentlyListening.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Spotify Embed */}
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/track/1KxwZYyzWNyZSRyErj2ojT?utm_source=generator"
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
