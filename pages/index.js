import Link from 'next/link';
import AnimatedName from 'components/AnimatedName';
import Intro from 'components/Intro';
import { getAllPosts } from '../lib/api.ts';
import { byDate } from '../util/sort.js';
import { longDate } from '../util/date';

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
                  <Link href={`/blog/${post.slug}`} prefetch={false}>
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
  const posts = await getAllPosts('posts');

  return { props: { latest: posts.slice(0, 3) } };
}

export default Home;
