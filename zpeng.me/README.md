# zpeng.me

Source for https://zpeng.me, a static site built with [Astro](https://astro.build) and served
from a home server through a Cloudflare Tunnel (see [deploy/README.md](deploy/README.md)).

## Writing

| What | Where |
| --- | --- |
| Homepage | `src/pages/index.astro` (hand-written HTML, styles and scripts) |
| Research projects page | `src/pages/research-projects/index.astro` |
| Publications | `src/data/publications.yaml`: one Markdown line per entry; homepage counters update automatically |
| Posts | `src/content/posts/<slug>/index.md` with that post's images in the same folder; published at `/YYYY/MM/DD/<slug>/` from the `date` field |
| Plain pages | `src/content/pages/<slug>.md`, published at `/<slug>/` |
| Shared images | `src/assets/brand/` (logo, banner), `src/assets/badges/` (store and GitHub badges), `src/assets/timeline/` (homepage timeline logos) |
| Favicons | `public/` (served as-is at the site root) |
| Header menu | `src/components/Header.astro` |
| Theme (header, footer, post styles) | `src/styles/theme.css` |

A new post is a folder:

```
src/content/posts/my-new-project/
├── index.md
├── cover.jpg
└── setup.jpg
```

```markdown
---
title: "My new project"
date: 2026-10-04
description: "One-sentence summary used for the feed and link previews."
tags: ["Radar", "Python"]
cover: ./cover.jpg
---

![Test setup](./setup.jpg)
```

Reference images with relative paths. Astro resizes photos and converts them to WebP at build
time, so commit the originals. `cover` is optional; posts without one use the site banner.
Raw HTML is fine in a post, but an `<img>` in it only gets the same treatment when the post sets
`rawHtml: true` (as `hexapod` does).

Set `draft: true` to keep a post out of the build. Commit and push to `master`; the server picks it
up within 5 minutes.

## Commands

```bash
npm install
npm run dev          # http://localhost:4321 with live reload
npm run build        # static site in dist/
npm run preview      # serve dist/ locally
npm run check-urls   # with preview running: confirm every old WordPress URL still resolves
```

## Comments

Old WordPress comments are archived in `src/data/wp-comments.json` and shown under their posts.
New comments use [giscus](https://giscus.app) (GitHub Discussions). Fill in `src/config.ts` to turn it on.

## Moving off WordPress

Posts, pages, publications, comments and media were imported once from the WordPress REST API.
Images were then reorganized into post folders and `src/assets/`, so old `/wp-content/uploads/...`
URLs no longer exist.
