import Timings from "components/Timings";
import { getAllPosts, getPostBySlug } from "lib/api";
import { Walk } from "lib/types";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import BlogPost from "pages/blog/[slug].js"

function category(walk: Walk) {
  if (walk.designations?.length) {
    return walk.designations.map(d => d.title);
  }

  if (walk.bags?.length) {
    return walk.bags.reduce((all, bag) => {
      const newAll = [...all];
      if (!newAll.includes(bag.designations.title)) {
        newAll.push(bag.designations.title);
      }
      return newAll;
    }, []);
  }
}

export default function WalkPost({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const timings = post.meta?.length ? (
    <section>
      <h2>Timings</h2>
      <Timings timings={post.meta[0]?.timings} />
      <p className="font-italic">
        <Link href={post.meta[0].strava}>
          <a>Strava recording of route available here.</a>
        </Link> <span>Total walking time: {post.meta[0]?.total_walking_time}.</span>
      </p>
    </section>
  ) : null;

  const categories = category(post);
  const eyebrow = categories?.length ? (
    <p className="Post__eyebrow mb-md small-caps">
      {categories.map(cat => <span key={cat} className="badge badge--md">{cat}</span>)}
    </p>
  ) : null;

  return <BlogPost post={post} afterPost={timings} frontMatter={{ eyebrow }} />
};

export async function getStaticPaths() {
  const posts = await getAllPosts("walks");

  return {
    paths: posts.map((p) => ({
      params: { slug: p.slug },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug("walks", params.slug);

  return { props: { post } };
}