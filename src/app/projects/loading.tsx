"use client";

export default function ProjectsLoading() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Skeleton */}
      <section className="relative overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            {/* Badge skeleton */}
            <div className="mb-6 h-10 w-32 animate-pulse rounded-full bg-white/5" />
            {/* Title skeleton */}
            <div className="mb-4 h-16 w-64 animate-pulse rounded-xl bg-white/5 sm:w-80" />
            {/* Subtitle skeleton */}
            <div className="h-6 w-48 animate-pulse rounded-lg bg-white/5 sm:w-72" />
          </div>
        </div>
      </section>

      {/* Featured Section Skeleton */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Section header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="mb-2 h-8 w-48 animate-pulse rounded-lg bg-white/5" />
              <div className="h-5 w-36 animate-pulse rounded-lg bg-white/5" />
            </div>
            <div className="hidden h-10 w-32 animate-pulse rounded-full bg-white/5 sm:block" />
          </div>

          {/* Featured grid skeleton */}
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Large featured card */}
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
              <div className="aspect-[16/10] w-full animate-pulse rounded-2xl bg-white/5 lg:aspect-[16/14]">
                <div className="relative h-full overflow-hidden rounded-2xl">
                  <div className="shimmer absolute inset-0" />
                </div>
              </div>
            </div>
            {/* Smaller cards */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="aspect-[16/10] w-full animate-pulse rounded-2xl bg-white/5"
              >
                <div className="relative h-full overflow-hidden rounded-2xl">
                  <div className="shimmer absolute inset-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Section Skeleton */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Section header */}
          <div className="mb-8">
            <div className="mb-2 h-8 w-40 animate-pulse rounded-lg bg-white/5" />
            <div className="h-5 w-56 animate-pulse rounded-lg bg-white/5" />
          </div>

          {/* Filter chips skeleton */}
          <div className="mb-8 flex gap-2 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-9 w-20 flex-shrink-0 animate-pulse rounded-full bg-white/5"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>

          {/* Grid skeleton */}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="aspect-[16/12] w-full animate-pulse rounded-2xl bg-white/5"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="relative h-full overflow-hidden rounded-2xl">
                  <div className="shimmer absolute inset-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shimmer animation style */}
      <style jsx>{`
        .shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.05) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </main>
  );
}
