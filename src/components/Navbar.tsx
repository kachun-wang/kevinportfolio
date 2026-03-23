"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Github, FileText } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

type NavLink = {
  href: string;
  label: string;
  isHash: boolean;
};

const navLinks: NavLink[] = [
  { href: "/", label: "Home", isHash: false },
  { href: "#projects", label: "Projects", isHash: true },
  { href: "#about", label: "About", isHash: true },
  { href: "#contact", label: "Contact", isHash: true },
];

// Helper function to handle hash link navigation
function handleHashLink(
  href: string,
  router: ReturnType<typeof useRouter>,
  pathname: string
) {
  const hash = href.replace("#", "");

  const scrollToHash = () => {
    const element = document.getElementById(hash);
    if (element) {
      // Account for fixed navbar height
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (pathname === "/") {
    // Already on home page, just scroll
    scrollToHash();
  } else {
    // Navigate to home first, then scroll after navigation
    router.push("/");
    // Wait for navigation and DOM update
    let retries = 0;
    const maxRetries = 10;
    const checkAndScroll = () => {
      const element = document.getElementById(hash);
      if (element) {
        scrollToHash();
      } else if (retries < maxRetries) {
        retries++;
        setTimeout(checkAndScroll, 100);
      }
    };
    setTimeout(checkAndScroll, 300);
  }
}

const navbarVariants = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const,
      when: "beforeChildren" as const,
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.15, ease: "easeIn" as const },
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
};

const linkBaseClasses =
  "relative inline-flex items-center text-sm font-medium text-white/80 transition-colors duration-200 hover:text-cyan-300";

function DesktopNavLinks({
  pathname,
  router,
  activeSection,
}: {
  pathname: string;
  router: ReturnType<typeof useRouter>;
  activeSection: string;
}) {
  return (
    <nav className="hidden items-center gap-8 md:flex">
      {navLinks.map((link) => {
        // Determine if this link is active
        const isActive = link.isHash
          ? activeSection === link.href
          : link.href === "/"
            ? activeSection === "/" && pathname === "/"
            : pathname === link.href;

        if (link.isHash) {
          return (
            <button
              key={link.href}
              onClick={() => handleHashLink(link.href, router, pathname)}
              className={linkBaseClasses}
            >
              <span>{link.label}</span>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-underline"
                    className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
                    initial={{ opacity: 0, scaleX: 0.6 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.4 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
            </button>
          );
        }

        return (
          <Link key={link.href} href={link.href} className={linkBaseClasses}>
            <span>{link.label}</span>
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.span
                  layoutId="navbar-active-underline"
                  className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
                  initial={{ opacity: 0, scaleX: 0.6 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0.4 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
          </Link>
        );
      })}
    </nav>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const { scrollY } = useScroll();
  const prevPathnameRef = useRef(pathname);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  // Track active section based on scroll position
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(pathname);
      return;
    }

    const handleScroll = () => {
      const sections = ["contact", "about", "projects"];
      const scrollPosition = window.scrollY + 150; // Offset for navbar height

      // Check if we're at the top (home section)
      if (window.scrollY < 100) {
        setActiveSection("/");
        return;
      }

      // Check each section from bottom to top
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(`#${sectionId}`);
            return;
          }
        }
      }

      // Default to home if no section matches
      setActiveSection("/");
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      setMobileOpen(false);
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  // Handle hash links on mount if URL has hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, [pathname]);

  return (
    <>
      <motion.header
        variants={navbarVariants}
        initial="initial"
        animate="animate"
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={[
            "mx-auto flex h-14 xs:h-16 max-w-6xl items-center justify-between gap-2 overflow-hidden rounded-b-3xl border border-white/10 bg-black/30 px-3 xs:px-4 shadow-lg shadow-black/40 backdrop-blur-md md:h-20 md:px-12",
            "transition-all duration-300 min-w-0",
            scrolled
              ? "border-white/15 bg-black/40 shadow-md backdrop-blur-lg"
              : "",
          ].join(" ")}
        >
          {/* Left: Brand */}
          <Link
            href="/"
            className="relative inline-flex min-w-0 flex-shrink items-center gap-1 xs:gap-1.5 overflow-hidden md:gap-2"
          >
            <span className="hidden shrink-0 text-[0.6rem] xs:text-xs font-medium uppercase tracking-[0.3em] xs:tracking-[0.35em] text-white/50 md:inline md:text-[0.7rem]">
              AI ENGINEER
            </span>
            <span className="hidden h-4 w-px shrink-0 bg-gradient-to-b from-purple-500/40 via-white/40 to-cyan-400/40 md:block" />
            <span className="truncate bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-base xs:text-lg font-bold tracking-tight text-transparent md:text-2xl">
              Kevin Chung
            </span>
          </Link>

          {/* Center: Links (desktop) */}
          <DesktopNavLinks
            pathname={pathname}
            router={router}
            activeSection={activeSection}
          />
        </div>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-lg md:hidden"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute right-6 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 shadow-md"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" />
            </motion.button>

            <motion.nav className="flex flex-col items-center gap-8 text-3xl font-semibold text-white">
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={mobileLinkVariants}>
                  {link.isHash ? (
                    <button
                      onClick={() => {
                        handleHashLink(link.href, router, pathname);
                        setMobileOpen(false);
                      }}
                      className="relative inline-flex items-center gap-2 text-white/90 transition-colors hover:text-cyan-300"
                    >
                      <span>{link.label}</span>
                      <span className="h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="relative inline-flex items-center gap-2 text-white/90 transition-colors hover:text-cyan-300"
                    >
                      <span>{link.label}</span>
                      <span className="h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div variants={mobileLinkVariants} className="pt-2">
                <button
                  onClick={() => {
                    handleHashLink("#contact", router, pathname);
                    setMobileOpen(false);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-400/60 bg-cyan-500/20 px-6 py-2 text-lg font-medium text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.45)] backdrop-blur-md transition-all hover:bg-cyan-500/35"
                >
                  Get in Touch
                </button>
              </motion.div>
            </motion.nav>

            {/* Hint for smooth page transitions (works with AnimatePresence in layout) */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.7, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.2 }}
              className="mt-10 text-xs text-white/60"
            >
              Pages use shared motion IDs for smoother transitions.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
