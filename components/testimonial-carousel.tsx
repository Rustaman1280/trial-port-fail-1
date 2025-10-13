"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/lib/data";

export const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  const testimonial = testimonials[index];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-surface/80 p-8 text-left shadow-soft">
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={testimonial.name}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
          transition={{ type: "spring", stiffness: shouldReduceMotion ? 140 : 280, damping: shouldReduceMotion ? 20 : 26 }}
          className="space-y-6"
        >
          <p className="text-lg leading-relaxed text-foreground/85">“{testimonial.quote}”</p>
          <footer className="text-sm text-foreground/60">
            <p className="font-semibold text-foreground">{testimonial.name}</p>
            <p>{testimonial.role}</p>
          </footer>
        </motion.blockquote>
      </AnimatePresence>
      <div className="mt-6 flex items-center gap-1">
        {testimonials.map((item, itemIndex) => (
          <button
            key={item.name}
            type="button"
            aria-label={`Show testimonial from ${item.name}`}
            onClick={() => setIndex(itemIndex)}
            className="group relative flex h-2 w-10 overflow-hidden rounded-full bg-border/60"
          >
            <span
              className="absolute inset-0 origin-left bg-accent-mint transition-transform duration-500"
              style={{ transform: `scaleX(${index === itemIndex ? 1 : 0.2})` }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
