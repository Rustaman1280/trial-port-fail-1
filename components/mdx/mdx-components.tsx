import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { useMDXComponent } from "next-contentlayer/hooks";
import type { ComponentProps, ReactNode } from "react";
import { Prose } from "@/components/prose";
import { cn } from "@/lib/utils";

export const Callout = ({
  type = "info",
  title,
  children,
}: { type?: "info" | "success" | "warning"; title?: string; children: ReactNode }) => {
  const accents = {
    info: "border-accent-lilac/60 bg-accent-lilac/10",
    success: "border-accent-mint/60 bg-accent-mint/10",
    warning: "border-accent-peach/60 bg-accent-peach/10",
  } as const;
  return (
    <div className={cn("space-y-2 rounded-2xl border px-5 py-4", accents[type])}>
      {title ? <p className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground/70">{title}</p> : null}
      <div className="text-sm leading-relaxed text-foreground/80">{children}</div>
    </div>
  );
};

export const Steps = ({ children }: { children: ReactNode }) => {
  const items = Array.isArray(children) ? children : [children];
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {items.map((child, index) => (
        <li key={index} className="relative rounded-2xl border border-border/45 bg-card/70 p-5">
          <span className="absolute left-5 top-4 text-xs font-semibold text-accent-mint">{String(index + 1).padStart(2, "0")}</span>
          <div className="pt-6 text-sm text-foreground/75">{child}</div>
        </li>
      ))}
    </ol>
  );
};

export const Gallery = ({ images }: { images: Array<{ src: string; alt: string }> }) => (
  <div className="grid gap-4 md:grid-cols-2">
    {images.map((image) => (
      <Image
        key={image.src}
        src={image.src}
        alt={image.alt}
        width={1600}
        height={1200}
        className="rounded-3xl border border-border/40 object-cover"
      />
    ))}
  </div>
);

export const Code = ({ children, className, title }: { children: ReactNode; className?: string; title?: string }) => (
  <div className="space-y-2 rounded-2xl border border-border/50 bg-surface/80 p-4">
    {title ? <div className="text-xs uppercase tracking-[0.3em] text-foreground/55">{title}</div> : null}
    <pre className={cn("overflow-x-auto rounded-xl bg-card/80 p-4 text-sm", className)}>{children}</pre>
  </div>
);

export const mdxComponents: MDXComponents = {
  Image,
  Callout,
  Steps,
  Gallery,
  Code,
  pre: ({ children }: { children: ReactNode }) => <>{children}</>,
};

export const Mdx = ({ code, className }: { code: string; className?: string }) => {
  const Component = useMDXComponent(code);
  return (
    <Prose className={className}>
      <Component components={mdxComponents as ComponentProps<typeof Component>["components"]} />
    </Prose>
  );
};
