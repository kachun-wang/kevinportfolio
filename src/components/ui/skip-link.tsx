"use client";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[9999] -translate-y-16 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
    >
      Skip to main content
    </a>
  );
}
