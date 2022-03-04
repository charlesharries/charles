import { getAllPosts, getPostBySlug } from 'lib/api';
import { InferGetStaticPropsType } from 'next';
import BlogPost from 'pages/blog/[slug].js'

export default function BookPost({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const meta = (
    <p>Meta goes here.</p>
  );

  return <BlogPost post={post} beforePost={meta} frontMatter={{ subtitle: `by ${post.writer}` }} />
};

export async function getStaticPaths() {
  const posts = await getAllPosts('books');

  return {
    paths: posts.map((p) => ({
      params: { slug: p.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug('books', params.slug);

  return { props: { post } };
}