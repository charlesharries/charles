import Link from 'next/link';
import PropTypes from 'prop-types';
import published from '~data/published';

/**
 * A single blog item.
 *
 * @todo Once we've got all of the dates set, use the DateComponent here.
 * @param {{ slug: string, title: string, date: string }} post
 */
function BlogItem({ slug, title, date }) {
  return (
    <li>
      <article>
        <Link href={`/blog/${slug}`}>
          <a className="BlogLink t-para">
            <span className="BlogLink__date t-small">{date}</span>
            <span className="BlogLink__text">{title}</span>
          </a>
        </Link>
      </article>
    </li>
  );
}

BlogItem.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
};

function Blog() {
  return (
    <div className="Blog">
      <h1 className="Blog__title">the blog</h1>
      <ul>
        {published.map(p => (
          <BlogItem {...p} />
        ))}
      </ul>
    </div>
  );
}

export default Blog;
