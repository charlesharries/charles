import Page from "pages/blog/[slug].js";
import { getAllPosts, getPostBySlug } from "../../lib/api";

export default Page;

export async function getStaticPaths() {
  const posts = await getAllPosts("sam-posts");

  return {
    paths: posts.map((p) => ({
      params: { slug: p.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug("sam-posts", params.slug);

  return { props: { post } };
}
