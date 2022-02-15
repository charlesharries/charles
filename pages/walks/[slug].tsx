import { getAllPosts, getPostBySlug } from 'lib/api';
import { Walk } from 'lib/types';
import BlogPost from 'pages/blog/[slug].js'

interface Props {
  post: Walk;
}

export default function WalkPost({ post }: Props) {
  const meta = (
    <ul role="list" className="cluster cluster--sm mb-md">
      {post.bags.map(bag => (<li key={`${bag.designations.slug}-${bag.number}`}>
        <span className="badge badge--lg">{bag.mountain.title} - {bag.designations.title} #{bag.number}</span>
      </li>))}
    </ul>
  );

  return <BlogPost post={post} beforePost={meta} />
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