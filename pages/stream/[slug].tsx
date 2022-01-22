import StreamItem from "components/StreamItem";
import { getAllPosts, getPostBySlug } from "lib/api";

export default function StreamPost({ post }): JSX.Element {
  return <StreamItem post={post} />
}

export async function getStaticPaths() {
  const posts = await getAllPosts('stream');

  return {
    paths: posts.map((p) => ({
      params: { slug: p.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug('stream', params.slug);

  return { props: { post } };
}