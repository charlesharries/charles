import RSS from 'rss';
import fetch from 'node-fetch';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPosts } from 'lib/api';
import { Post } from 'lib/types';

async function getPosts(frontMatter, type = 'posts') {
  return (await Promise.all(frontMatter.map(post => {
    return fetch(`https://api.charlesharri.es/${type}/${post.slug}.json`).then(r => r.json());
  }))).map(p => ({...p, type }))
}

function toFeedItem(post: Post) {
  const section = post.type === 'posts' ? 'blog' : post.type;
  let description = post.body;

  if (post.featured_image?.length) {
    description = post.featured_image[0].tag + description;
  }

  return {
    title: post.title,
    url: `https://charlesharri.es/${section}/${post.slug}`,
    date: post.created_at,
    description,
  };
}

export default async function feed(req: NextApiRequest, res: NextApiResponse) {
  const response = await generate();

  // Feed is fresh for 5 minutes; for the next 5 minutes, serve the stale version
  // and regenerate in the background. After 10 minutes, just fetch it fresh.
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=300');
  res.setHeader("Content-Type", "application/xml");

  res.end(response);
}

async function generate(): Promise<string> {
  const feed = new RSS({
    title: 'Charles Harries | Blog',
    site_url: 'https://charlesharri.es',
    feed_url: 'https://charlesharri.es/feed.xml',
  });

  // 1. Get frontmatter sorted by latest first
  const [postsFrontMatter, streamFrontMatter, booksFrontMatter] = await Promise.all([
    getAllPosts('posts'),
    getAllPosts('stream'),
    getAllPosts('books'),
  ]);

  // Get the latest 15 posts of each type
  const [posts, stream, books] = await Promise.all([
    getPosts(postsFrontMatter.slice(0, 15), 'posts'),
    getPosts(streamFrontMatter.slice(0, 15), 'stream'),
    getPosts(booksFrontMatter.slice(0, 15), 'books'),
  ]);

  posts
    .concat(stream)
    .concat(books)
    .map(post => toFeedItem(post))
    .sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime())
    .forEach(p => feed.item(p));

  return feed.xml({ indent: true });
}
