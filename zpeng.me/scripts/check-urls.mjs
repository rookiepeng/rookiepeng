// Checks that every URL the WordPress site exposes still resolves on the static build.
//   npm run preview   (in another terminal)
//   node scripts/check-urls.mjs [--wp https://zpeng.me] [--local http://localhost:4321]
// URL lists come from the WordPress sitemap and REST API, so run it while WordPress is still up.
const args = process.argv.slice(2);
const opt = (name, def) => (args.includes(name) ? args[args.indexOf(name) + 1] : def);
const WP = opt('--wp', 'https://zpeng.me').replace(/\/$/, '');
const LOCAL = opt('--local', 'http://localhost:4321').replace(/\/$/, '');

// Pages deliberately not carried over. /feed/ is redirected to /feed.xml by Caddy (deploy/Caddyfile), not by astro preview.
// Media moved out of /wp-content/uploads/ into post folders and src/assets, so old image URLs are retired.
const IGNORE = [/^\/wp-content\//, /^\/test\/$/, /^\/author\//, /^\/category\//, /^\/wp-sitemap/, /^\/hestia\/$/];

async function sitemapUrls(url, seen = new Set()) {
  const xml = await (await fetch(url)).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));
  const out = [];
  for (const loc of locs) {
    if (loc.endsWith('.xml') && !seen.has(loc)) {
      seen.add(loc);
      out.push(...(await sitemapUrls(loc, seen)));
    } else out.push(loc);
  }
  return out;
}

async function restUrls(type, field, keep = () => true) {
  const res = await fetch(`${WP}/wp-json/wp/v2/${type}?per_page=100&_fields=${field},count`);
  return (await res.json()).filter(keep).map((x) => x[field]);
}

const urls = new Set([
  ...(await sitemapUrls(`${WP}/wp-sitemap.xml`)),
  ...(await restUrls('posts', 'link')),
  ...(await restUrls('pages', 'link')),
  // Tags with no posts left have nothing to archive
  ...(await restUrls('tags', 'link', (t) => t.count > 0)),
  ...(await restUrls('media', 'source_url')),
]);

const paths = [...urls]
  .filter((u) => u.startsWith(WP))
  .map((u) => new URL(u).pathname)
  .filter((p) => !IGNORE.some((re) => re.test(p)))
  .sort();

let failed = 0;
for (const p of paths) {
  const res = await fetch(LOCAL + p, { method: 'HEAD', redirect: 'manual' });
  const ok = res.status === 200 || (res.status >= 301 && res.status <= 308);
  if (!ok) {
    failed++;
    console.log(`FAIL ${res.status} ${p}`);
  }
}
console.log(`${paths.length - failed}/${paths.length} WordPress URLs resolve on ${LOCAL}`);
process.exit(failed ? 1 : 0);
