"use client";

import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-55",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-mint/90 text-background shadow-accent hover:bg-accent-mint focus-visible:outline-accent-mint",
        outline:
          "border border-accent-mint/40 bg-transparent text-accent-mint hover:border-accent-mint hover:text-accent-mint focus-visible:outline-accent-mint",
        subtle:
          "bg-card/60 text-foreground shadow-soft hover:bg-card focus-visible:outline-accent-lilac",
        ghost: "bg-transparent text-foreground hover:bg-muted/60 focus-visible:outline-accent-peach",
      },
      size: {
        md: "h-11",
        lg: "h-12 px-6 text-base",
        sm: "h-9 px-4 text-xs",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), "motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-0.5", className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
