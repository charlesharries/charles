import Link from 'next/link';
import AnimatedName from '~components/AnimatedName';
import Intro from '~components/Intro';
import { getAllFilesFrontMatter } from '../lib/mdx.js';
import { byDate } from '../util/sort.js';

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
            <li className="BlogPost" key={post.description}>
              <article className="BlogPost">
                <p className="t-large mb-0">
                  <Link href={`/blog/${post.slug.replace('.mdx', '')}`}>
                    {post.title.replace('', '')}
                  </Link>
                </p>
                <p className="font-sm">{post.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog');

  return { props: { latest: posts.sort(byDate).slice(0, 3) } };
}

export default Home;
