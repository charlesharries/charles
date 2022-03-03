import Link from 'next/link';
import AnimatedName from 'components/AnimatedName';
import Intro from 'components/Intro';
import { getAllPosts } from '../lib/api.ts';
import { byDate } from '../util/sort.js';
import { longDate } from '../util/date';

function getLink(post) {
  if (post.type === 'stream') {
    return `/stream#${post.slug}`;
  }

  return `/blog/${post.slug}`;
}

function Home({ latest }) {
  return (
    <div className="Home">
      <div className="stack mt-lg">
        <p className="t-serif t-xlarge">Hey there! My name's</p>

        <AnimatedName />

        <Intro />

        <h2 className="t-h1 mt-lg keyline">latest from the blog</h2>

        <ul>
          {latest.map((post) => (
            <li className="BlogPost" key={post.title}>
              <article className="BlogPost">
                <h3 className="t-large mb-0 font-regular">
                  <Link href={getLink(post)} prefetch={false}>
                    <a className="link">{post.title}</a>
                  </Link>

                  <span className="t-xs ml-sm font-monospace">
                    {longDate(new Date(post.created_at))}
                  </span>
                </h3>
                <p className="font-sm">{post.summary}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const [posts, stream] = await Promise.all([
    getAllPosts('posts'),
    getAllPosts('stream'),
  ]);

  const all = [...posts, ...stream]
    .sort((p1, p2) => (new Date(p1.created_at)) < (new Date(p2.created_at)) ? 1 : -1);

  return { props: { latest: all.slice(0, 3) } };
}

export default Home;
