import StreamItem from '../../components/StreamItem/index.tsx';
import { getAllStreamPosts } from '../../lib/api';

function Stream({ posts }) {
  return (
    <div className="Stream">
      <h1 className="Stream__title">Stream</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.title}>
            <StreamItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllStreamPosts();

  return { props: { posts } };
}

export default Stream;
