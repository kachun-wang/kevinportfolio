"use client";

import { Canvas } from "@react-three/fiber";
import { useState, useEffect, ReactNode, Component } from "react";
import type { CanvasProps } from "@react-three/fiber";

interface SafeCanvasProps extends CanvasProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// Error boundary specifically for Canvas errors
class CanvasErrorBoundary extends Component<
  { children: ReactNode; onError: () => void; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: {
    children: ReactNode;
    onError: () => void;
    fallback: ReactNode;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Suppress WebGL errors in console
    if (
      error.message.includes("WebGL") ||
      error.message.includes("WebGLRenderer") ||
      error.message.includes("context")
    ) {
      // Silently handle WebGL errors
      this.props.onError();
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function SafeCanvas({ children, fallback, ...props }: SafeCanvasProps) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [renderAttempted, setRenderAttempted] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Comprehensive WebGL check
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");

      if (!gl || !("getParameter" in gl)) {
        setHasWebGL(false);
        return;
      }

      // Additional checks for WebGL functionality
      const debugInfo = (gl as WebGLRenderingContext).getExtension(
        "WEBGL_debug_renderer_info"
      );
      if (debugInfo) {
        const renderer = (gl as WebGLRenderingContext).getParameter(
          debugInfo.UNMASKED_RENDERER_WEBGL
        );
        // Check for software renderer (llvmpipe, SwiftShader, etc.)
        if (
          renderer &&
          typeof renderer === "string" &&
          (renderer.includes("llvmpipe") ||
            renderer.includes("SwiftShader") ||
            renderer.includes("Microsoft Basic Render"))
        ) {
          // Software renderer detected - likely to fail
          setHasWebGL(false);
          return;
        }
      }

      setHasWebGL(true);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  const handleError = () => {
    setHasWebGL(false);
    setRenderAttempted(true);
  };

  // Don't render on server
  if (!isClient || hasWebGL === null) {
    return null;
  }

  // Show fallback if no WebGL or if render was attempted and failed
  if (hasWebGL === false || renderAttempted) {
    return <>{fallback || null}</>;
  }

  // Wrap in try-catch to prevent any errors from propagating
  try {
    return (
      <CanvasErrorBoundary onError={handleError} fallback={fallback || null}>
        <Canvas
          {...props}
          onCreated={(state) => {
            try {
              // Validate WebGL context
              const gl = state.gl.getContext();
              if (!gl) {
                setHasWebGL(false);
                return;
              }
              if (props.onCreated) {
                props.onCreated(state);
              }
            } catch (e) {
              setHasWebGL(false);
            }
          }}
        >
          {children}
        </Canvas>
      </CanvasErrorBoundary>
    );
  } catch (e) {
    // If Canvas creation throws immediately, show fallback
    return <>{fallback || null}</>;
  }
}
