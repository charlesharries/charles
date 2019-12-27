import Link from 'next/link';
import published from '~data/published';

function Blog() {
  return (
    <div className="Blog">
      <h1 className="Blog__title">infrequent thoughts</h1>
      <ul>
        {published.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <a className="BlogLink t-para">
                <span className="BlogLink__text">{post.title}</span>
                <span className="BlogLink__date t-small">{post.date}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Blog;
