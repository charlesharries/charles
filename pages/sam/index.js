import Link from 'next/link';
import { getAllFilesFrontMatter } from '../../lib/mdx';
import DateComponent from '../../components/Date';

function Blog({ posts }) {
  return (
    <div className="Blog">
      <h1 className="Blog__title">Sam's opinions on stuff</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/sam/${post.slug}`}>
              <a className="BlogLink t-para">
                <span className="BlogLink__text">{post.title}</span>
                <DateComponent date={post.date} short element="span" className="BlogLink__date t-small" />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('sam');

  return { props: { posts }};
}

export default Blog;
