import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export const Prose = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "prose prose-invert prose-headings:font-semibold prose-headings:text-foreground prose-a:text-accent-mint prose-strong:text-foreground/90 prose-code:rounded-md prose-code:bg-card prose-code:px-2 prose-code:py-1 prose-code:font-mono prose-pre:bg-card/70 prose-pre:p-4 prose-hr:border-border/60",
        "prose-blockquote:border-l-accent-lilac prose-blockquote:text-foreground/80 prose-li:marker:text-accent-peach",
        className,
      )}
      {...props}
    />
  );
};
