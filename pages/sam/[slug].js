import Blog from 'pages/blog';
import { getFileBySlug, getFiles } from '../../lib/mdx';

export default Blog;

export async function getStaticPaths() {
  const posts = await getAllPosts('sam-posts');

  return {
    paths: posts.map((p) => ({
      params: { slug: p.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug('sam-posts', params.slug);

  return { props: { post } };
}
