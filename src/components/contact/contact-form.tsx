"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { MagneticInput } from "./magnetic-input";
import { SuccessAnimation } from "./success-animation";
import { formFields } from "./contact-data";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isBankaiMode, setIsBankaiMode] = useState(false);

  // 3D tilt effect for form
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 100,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!formRef.current) return;

    const rect = formRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Validation
  const validateField = (
    name: keyof FormData,
    value: string
  ): string | undefined => {
    const field = formFields.find((f) => f.name === name);
    if (!field) return undefined;

    if (field.required && !value.trim()) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      const { minLength, maxLength, pattern, message } = field.validation;

      if (minLength && value.length < minLength) {
        return message || `Minimum ${minLength} characters required`;
      }

      if (maxLength && value.length > maxLength) {
        return message || `Maximum ${maxLength} characters allowed`;
      }

      if (pattern && !pattern.test(value)) {
        return message || "Invalid format";
      }
    }

    return undefined;
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change
    if (errors[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isFieldValid = (name: keyof FormData): boolean => {
    return !errors[name] && formData[name].length > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    let hasErrors = false;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    // Check for Bankai easter egg
    const hasBankai =
      formData.message.toLowerCase().includes("bankai") ||
      formData.subject.toLowerCase().includes("bankai");

    try {
      // Simulate API call (replace with actual Resend integration)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, you would call your API route here:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      setIsBankaiMode(hasBankai);
      setShowSuccess(true);

      // Reset form after animation
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      }, 2000);
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessComplete = () => {
    setShowSuccess(false);
    setIsBankaiMode(false);
  };

  return (
    <motion.div
      ref={formRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      {/* Glassmorphism form container */}
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl",
          "border border-white/10 bg-white/5",
          "p-6 backdrop-blur-xl sm:p-8",
          "shadow-2xl shadow-purple-500/10"
        )}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5" />

        {/* Form content */}
        <div className="relative z-10">
          <h3 className="mb-2 text-2xl font-bold text-white">Send a Message</h3>
          <p className="mb-8 text-sm text-white/50">
            Have a project in mind? Let's talk about it.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <MagneticInput
                name="name"
                label="Your Name"
                type="text"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={(value) => handleChange("name", value)}
                error={errors.name}
                isValid={isFieldValid("name")}
              />
              <MagneticInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                required
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
                error={errors.email}
                isValid={isFieldValid("email")}
              />
            </div>

            <MagneticInput
              name="subject"
              label="Subject"
              type="text"
              placeholder="Project Inquiry"
              required
              value={formData.subject}
              onChange={(value) => handleChange("subject", value)}
              error={errors.subject}
              isValid={isFieldValid("subject")}
            />

            <MagneticInput
              name="message"
              label="Message"
              type="textarea"
              placeholder="Tell me about your project, timeline, and budget..."
              required
              value={formData.message}
              onChange={(value) => handleChange("message", value)}
              error={errors.message}
              isValid={isFieldValid("message")}
            />

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative w-full overflow-hidden rounded-xl py-4",
                "bg-gradient-to-r from-purple-600 to-cyan-600",
                "font-semibold text-white",
                "shadow-lg shadow-purple-500/25",
                "transition-all duration-300",
                "hover:shadow-xl hover:shadow-purple-500/30",
                "disabled:cursor-not-allowed disabled:opacity-70"
              )}
            >
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                style={{ opacity: 0.3 }}
              />

              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </span>
            </motion.button>
          </form>
        </div>

        {/* Success animation overlay */}
        <SuccessAnimation
          isVisible={showSuccess}
          isBankaiMode={isBankaiMode}
          onComplete={handleSuccessComplete}
        />
      </div>
    </motion.div>
  );
}
