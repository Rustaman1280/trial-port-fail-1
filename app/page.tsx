import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { Tag } from "@/components/tag";
import { KPI } from "@/components/kpi";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { getFeaturedProjects, getLatestPosts } from "@/lib/contentlayer";
import { kpis, skillGroups } from "@/lib/data";
import { OgImageGenerator } from "@/components/og-image-generator";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function Home() {
  const featuredProjects = getFeaturedProjects(3);
  const latestPosts = getLatestPosts(3);

  return (
    <Container className="space-y-20">
      <section className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-surface via-surface/80 to-surface/95 p-12 shadow-soft">
        <div
          className="absolute inset-y-0 right-12 hidden h-80 w-80 rounded-full bg-gradient-to-br from-accent-mint/30 via-transparent to-accent-lilac/20 blur-3xl md:block"
          aria-hidden
        />
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-6">
            <Tag className="bg-accent-mint/10 text-accent-mint">Build. Design. Ship.</Tag>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-tight text-foreground sm:text-6xl">
              I craft luminous products with elegant engineering, cinematic motion, and measurable outcomes.
            </h1>
            <p className="max-w-2xl text-lg text-foreground/70">
              Rustaman Delvianova (Crust Dev) is a principal fullstack engineer and product designer blending Next.js, Flutter, and AI systems to launch experiences people remember.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="#featured-projects">Explore featured work</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/resume">Download resume</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:max-w-sm">
            <OgImageGenerator
              title="Crust Dev Platform Accelerator"
              description="Design systems, AI copilots, and multi-platform releases shipped in weeks."
            />
            <div className="flex items-center gap-4 rounded-3xl border border-border/50 bg-card/80 p-4 text-sm text-foreground/65">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-mint/15 text-accent-mint">⚡️</span>
              <p>
                Shipping production-grade experiences for CurC, Suara Siswa, Block Crust, RustCraft, and Forum OSIS Jabar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4" aria-label="Key performance indicators">
        {kpis.map((item) => (
          <KPI key={item.label} value={item.value} label={item.label} hint={item.hint} />
        ))}
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-[0.4em] text-accent-mint/80">Core capabilities</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-3xl border border-border/50 bg-card/80 p-5">
              <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-accent-mint/70" aria-hidden />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Section
        id="featured-projects"
        eyebrow="Flagship Work"
        title="Featured projects that blend craft and scale"
        description="Each case study details strategy, execution, motion systems, and measurable outcomes across web, mobile, game, and hardware surfaces."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index === 0} />
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Button asChild variant="ghost" className="text-foreground/70 hover:text-accent-mint">
            <Link href="/projects" className="inline-flex items-center gap-2">
              Browse all projects <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="Latest Writing"
        title="Thinking in systems, motion, and AI craftsmanship"
        description="Essays on shipping resilient platforms, orchestrating design systems, and augmenting workflow with AI copilots."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="flex h-full flex-col gap-4 rounded-3xl border border-border/50 bg-card/75 p-6"
            >
              <div className="space-y-3">
                <time dateTime={post.date} className="text-xs uppercase tracking-[0.35em] text-foreground/55">
                  {formatDate(post.date)}
                </time>
                <h3 className="text-lg font-semibold text-foreground">
                  <Link href={post.url} className="hover:text-accent-mint">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-foreground/65">{post.summary}</p>
              </div>
              <div className="mt-auto flex items-center justify-between text-xs text-foreground/55">
                <span>{Math.round(post.readingTime.minutes)} min read</span>
                <Link href={post.url} className="inline-flex items-center gap-2 text-accent-mint">
                  Read <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Button asChild variant="ghost" className="text-foreground/70 hover:text-accent-mint">
            <Link href="/blog" className="inline-flex items-center gap-2">
              View all essays <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="Feedback"
        title="Clients and collaborators on the Crust experience"
        description="Testimonials from founders, education leaders, and CTOs who shipped with me."
        className="bg-surface/85"
      >
        <TestimonialCarousel />
      </Section>
    </Container>
  );
}
