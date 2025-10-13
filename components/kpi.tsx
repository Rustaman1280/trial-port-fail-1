import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface KpiProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  hint?: ReactNode;
}

export const KPI = ({ value, label, hint, className, ...props }: KpiProps) => (
  <div
    className={cn(
      "flex flex-col gap-2 rounded-3xl border border-border/50 bg-card/80 p-6 text-foreground/80 shadow-soft",
      className,
    )}
    {...props}
  >
    <span className="text-4xl font-semibold text-foreground">{value}</span>
    <span className="text-sm uppercase tracking-[0.4em] text-foreground/60">{label}</span>
    {hint ? <p className="text-sm text-foreground/55">{hint}</p> : null}
  </div>
);
