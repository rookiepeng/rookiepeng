import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

const pad = (n: number) => String(n).padStart(2, '0');

// WordPress permalink: /YYYY/MM/DD/slug/
export function postUrl(post: Post) {
  const d = post.data.date;
  return `/${d.getUTCFullYear()}/${pad(d.getUTCMonth() + 1)}/${pad(d.getUTCDate())}/${post.id}/`;
}

export function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

// Matches the WordPress tag slugs: "IC design" -> "ic-design", "Micro-Doppler" -> "micro-doppler"
export function tagSlug(tag: string) {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export async function getPosts() {
  const posts = await getCollection('posts', (p) => import.meta.env.DEV || !p.data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getTags() {
  const tags = new Map<string, { name: string; posts: Post[] }>();
  for (const post of await getPosts()) {
    for (const name of post.data.tags) {
      const slug = tagSlug(name);
      if (!tags.has(slug)) tags.set(slug, { name, posts: [] });
      tags.get(slug)!.posts.push(post);
    }
  }
  return new Map([...tags].sort((a, b) => a[1].name.localeCompare(b[1].name)));
}
