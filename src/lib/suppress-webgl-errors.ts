/**
 * Suppress WebGL-related console errors in production
 * This prevents the console from being flooded with WebGL errors
 * when the browser/environment doesn't support WebGL properly
 */
export function suppressWebGLErrors() {
  if (typeof window === "undefined" || process.env.NODE_ENV === "development") {
    return;
  }

  // Store original console methods
  const originalError = console.error;
  const originalWarn = console.warn;

  // Override console.error
  console.error = (...args: unknown[]) => {
    const message = args.join(" ");

    // Suppress WebGL-related errors
    if (
      message.includes("WebGL") ||
      message.includes("WebGLRenderer") ||
      message.includes("THREE.WebGLRenderer") ||
      message.includes("Error creating WebGL context") ||
      message.includes("BindToCurrentSequence failed")
    ) {
      return;
    }

    originalError.apply(console, args);
  };

  // Override console.warn
  console.warn = (...args: unknown[]) => {
    const message = args.join(" ");

    // Suppress WebGL-related warnings
    if (
      message.includes("WebGL") ||
      message.includes("WebGLRenderer") ||
      message.includes("THREE.WebGLRenderer")
    ) {
      return;
    }

    originalWarn.apply(console, args);
  };
}
