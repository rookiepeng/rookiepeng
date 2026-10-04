import rss from '@astrojs/rss';
import { getPosts, postUrl } from '../lib/posts';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: 'Z. PENG',
    description: 'Projects and notes by Zhengyu Peng — radar, RF engineering, software and robotics.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: postUrl(post),
      categories: post.data.tags,
    })),
  });
}
