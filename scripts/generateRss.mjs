import fs from 'fs';
import path from 'path';
import RSS from 'rss';
import fetch from 'node-fetch';

async function getPosts(frontMatter, type = 'posts') {
  return (await Promise.all(frontMatter.map(post => {
    return fetch(`https://api.charlesharri.es/${type}/${post.slug}.json`).then(r => r.json());
  }))).map(p => ({ ...p, type: type === 'posts' ? 'post' : 'stream' }))
}

function toFeedItem(post) {
  const section = post.type === 'post' ? 'blog' : 'stream';

  return {
    title: post.title,
    url: `https://charlesharri.es/${section}/${post.slug}`,
    date: post.created_at,
    description: post.body,
  };
}

async function generate() {
  const feed = new RSS({
    title: 'Charles Harries | Blog',
    site_url: 'https://charlesharri.es',
    feed_url: 'https://charlesharri.es/feed.xml',
  });

  // 1. Get frontmatter sorted by latest first
  const [postsFrontMatter, streamFrontMatter] = await Promise.all([
    fetch('https://api.charlesharri.es/posts.json').then(r => r.json()),
    fetch('https://api.charlesharri.es/stream.json').then(r => r.json()),
  ]);

  // Get the latest 15 posts of each type
  const [posts, stream] = await Promise.all([
    getPosts(postsFrontMatter.data.slice(0, 15), 'posts'),
    getPosts(streamFrontMatter.data.slice(0, 15), 'stream'),
  ]);

  posts
    .concat(stream)
    .map(post => toFeedItem(post))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach(p => feed.item(p));

  fs.writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
