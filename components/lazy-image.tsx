import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export const LazyImage = ({ className, ...props }: ImageProps) => (
  <Image
    className={cn("rounded-3xl border border-border/40 object-cover", className)}
    placeholder={props.placeholder ?? "empty"}
    loading={props.loading ?? "lazy"}
    {...props}
  />
);
