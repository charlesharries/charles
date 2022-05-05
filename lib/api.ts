import { Book, BookFrontMatter, PostFrontMatterResponse, PostResponse, Project, Walk } from "./types";

const apiURL = process.env.API_URL;

async function fetchJson(url) {
  return fetch(url).then(r => r.json())
}

interface PageResponse {
  books: Book;
  posts: PostResponse;
  walks: Walk;
  stream: PostResponse;
  project: Project;
}

export async function getPostBySlug<K extends keyof PageResponse>(type: K, slug: string): Promise<PageResponse[K]> {
  const post = await fetchJson(`${apiURL}/${type}/${slug}.json`);

  return post
}

interface IndexResponse {
  books: BookFrontMatter[];
  posts: PostFrontMatterResponse[];
  walks: PostFrontMatterResponse[];
  stream: PostFrontMatterResponse[];
  projects: Project[];
}

export async function getAllPosts<K extends keyof IndexResponse>(type: K): Promise<IndexResponse[K]> {
  const response = await fetchJson(`${apiURL}/${type}.json`);

  return response.data;
}