"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonStar, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full border border-border/50 bg-card/60 text-foreground/70 hover:text-accent-mint"
    >
      {mounted ? (
        isDark ? <Sun className="h-4 w-4" aria-hidden /> : <MoonStar className="h-4 w-4" aria-hidden />
      ) : (
        <span className="h-4 w-4" aria-hidden />
      )}
    </Button>
  );
};
