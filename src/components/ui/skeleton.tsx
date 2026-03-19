"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-white/5",
        "relative overflow-hidden",
        "after:absolute after:inset-0",
        "after:translate-x-[-100%]",
        "after:animate-shimmer",
        "after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-transparent",
        className
      )}
    />
  );
}

// Hero skeleton
export function HeroSkeleton() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-slate-950">
      {/* Background gradient placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-slate-950 to-cyan-950/20" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        {/* Badge skeleton */}
        <Skeleton className="h-8 w-48 rounded-full" />

        {/* Name skeleton */}
        <Skeleton className="h-16 w-80 sm:h-24 sm:w-[500px]" />

        {/* Subtitle skeleton */}
        <Skeleton className="h-6 w-64 sm:w-96" />

        {/* Tagline skeleton */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <Skeleton className="h-4 w-72 sm:w-[400px]" />
          <Skeleton className="h-4 w-56 sm:w-[300px]" />
        </div>

        {/* CTA buttons skeleton */}
        <div className="mt-8 flex gap-4">
          <Skeleton className="h-14 w-40 rounded-xl" />
          <Skeleton className="h-14 w-40 rounded-xl" />
        </div>

        {/* Scroll indicator skeleton */}
        <div className="absolute bottom-8">
          <Skeleton className="h-12 w-6 rounded-full" />
        </div>
      </div>
    </section>
  );
}

// Project card skeleton
export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
      <Skeleton className="mb-4 aspect-video w-full rounded-xl" />
      <Skeleton className="mb-2 h-6 w-3/4" />
      <Skeleton className="mb-4 h-4 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

// Projects grid skeleton
export function ProjectsGridSkeleton() {
  return (
    <section className="relative min-h-screen bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header skeleton */}
        <div className="mb-16 text-center">
          <Skeleton className="mx-auto mb-4 h-8 w-32 rounded-full" />
          <Skeleton className="mx-auto h-12 w-80" />
        </div>

        {/* Grid skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// About skeleton
export function AboutSkeleton() {
  return (
    <section className="relative min-h-screen bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Avatar area skeleton */}
          <div className="flex items-center justify-center">
            <Skeleton className="aspect-square w-full max-w-md rounded-3xl" />
          </div>

          {/* Content skeleton */}
          <div className="space-y-8">
            <div>
              <Skeleton className="mb-2 h-8 w-24 rounded-full" />
              <Skeleton className="mb-4 h-12 w-64" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-3/4" />
            </div>

            {/* Timeline skeleton */}
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="mb-2 h-5 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact skeleton
export function ContactSkeleton() {
  return (
    <section className="relative min-h-screen bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header skeleton */}
        <div className="mb-16 text-center">
          <Skeleton className="mx-auto mb-4 h-8 w-32 rounded-full" />
          <Skeleton className="mx-auto mb-2 h-12 w-96" />
          <Skeleton className="mx-auto h-12 w-64" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Info cards skeleton */}
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-2xl" />
              ))}
            </div>
            <Skeleton className="h-16 rounded-2xl" />
            <Skeleton className="h-20 rounded-2xl" />
          </div>

          {/* Form skeleton */}
          <Skeleton className="h-[500px] rounded-3xl" />
        </div>
      </div>
    </section>
  );
}

// Page loading skeleton
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950">
      <HeroSkeleton />
    </div>
  );
}
