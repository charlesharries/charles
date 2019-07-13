import Link from 'next/link';
import published from '~data/published';

function Blog() {
  return (
    <main className="Blog">
      <h1 className="Blog__title">Glob</h1>
      <ul>
        {published.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <a className="BlogLink">
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

export default Blog;
