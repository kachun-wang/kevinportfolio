"use client";

import { useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMove = (clientX: number, clientY: number) => {
      targetX = (clientX / window.innerWidth) * 2 - 1;
      targetY = -(clientY / window.innerHeight) * 2 + 1;
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    // Smooth interpolation loop
    const animate = () => {
      // Lerp factor for smooth movement
      const lerp = 0.05;
      currentX += (targetX - currentX) * lerp;
      currentY += (targetY - currentY) * lerp;

      setPosition({
        x: currentX * window.innerWidth,
        y: currentY * window.innerHeight,
        normalizedX: currentX,
        normalizedY: currentY,
      });

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return position;
}
