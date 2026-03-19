"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticInputProps {
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  isValid?: boolean;
}

export function MagneticInput({
  name,
  label,
  type,
  placeholder,
  required,
  value,
  onChange,
  error,
  isValid,
}: MagneticInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const inputClasses = cn(
    "w-full rounded-xl border bg-white/5 px-4 py-3",
    "text-white placeholder-white/30",
    "outline-none transition-all duration-300",
    "backdrop-blur-md",
    isFocused
      ? "border-purple-500/50 bg-white/10 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
      : "border-white/10 hover:border-white/20",
    error && "border-red-500/50 bg-red-500/5",
    isValid && !error && value && "border-emerald-500/50 bg-emerald-500/5"
  );

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      {/* Glow effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.15), transparent 40%)`,
          opacity: isFocused ? 1 : 0,
        }}
      />

      {/* Label */}
      <label
        htmlFor={name}
        className="mb-2 flex items-center justify-between text-sm font-medium text-white/70"
      >
        <span>
          {label}
          {required && <span className="ml-1 text-purple-400">*</span>}
        </span>
        {isValid && !error && value && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xs text-emerald-400"
          >
            ✓ Valid
          </motion.span>
        )}
      </label>

      {/* Input */}
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={5}
          className={cn(inputClasses, "resize-none")}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={inputClasses}
        />
      )}

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}
