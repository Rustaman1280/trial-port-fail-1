import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface OgImageGeneratorProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  accent?: "mint" | "lilac" | "peach";
}

const accentMap = {
  mint: "from-accent-mint/30 to-transparent",
  lilac: "from-accent-lilac/30 to-transparent",
  peach: "from-accent-peach/30 to-transparent",
} as const;

export const OgImageGenerator = ({
  title,
  description,
  accent = "mint",
  className,
  ...props
}: OgImageGeneratorProps) => (
  <div
    className={cn(
      "relative flex h-64 w-full flex-col justify-between overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-surface via-surface/80 to-surface/95 p-6",
      className,
    )}
    {...props}
  >
    <div className={cn("absolute inset-0 blur-3xl", `bg-gradient-to-br ${accentMap[accent]}`)} aria-hidden />
    <div className="relative space-y-2">
      <span className="inline-flex items-center rounded-full border border-border/40 bg-card/70 px-3 py-1 text-xs uppercase tracking-[0.35em] text-accent-mint">
        Rustaman Delvianova · Crust Dev
      </span>
      <h3 className="text-balance text-3xl font-semibold text-foreground">{title}</h3>
      {description ? <p className="max-w-xl text-sm text-foreground/70">{description}</p> : null}
    </div>
    <div className="relative flex items-center justify-between text-xs text-foreground/60">
      <span>crust.dev</span>
      <span>Build · Design · Ship</span>
    </div>
  </div>
);
