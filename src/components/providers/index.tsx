"use client";

import { ReactNode, Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { SkipLink } from "@/components/ui";

// Lazy load Lenis (smooth scroll) - not critical for initial render
const LenisProvider = lazy(() =>
  import("./lenis-provider").then((mod) => ({ default: mod.LenisProvider }))
);

// Lazy load cursor trail (desktop only, non-critical)
const CursorTrail = lazy(() =>
  import("@/components/ui/cursor-trail").then((mod) => ({
    default: mod.CursorTrail,
  }))
);

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Skip to content for accessibility */}
      <SkipLink />

      {mounted ? (
        <Suspense
          fallback={
            <main id="main-content" className="min-w-0 overflow-x-hidden">
              {children}
            </main>
          }
        >
          <LenisProvider>
            <main id="main-content" className="min-w-0 overflow-x-hidden">
              {children}
            </main>
          </LenisProvider>
        </Suspense>
      ) : (
        <main id="main-content" className="min-w-0 overflow-x-hidden">
          {children}
        </main>
      )}

      {/* Cursor trail (desktop only) */}
      {mounted && (
        <Suspense fallback={null}>
          <CursorTrail />
        </Suspense>
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "inherit",
          },
        }}
      />
    </>
  );
}
