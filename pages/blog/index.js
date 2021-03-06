import Link from 'next/link';
import PropTypes from 'prop-types';
import DateComponent from '../../components/Date';
import { getAllFilesFrontMatter } from '../../lib/mdx';
import { PostHead } from '../../components/Head';
import { byDate } from '../../util/sort';

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
          {posts.sort(byDate).map((meta) => (
            <BlogItem key={meta.slug} {...meta} />
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog');

  return { props: { posts } };
}

export default Blog;
