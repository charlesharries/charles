import Link from 'next/link';
import published from './published';

function Blog() {
  return (
    <main className="Blog">
      <h1 className="Blog__title">Glob</h1>
      <ul>
        {published.map(post => (
          <li>
            <Link href={`/blog/${post.slug}`}>
              <a>
                {post.title}
                <span className="BlogLink__date t-small">{post.date}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

Blog.getInitialProps = async ctx => {};

export default Blog;
