import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  as?: keyof HTMLElementTagNameMap;
};

export const Container = ({ as: Component = "div", className, ...props }: ContainerProps) => {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10",
        className,
      )}
      {...props}
    />
  );
};
