import { getImage } from 'astro:assets';

// Every image that lives in a post folder, keyed by its path from the project root
const postImages = import.meta.glob<ImageMetadata>('/src/content/posts/*/*.{jpg,jpeg,png,gif,webp,svg}', {
  eager: true,
  import: 'default',
});

// Raster images become width-capped WebP; SVGs are served as they are
export async function optimized(image: ImageMetadata, width = 1200) {
  if (image.format === 'svg') return image.src;
  return (await getImage({ src: image, width: Math.min(width, image.width), format: 'webp' })).src;
}

// Markdown image syntax is handled by Astro, but <img src="./x.jpg"> inside raw HTML is not.
// Resolve those relative paths against the post's folder.
export async function resolveHtmlImages(html: string, postId: string) {
  const matches = [...html.matchAll(/(<img\b[^>]*?\ssrc=")(\.\/[^"]+)(")/g)];
  for (const [whole, before, path, after] of matches) {
    const image = postImages[`/src/content/posts/${postId}/${path.slice(2)}`];
    if (!image) throw new Error(`${postId}: image ${path} not found in the post folder`);
    html = html.replace(whole, `${before}${await optimized(image)}${after}`);
  }
  return html;
}
