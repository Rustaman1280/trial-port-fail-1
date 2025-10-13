"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "contentlayer/generated";
import { Badge } from "@/components/tag";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export const ProjectCard = ({ project, priority }: ProjectCardProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: "spring", stiffness: shouldReduceMotion ? 120 : 280, damping: shouldReduceMotion ? 15 : 28 }}
      className="group relative flex h-full flex-col justify-between gap-6 rounded-3xl border border-border/40 bg-card/80 p-6 shadow-soft transition-transform duration-200 will-change-transform hover:-translate-y-1 hover:shadow-accent"
    >
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-3xl border border-border/40">
          <Image
            src={project.cover}
            alt={project.title}
            width={1200}
            height={720}
            className="h-52 w-full rounded-3xl object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] group-hover:-rotate-[1deg]"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-mint/5 via-transparent to-accent-lilac/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-accent-mint/80">
          <span>{project.year}</span>
          <span className="h-[1px] flex-1 bg-border/60" aria-hidden />
          <span>{project.tags.slice(0, 2).join(" • ")}</span>
        </div>
        <h3 className="text-2xl font-semibold text-balance text-foreground">{project.title}</h3>
        <p className="text-sm leading-relaxed text-foreground/65">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 6).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-xs text-foreground/60">
          {project.outcomes.slice(0, 2).map((outcome) => (
            <span key={outcome} className={cn("inline-flex items-center gap-2 rounded-full border border-border/45 px-3 py-1")}>● {outcome}</span>
          ))}
        </div>
        <Link
          href={project.url}
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-transparent px-4 py-2 text-sm font-medium text-accent-mint transition-colors hover:border-accent-mint"
        >
          Case Study
          <span aria-hidden>↗</span>
        </Link>
      </div>
    </motion.article>
  );
};
