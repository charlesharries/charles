import Link from 'next/link';
import PropTypes from 'prop-types';
import DateComponent from '../../components/Date';
import * as allPosts from './*.mdx';

/**
 * Get the frontmatter off a post.
 *
 * @param {{ frontmatter: Object }} post
 */
const getFrontmatter = post => post.frontMatter;

// Disable client-side JS.
export const config = {
  unstable_runtimeJS: false,
};

/**
 * Compare two post dates for sorting.
 *
 * @param   {{ date: string }} p1
 * @param   {{ date: string }} p2
 * @returns {number}
 */
function byDate(p1, p2) {
  return p1.date < p2.date ? 1 : -1;
}

/**
 * A single blog item.
 *
 * @todo Once we've got all of the dates set, use the DateComponent here.
 * @param {{ __resourcePath: string, title: string, date: string }} post
 */
function BlogItem({ __resourcePath, title, date }) {
  const path = __resourcePath.replace('.mdx', '');

  return (
    <li>
      <article>
        <Link href={`/${path}`}>
          <a className="BlogLink t-para">
            <DateComponent date={date} short element="span" className="BlogLink__date t-small" />
            <span className="BlogLink__text">{title}</span>
          </a>
        </Link>
      </article>
    </li>
  );
}

BlogItem.propTypes = {
  __resourcePath: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
};

function Blog() {
  const posts = allPosts.map(getFrontmatter);

  return (
    <div className="Blog">
      <h1 className="Blog__title">the blog</h1>
      <ul>
        {posts.sort(byDate).map(frontMatter => (
          <BlogItem key={frontMatter.__resourcePath} {...frontMatter} />
        ))}
      </ul>
    </div>
  );
}

export default Blog;
