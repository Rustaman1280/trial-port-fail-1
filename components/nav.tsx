"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export const Nav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleNavigate = () => setOpen(false);

  return (
    <header className="sticky top-6 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border/60 bg-surface/60 px-6 py-3 shadow-[0_12px_35px_-30px_rgba(57,225,173,0.7)] backdrop-blur-soft">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-accent-mint/90 text-background shadow-accent">RD</span>
          <span className="hidden text-sm sm:inline">Rustaman Delvianova</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors duration-200",
                  isActive && "text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent-mint/15"
                    transition={{ type: "spring", stiffness: shouldReduceMotion ? 0 : 280, damping: shouldReduceMotion ? 1 : 24 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
          <Button asChild variant="outline" size="sm" className="ml-2">
            <Link href="/resume">Download CV</Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle navigation"
            onClick={() => setOpen((prevOpen: boolean) => !prevOpen)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </Button>
        </div>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: shouldReduceMotion ? 100 : 320, damping: shouldReduceMotion ? 18 : 28 }}
            className="mx-auto mt-3 flex max-w-6xl flex-col gap-2 rounded-3xl border border-border/60 bg-surface/80 p-6 text-sm shadow-soft backdrop-blur-soft md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavigate}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-foreground/80 transition-colors",
                  pathname === link.href && "bg-accent-mint/10 text-foreground",
                )}
              >
                {link.label}
                <span aria-hidden>→</span>
              </Link>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};
