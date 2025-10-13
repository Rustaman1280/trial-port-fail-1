"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FiltersProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}

export const Filters = ({ options, active, onChange }: FiltersProps) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option === active;
        return (
          <Button
            key={option}
            variant={isActive ? "primary" : "ghost"}
            className="relative overflow-hidden"
            onClick={() => onChange(option)}
            type="button"
          >
            {isActive ? (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 -z-10 rounded-full bg-accent-mint/15"
                transition={{ type: "spring", stiffness: shouldReduceMotion ? 150 : 320, damping: shouldReduceMotion ? 24 : 28 }}
              />
            ) : null}
            {option}
          </Button>
        );
      })}
    </div>
  );
};
