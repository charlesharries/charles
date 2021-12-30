import { MDXRemote } from 'next-mdx-remote';
import Layout from '../../layouts/index';
import Date from '../../components/Date';
import Image from '../../components/Image';
import Timings from '../../components/Timings';
import Emoji from '../../components/Emoji.tsx';
import { getAllPostsFrontMatter, getPostBySlug } from '../../lib/api';

export default function Blog({ post, frontMatter }) {
  const components = { Date, Image, Timings, Emoji };

  return (
    <Layout frontMatter={frontMatter}>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPostsFrontMatter('blog');

  return {
    paths: posts.map((p) => ({
      params: { slug: p.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug('blog', params.slug);

  return { props: post };
}
