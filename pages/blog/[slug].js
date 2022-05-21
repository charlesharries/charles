import Layout from '../../layouts/index';
import Date from '../../components/Date';
import Timings from '../../components/Timings';
import Emoji from '../../components/Emoji.tsx';
import { getAllPosts, getPostBySlug } from '../../lib/api';
import useLightbox from 'lib/useLightbox.tsx';

export default function Blog({ post, beforePost = null, afterPost = null, frontMatter = {} }) {
  const allFrontMatter = {
    title: post.title,
    description: post.summary,
    date: post.created_at,
    slug: post.slug,
    ...frontMatter,
  };

  useLightbox()

  return (
    <Layout frontMatter={allFrontMatter}>
      {beforePost || null}
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
      {afterPost || null}
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPosts('posts');

  return {
    paths: posts.map((p) => ({
      params: { slug: p.slug },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug('posts', params.slug);

  return { props: { post } };
}
