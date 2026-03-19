"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks";

interface Point {
  x: number;
  y: number;
  age: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const isDesktop = useMediaQuery("(min-width: 1024px) and (hover: hover)");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new point
      if (isVisible) {
        pointsRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          age: 0,
        });
      }

      // Update and draw points
      const maxAge = 30;
      const maxPoints = 50;

      // Remove old points
      pointsRef.current = pointsRef.current
        .map((p) => ({ ...p, age: p.age + 1 }))
        .filter((p) => p.age < maxAge)
        .slice(-maxPoints);

      // Draw trail
      if (pointsRef.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y);

        for (let i = 1; i < pointsRef.current.length; i++) {
          const point = pointsRef.current[i];
          const prevPoint = pointsRef.current[i - 1];

          // Smooth curve
          const midX = (prevPoint.x + point.x) / 2;
          const midY = (prevPoint.y + point.y) / 2;
          ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, midX, midY);
        }

        // Gradient stroke
        const gradient = ctx.createLinearGradient(
          pointsRef.current[0].x,
          pointsRef.current[0].y,
          pointsRef.current[pointsRef.current.length - 1].x,
          pointsRef.current[pointsRef.current.length - 1].y
        );
        gradient.addColorStop(0, "rgba(139, 92, 246, 0)");
        gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.3)");
        gradient.addColorStop(1, "rgba(6, 182, 212, 0.5)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        // Draw glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(139, 92, 246, 0.5)";
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw cursor dot
      if (isVisible && pointsRef.current.length > 0) {
        const lastPoint = pointsRef.current[pointsRef.current.length - 1];

        // Outer glow
        const gradient = ctx.createRadialGradient(
          lastPoint.x,
          lastPoint.y,
          0,
          lastPoint.x,
          lastPoint.y,
          20
        );
        gradient.addColorStop(0, "rgba(6, 182, 212, 0.4)");
        gradient.addColorStop(1, "rgba(6, 182, 212, 0)");

        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Inner dot
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isDesktop, isVisible]);

  if (!isDesktop) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
