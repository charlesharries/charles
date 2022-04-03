import Timings from 'components/Timings';
import { getAllPosts, getPostBySlug } from 'lib/api';
import { Walk } from 'lib/types';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import BlogPost from 'pages/blog/[slug].js'

export default function WalkPost({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const meta = post.bags?.length ? (
    <ul role="list" className="cluster cluster--sm mb-md">
      {post.bags.map(bag => (<li key={`${bag.designations.slug}-${bag.number}`}>
        <span className="badge badge--lg">{bag.mountain.title} - {bag.designations.title} #{bag.number}</span>
      </li>))}
    </ul>
  ) : null;

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

  return <BlogPost post={post} beforePost={meta} afterPost={timings} />
};

export async function getStaticPaths() {
  const posts = await getAllPosts('walks');

  return {
    paths: posts.map((p) => ({
      params: { slug: p.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug('walks', params.slug);

  return { props: { post } };
}