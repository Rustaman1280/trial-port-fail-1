import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
}

export const Section = ({
  eyebrow,
  title,
  description,
  className,
  children,
  ...props
}: SectionProps) => {
  return (
    <section
      className={cn(
        "relative isolate flex w-full flex-col gap-10 rounded-3xl border border-border/40 bg-card/70 p-10 shadow-[0_1.5px_0_rgba(57,225,173,0.2),0_25px_80px_-45px_rgba(11,14,20,0.8)] backdrop-blur-soft",
        className,
      )}
      {...props}
    >
      {(eyebrow || title || description) && (
        <header className="space-y-4">
          {eyebrow ? (
            <span className="inline-flex items-center rounded-full border border-accent-mint/35 bg-accent-mint/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent-mint">
              {eyebrow}
            </span>
          ) : null}
          {title ? <h2 className="text-balance text-3xl font-semibold text-foreground lg:text-4xl">{title}</h2> : null}
          {description ? (
            <p className="max-w-2xl text-base leading-relaxed text-foreground/70">{description}</p>
          ) : null}
        </header>
      )}
      {children}
    </section>
  );
};
