// contentlayer.config.ts
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
var baseUrl = "https://crust.dev";
var projectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(1),
  summary: z.string().min(10),
  tags: z.array(z.string()).min(1),
  year: z.number().int().gte(2e3),
  cover: z.string().min(3),
  tech: z.array(z.string()).min(1),
  outcomes: z.array(z.string()).min(1),
  featured: z.boolean().default(false)
});
var postSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(1),
  summary: z.string().min(10),
  tags: z.array(z.string()).min(1),
  date: z.coerce.date(),
  hero: z.string().optional()
});
var labSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(1),
  summary: z.string().min(6),
  links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([])
});
var slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
var ensureArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (value && typeof value === "object") {
    const candidate = value;
    if (Array.isArray(candidate.list)) {
      return candidate.list;
    }
    if (Array.isArray(candidate.values)) {
      return candidate.values;
    }
    return Object.values(candidate).filter((item) => item != null);
  }
  return [];
};
var Project = defineDocumentType(() => ({
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
    featured: { type: "boolean", default: false }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/projects/${doc.slug ?? slugify(doc.title)}`
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw)
    },
    validated: {
      type: "json",
      resolve: (doc) => {
        console.log("Project tags debug", doc._id, doc.tags);
        return projectSchema.parse({
          title: doc.title,
          slug: doc.slug ?? slugify(doc.title),
          summary: doc.summary,
          tags: ensureArray(doc.tags),
          year: doc.year,
          cover: doc.cover,
          tech: ensureArray(doc.tech),
          outcomes: ensureArray(doc.outcomes),
          featured: doc.featured ?? false
        });
      }
    },
    canonical: {
      type: "string",
      resolve: (doc) => `${baseUrl}/projects/${doc.slug ?? slugify(doc.title)}`
    }
  }
}));
var Post = defineDocumentType(() => ({
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
    hero: { type: "string", required: false }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/blog/${doc.slug ?? slugify(doc.title)}`
    },
    canonical: {
      type: "string",
      resolve: (doc) => `${baseUrl}/blog/${doc.slug ?? slugify(doc.title)}`
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw)
    },
    validated: {
      type: "json",
      resolve: (doc) => {
        console.log("Post tags debug", doc._id, doc.tags);
        return postSchema.parse({
          title: doc.title,
          slug: doc.slug ?? slugify(doc.title),
          summary: doc.summary,
          tags: ensureArray(doc.tags),
          date: doc.date,
          hero: doc.hero
        });
      }
    }
  }
}));
var ExternalLink = defineNestedType(() => ({
  name: "ExternalLink",
  fields: {
    label: { type: "string", required: true },
    url: { type: "string", required: true }
  }
}));
var Lab = defineDocumentType(() => ({
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
      required: false
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/labs/${doc.slug ?? slugify(doc.title)}`
    },
    validated: {
      type: "json",
      resolve: (doc) => {
        console.log("Lab links debug", doc._id, doc.links);
        return labSchema.parse({
          title: doc.title,
          slug: doc.slug ?? slugify(doc.title),
          summary: doc.summary,
          links: ensureArray(doc.links).map(
            (item) => typeof item === "object" && item !== null ? item : { label: "Explore", url: "#" }
          )
        });
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
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
        rehypePrettyCode,
        {
          theme: {
            dark: "poimandres",
            light: "github-light"
          },
          onVisitHighlightedLine(node) {
            node.properties.className = (node.properties.className ?? []).concat("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = (node.properties.className ?? []).concat("word--highlighted");
          }
        }
      ],
      () => (tree) => {
        visit(tree, "element", (node) => {
          if (node.tagName === "a") {
            node.properties = {
              ...node.properties,
              className: (node.properties?.className ?? []).concat("underline-offset-4", "transition-colors")
            };
          }
        });
      }
    ],
    esbuildOptions: (options) => {
      options.platform = "node";
      options.mainFields = ["module", "main"];
      options.conditions = ["import", "module", "default"];
      return options;
    }
  }
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-7CU6TICJ.mjs.map
