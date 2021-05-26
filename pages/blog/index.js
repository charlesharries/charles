import Link from 'next/link';
import PropTypes from 'prop-types';
import DateComponent from '../../components/Date';
import published from '../../data/published';
import { frontMatter as allPosts } from './*.mdx';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '../../layouts/index';
import { getAllFilesFrontMatter } from '../../lib/mdx';
import { PostHead } from '../../components/Head';

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
 * @param {{slug: string, title: string, date: string}} post
 */
function BlogItem({ slug, title, date }) {
  return (
    <li>
      <article>
        <Link href={`/blog/${slug}`}>
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

function Blog({ posts }) {
  const frontMatter = {
    slug: 'blog',
    title: 'The Blog',
    description: "What I've been up to lately, what's popped into my head.",
  };

  return (
    <>
      <PostHead frontMatter={frontMatter} />

      <div className="Blog">
        <h1 className="Blog__title">the blog</h1>
        <ul>
          {posts.sort(byDate).map(frontMatter => (
            <BlogItem key={frontMatter.slug} {...frontMatter} />
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog');

  return { props: { posts }};
}

export default Blog;
