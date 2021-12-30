export async function getAllStreamPosts() {
  const { data } = await fetch('https://api.charlesharri.es/stream.json').then((r) => r.json());

  return data;
}

export async function getPostBySlug(type, slug) {
  const post = await fetch(`https://api.charlesharri.es/posts/${slug}.json`).then(r => r.json());

  return {
    post,
    frontMatter: {
      title: post.title,
      date: post.created_at,
      wordCount: post.body.split(/\s+/gu).length,
      slug,
    },
  };
}

export async function getAllPostsFrontMatter(type) {
  const response = await fetch('https://api.charlesharri.es/posts.json').then(r => r.json());
  
  return response.data;
}