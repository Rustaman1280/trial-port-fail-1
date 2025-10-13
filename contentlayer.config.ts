import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";
import { visit } from "unist-util-visit";
import { z } from "zod";

const baseUrl = "https://crust.dev";

const projectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(1),
  summary: z.string().min(10),
  tags: z.array(z.string()).min(1),
  year: z.number().int().gte(2000),
  cover: z.string().min(3),
  tech: z.array(z.string()).min(1),
  outcomes: z.array(z.string()).min(1),
  featured: z.boolean().default(false),
});

const postSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(1),
  summary: z.string().min(10),
  tags: z.array(z.string()).min(1),
  date: z.coerce.date(),
  hero: z.string().optional(),
});

const labSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(1),
  summary: z.string().min(6),
  links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
});

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const ensureArray = <T = unknown>(value: unknown): T[] => {
  if (Array.isArray(value)) {
    return value as T[];
  }

  if (value && typeof value === "object") {
    const candidate = value as Record<string, unknown>;
    if (Array.isArray((candidate as any)._array)) {
      return (candidate as any)._array as T[];
    }
    if (typeof (candidate as any).toArray === "function") {
      return (candidate as any).toArray();
    }
    if (typeof (candidate as any)[Symbol.iterator] === "function") {
      return Array.from(candidate as unknown as Iterable<T>);
    }
    if (Array.isArray(candidate.list)) {
      return candidate.list as T[];
    }
    if (Array.isArray(candidate.values)) {
      return candidate.values as T[];
    }
    return Object.values(candidate).filter((item): item is T => item != null) as T[];
  }

  return [];
};

const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    summary: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    year: { type: "number", required: true },
    cover: { type: "string", required: true },
    tech: { type: "list", of: { type: "string" }, required: true },
    outcomes: { type: "list", of: { type: "string" }, required: true },
    featured: { type: "boolean", default: false },
  },
  computedFields: {
    url: {
      type: "string",
  resolve: (doc: any) => `/projects/${doc.slug ?? slugify(doc.title)}`,
    },
    readingTime: {
      type: "json",
  resolve: (doc: any) => readingTime(doc.body.raw),
    },
    validated: {
      type: "json",
      resolve: (doc: any) =>
        projectSchema.parse({
          title: doc.title,
          slug: doc.slug ?? slugify(doc.title),
          summary: doc.summary,
          tags: ensureArray<string>(doc.tags),
          year: doc.year,
          cover: doc.cover,
          tech: ensureArray<string>(doc.tech),
          outcomes: ensureArray<string>(doc.outcomes),
          featured: doc.featured ?? false,
        }),
    },
    canonical: {
      type: "string",
  resolve: (doc: any) => `${baseUrl}/projects/${doc.slug ?? slugify(doc.title)}`,
    },
  },
}));

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    summary: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    date: { type: "date", required: true },
    readingTime: { type: "number", required: false },
    hero: { type: "string", required: false },
  },
  computedFields: {
    url: {
      type: "string",
  resolve: (doc: any) => `/blog/${doc.slug ?? slugify(doc.title)}`,
    },
    canonical: {
      type: "string",
  resolve: (doc: any) => `${baseUrl}/blog/${doc.slug ?? slugify(doc.title)}`,
    },
    readingTime: {
      type: "json",
  resolve: (doc: any) => readingTime(doc.body.raw),
    },
    validated: {
      type: "json",
      resolve: (doc: any) =>
        postSchema.parse({
          title: doc.title,
          slug: doc.slug ?? slugify(doc.title),
          summary: doc.summary,
          tags: ensureArray<string>(doc.tags),
          date: doc.date,
          hero: doc.hero,
        }),
    },
  },
}));

const ExternalLink = defineNestedType(() => ({
  name: "ExternalLink",
  fields: {
    label: { type: "string", required: true },
    url: { type: "string", required: true },
  },
}));

const Lab = defineDocumentType(() => ({
  name: "Lab",
  filePathPattern: `labs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    summary: { type: "string", required: true },
    links: {
      type: "list",
      of: ExternalLink,
      required: false,
    },
  },
  computedFields: {
    url: {
      type: "string",
  resolve: (doc: any) => `/labs/${doc.slug ?? slugify(doc.title)}`,
    },
    validated: {
      type: "json",
      resolve: (doc: any) =>
        labSchema.parse({
          title: doc.title,
          slug: doc.slug ?? slugify(doc.title),
          summary: doc.summary,
          links: ensureArray<{ label: string; url: string }>(doc.links).map((item: any) =>
            typeof item === "object" && item !== null ? item : { label: "Explore", url: "#" },
          ),
        }),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Project, Post, Lab],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { properties: { className: "anchor" } }],
      [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
      rehypeUnwrapImages,
      [
        rehypePrettyCode as any,
        {
          theme: {
            dark: "poimandres",
            light: "github-light",
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className = (node.properties.className ?? []).concat("line--highlighted");
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = (node.properties.className ?? []).concat("word--highlighted");
          },
        },
      ],
      () => (tree: any) => {
        visit(tree, "element", (node: any) => {
          if (node.tagName === "a") {
            node.properties = {
              ...node.properties,
              className: (node.properties?.className ?? []).concat("underline-offset-4", "transition-colors"),
            };
          }
        });
      },
    ],
    esbuildOptions: (options) => {
      options.platform = "node";
      options.mainFields = ["module", "main"];
      options.conditions = ["import", "module", "default"];
      return options;
    },
  },
});
