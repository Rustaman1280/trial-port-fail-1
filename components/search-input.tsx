"use client";

import { Search } from "lucide-react";
import { forwardRef, useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onDebouncedChange?: (value: string) => void;
  debounce?: number;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    { className, onDebouncedChange, debounce = 220, onChange, ...props }: SearchInputProps,
    ref,
  ) => {
    const [value, setValue] = useState(props.value?.toString() ?? "");

    return (
      <label className="relative block">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50">
          <Search className="h-4 w-4" aria-hidden />
        </span>
        <input
          ref={ref}
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const next = event.target.value;
            setValue(next);
            onChange?.(event);
            if (onDebouncedChange) {
              window.clearTimeout((window as typeof window & { __searchTimeout?: number }).__searchTimeout);
              const timeout = window.setTimeout(() => onDebouncedChange(next), debounce);
              (window as typeof window & { __searchTimeout?: number }).__searchTimeout = timeout;
            }
          }}
          className={cn(
            "w-full rounded-2xl border border-border/50 bg-card/70 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-foreground/45 focus:border-accent-mint/60",
            className,
          )}
          {...props}
          type="search"
        />
      </label>
    );
  },
);

SearchInput.displayName = "SearchInput";
