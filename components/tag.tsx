import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export const Tag = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border border-border/50 bg-surface/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-foreground/70",
      className,
    )}
    {...props}
  />
);

export const Badge = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "inline-flex items-center justify-center rounded-full border border-border/45 bg-card/80 px-3 py-1 text-[13px] font-medium text-foreground/75",
      className,
    )}
    {...props}
  />
);
