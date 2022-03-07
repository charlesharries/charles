import { Book, BookFrontMatter, PostFrontMatterResponse, PostResponse, Walk } from "./types";

async function fetchJson(url) {
  return fetch(url).then(r => r.json())
}

interface PageResponse {
  books: Book;
  posts: PostResponse;
  walks: Walk;
  stream: PostResponse;
}

export async function getPostBySlug<K extends keyof PageResponse>(type: K, slug: string): Promise<PageResponse[K]> {
  const post = await fetchJson(`https://api.charlesharri.es/${type}/${slug}.json`);

  return post
}

interface IndexResponse {
  books: BookFrontMatter[];
  posts: PostFrontMatterResponse[];
  walks: PostFrontMatterResponse[];
  stream: PostFrontMatterResponse[];
}

export async function getAllPosts<K extends keyof IndexResponse>(type: K): Promise<IndexResponse[K]> {
  const response = await fetchJson(`https://api.charlesharri.es/${type}.json`);

  return response.data;
}