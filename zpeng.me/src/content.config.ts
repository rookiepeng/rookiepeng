import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  // Each post is a folder: <slug>/index.md plus the images it uses
  loader: glob({ pattern: '*/index.md', base: './src/content/posts' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    // Date only (YYYY-MM-DD); it is the /YYYY/MM/DD/ part of the permalink
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    description: z.string().default(''),
    tags: z.array(z.string()).default([]),
    // Relative to index.md; posts without one use the site banner
    cover: image().optional(),
    // The body is a hand-built HTML page with its own <style>/<script>; skip the prose styling
    rawHtml: z.boolean().default(false),
    draft: z.boolean().default(false),
    wpId: z.number().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    updated: z.coerce.date().optional(),
  }),
});

const publications = defineCollection({
  loader: file('src/data/publications.yaml'),
  schema: z.object({
    title: z.string(),
    items: z.array(z.string()),
  }),
});

export const collections = { posts, pages, publications };
