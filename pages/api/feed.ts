import RSS from "rss";
import fetch from "node-fetch";
import { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts } from "lib/api";

async function getPosts(frontMatter, type = "posts") {
  return (await Promise.all(frontMatter.map(post => {
    return fetch(`https://api.charlesharri.es/${type}/${post.slug}.json`).then(r => r.json());
  }))).map(p => ({...p, type }))
}

function toFeedItem(post) {
  const section = post.type === "posts" ? "blog" : post.type;
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

  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30");
  res.setHeader("Content-Type", "application/xml");
  res.end(response);
}

async function generate(): Promise<string> {
  const feed = new RSS({
    title: "Charles Harries | Blog",
    site_url: "https://charlesharri.es",
    feed_url: "https://charlesharri.es/feed.xml",
  });

  // 1. Get frontmatter sorted by latest first
  const [postsFrontMatter, streamFrontMatter, booksFrontMatter] = await Promise.all([
    getAllPosts("posts"),
    getAllPosts("stream"),
    getAllPosts("books"),
  ]);

  // Get the latest 15 posts of each type
  const [posts, stream, books] = await Promise.all([
    getPosts(postsFrontMatter.slice(0, 15), "posts"),
    getPosts(streamFrontMatter.slice(0, 15), "stream"),
    getPosts(booksFrontMatter.slice(0, 15), "books"),
  ]);

  posts
    .concat(stream)
    .concat(books)
    .map(post => toFeedItem(post))
    .sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime())
    .forEach(p => feed.item(p));

  return feed.xml({ indent: true });
}
