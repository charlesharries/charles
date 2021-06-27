import { MDXRemote } from 'next-mdx-remote';
import Layout from '../../layouts/index';
import Date from '../../components/Date';
import Image from '../../components/Image';
import { getFileBySlug, getFiles } from '../../lib/mdx';

export default function Blog({ mdxSource, frontMatter }) {
  const components = { Date, Image };

  return (
    <Layout frontMatter={frontMatter}>
      <MDXRemote {...mdxSource} components={components} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getFiles('sam');

  return {
    paths: posts.map((p) => ({
      params: { slug: p.replace(/\.mdx/, '') },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug('sam', params.slug);

  return { props: post };
}
