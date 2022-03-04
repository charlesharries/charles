import { BookFrontMatter, PostFrontMatterResponse, PostResponse } from "./types";

async function fetchJson(url) {
  return fetch(url).then(r => r.json())
}

export async function getPostBySlug(type, slug): Promise<PostResponse> {
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