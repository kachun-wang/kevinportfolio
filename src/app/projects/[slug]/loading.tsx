"use client";

export default function ProjectLoading() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero skeleton */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden sm:h-[70vh]">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-purple-950/20 via-slate-950 to-cyan-950/20">
          <div className="shimmer absolute inset-0" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent">
          <div className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6 sm:pb-16">
            {/* Back button skeleton */}
            <div className="mb-6 h-10 w-40 animate-pulse rounded-full bg-white/10" />
            {/* Categories skeleton */}
            <div className="mb-4 flex gap-2">
              <div className="h-7 w-20 animate-pulse rounded-full bg-white/10" />
              <div className="h-7 w-24 animate-pulse rounded-full bg-white/10" />
            </div>
            {/* Title skeleton */}
            <div className="mb-4 h-12 w-[80%] animate-pulse rounded-xl bg-white/10 sm:h-16" />
            {/* Impact skeleton */}
            <div className="h-8 w-48 animate-pulse rounded-lg bg-white/10" />
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="relative -mt-8 sm:-mt-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl sm:p-8 md:p-10">
            {/* Description skeleton */}
            <div className="mb-10 space-y-3">
              <div className="h-5 w-full animate-pulse rounded-lg bg-white/5" />
              <div className="h-5 w-full animate-pulse rounded-lg bg-white/5" />
              <div className="h-5 w-3/4 animate-pulse rounded-lg bg-white/5" />
            </div>

            {/* Tech stack skeleton */}
            <div className="mb-10">
              <div className="mb-4 h-6 w-32 animate-pulse rounded-lg bg-white/5" />
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-24 animate-pulse rounded-full bg-white/5"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            </div>

            {/* Technical highlights skeleton */}
            <div className="mb-10">
              <div className="mb-4 h-6 w-48 animate-pulse rounded-lg bg-white/5" />
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="mt-1 h-4 w-4 animate-pulse rounded bg-white/5" />
                    <div className="h-5 flex-1 animate-pulse rounded-lg bg-white/5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges skeleton */}
            <div className="mb-10">
              <div className="mb-4 h-6 w-56 animate-pulse rounded-lg bg-white/5" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 w-full animate-pulse rounded-xl bg-white/5"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            </div>

            {/* Gallery skeleton */}
            <div>
              <div className="mb-4 h-6 w-24 animate-pulse rounded-lg bg-white/5" />
              <div className="aspect-[16/10] w-full animate-pulse rounded-2xl bg-white/5">
                <div className="shimmer relative h-full overflow-hidden rounded-2xl" />
              </div>
              <div className="mt-4 flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 w-24 animate-pulse rounded-lg bg-white/5"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation skeleton */}
          <div className="mt-12 flex justify-center gap-4 pb-16">
            <div className="h-12 w-48 animate-pulse rounded-full bg-white/5" />
            <div className="h-12 w-36 animate-pulse rounded-full bg-white/5" />
          </div>
        </div>
      </section>

      {/* Shimmer animation style */}
      <style jsx>{`
        .shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.03) 50%,
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
    </div>
  );
}
