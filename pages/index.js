import Link from 'next/link';
import AnimatedName from '~components/AnimatedName';
import Intro from '~components/Intro';

const published = require('../data/published.js');

const latest = [
  require(`../pages/blog/${published[0].slug}.mdx`),
  require(`../pages/blog/${published[1].slug}.mdx`),
  require(`../pages/blog/${published[2].slug}.mdx`),
].map(m => m.frontMatter);

function Home() {
  return (
    <div className="Home">
      <div className="stack mt-lg">
        <p className="t-serif t-xlarge">Hey there! My name's</p>

        <AnimatedName />

        <Intro />

        <h2 className="t-h1 mt-lg keyline">latest from the blog</h2>

        <ul>
          {latest.map(post => (
            <li className="BlogPost" key={post.description}>
              <article className="BlogPost">
                <p className="t-large mb-0">
                  <Link href={`/${post.__resourcePath.replace('.mdx', '')}`}>
                    {post.title.replace(' | Charles Harries', '')}
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

export default Home;
