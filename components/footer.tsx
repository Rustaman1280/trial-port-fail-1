import Link from "next/link";
import { socialLinks } from "@/lib/data";
import { Container } from "@/components/container";

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-surface/70 py-12 text-sm text-foreground/70">
      <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-accent-mint">Rustaman Delvianova · Crust Dev</p>
          <p className="max-w-sm text-foreground/60">
            Designing and building high-impact digital experiences that feel crafted, perform fast, and scale with teams of any size.
          </p>
          <p className="text-foreground/50">© {new Date().getFullYear()} Crust Dev. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 transition-colors hover:border-accent-mint hover:text-accent-mint"
            >
              <span>{item.label}</span>
              <span aria-hidden className="transform transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
};
