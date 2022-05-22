import { PostHead } from "components/Head";
import StreamItem from "components/StreamItem";
import { getAllPosts, getPostBySlug } from "lib/api";

export default function StreamPost({ post }): JSX.Element {
  const frontMatter = {
    title: post.title,
    description: post.summary,
  }
  return <>
    <PostHead frontMatter={frontMatter} />
    <StreamItem post={post} />
  </>
}

export async function getStaticPaths() {
  const posts = await getAllPosts("stream");

  return {
    paths: posts.map((p) => ({
      params: { slug: p.slug },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug("stream", params.slug);

  if (post.error) {
    if (post.error.code === 404) return { notFound: true };
    throw new Error("A server error occurred.");
  }

  return { props: { post } };
}