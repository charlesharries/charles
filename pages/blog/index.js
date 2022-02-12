import Link from 'next/link';
import PropTypes from 'prop-types';
import DateComponent from '../../components/Date';
import { PostHead } from '../../components/Head';
import { byDate } from '../../util/sort';
import { getAllPosts } from '../../lib/api';

/**
 * A single blog item.
 *
 * @todo Once we've got all of the dates set, use the DateComponent here.
 * @param {{slug: string, title: string, date: string}} post
 */
function BlogItem({ slug, title, created_at: date, summary }) {
  return (
    <li>
      <article>
        <Link href={`/blog/${slug}`} prefetch={false}>
          <a className="BlogLink t-para">
            <DateComponent date={date} short element="span" className="BlogLink__date t-xs" />
            <div className="BlogLink__text">
              <h3 className="t-para mt-0 font-regular mb-0">{title}</h3>
              <p className="mb-0 t-small text-accent leading-loose">{summary}</p>
            </div>
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

function Blog({ posts, headings }) {
  const meta = Object.assign({
    slug: 'blog',
    title: 'Posts',
    description: "What I've been up to lately, what's popped into my head.",
  }, headings);

  return (
    <>
      <PostHead frontMatter={meta} />

      <div className="Blog">
        <h1 className="Blog__title keyline">{meta.title}</h1>
        <ul>
          {posts.map((meta) => (
            <BlogItem key={meta.slug} {...meta} />
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts('posts');

  return { props: { posts } };
}

export default Blog;
