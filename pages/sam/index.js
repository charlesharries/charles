import Link from 'next/link';
import articles from '../../data/sam-published';

function Blog() {
  return (
    <div className="Blog">
      <h1 className="Blog__title">Sam's opinions on stuff</h1>
      <ul>
        {articles.map(post => (
          <li key={post.slug}>
            <Link href={`/sam/${post.slug}`}>
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
