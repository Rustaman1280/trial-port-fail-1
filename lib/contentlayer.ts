import { allLabs, allPosts, allProjects } from "contentlayer/generated";

type Project = (typeof allProjects)[number];
type Post = (typeof allPosts)[number];
type Lab = (typeof allLabs)[number];

export const getProjects = () =>
  allProjects.sort((a: Project, b: Project) => b.year - a.year || a.title.localeCompare(b.title));

export const getFeaturedProjects = (limit = 3) =>
  getProjects()
  .filter((project: Project) => project.featured)
    .slice(0, limit);

export const getProjectBySlug = (slug: string) =>
  getProjects().find((project: Project) => project.slug === slug);

export const getProjectNavigation = (slug: string) => {
  const projects = getProjects();
  const index = projects.findIndex((project: Project) => project.slug === slug);
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  } as const;
};

export const getPosts = () =>
  allPosts
    .slice()
    .sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getLatestPosts = (limit = 3) => getPosts().slice(0, limit);

export const getPostBySlug = (slug: string) =>
  getPosts().find((post: Post) => post.slug === slug);

export const getAllTags = () => {
  const projectTags = getProjects().flatMap((item: Project) => item.tags);
  const postTags = getPosts().flatMap((item: Post) => item.tags);
  return Array.from(new Set([...projectTags, ...postTags])).sort((a, b) =>
    a.localeCompare(b),
  );
};

export const getLabs = () =>
  allLabs.slice().sort((a: Lab, b: Lab) => a.title.localeCompare(b.title));

export const getLabBySlug = (slug: string) =>
  getLabs().find((lab: Lab) => lab.slug === slug);
