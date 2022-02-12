import { PostFrontMatterResponse, PostResponse } from "./types";

async function fetchJson(url) {
  return fetch(url).then(r => r.json())
}

export async function getPostBySlug(type, slug): Promise<PostResponse> {
  const post = await fetchJson(`https://api.charlesharri.es/${type}/${slug}.json`);

  return post
}

export async function getAllPosts(type): Promise<PostFrontMatterResponse[]> {
  const response = await fetchJson(`https://api.charlesharri.es/${type}.json`);

  return response.data;
}