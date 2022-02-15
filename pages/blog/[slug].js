import Layout from '../../layouts/index';
import Date from '../../components/Date';
import Timings from '../../components/Timings';
import Emoji from '../../components/Emoji.tsx';
import { getAllPosts, getPostBySlug } from '../../lib/api';

export default function Blog({ post, beforePost = null }) {
  const frontMatter = {
    title: post.title,
    date: post.created_at,
    slug: post.slug,
  };

  return (
    <Layout frontMatter={frontMatter}>
      {beforePost !== null ? beforePost : null}
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPosts('posts');

  return {
    paths: posts.map((p) => ({
      params: { slug: p.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug('posts', params.slug);

  return { props: { post } };
}
