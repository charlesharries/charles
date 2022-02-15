import Link from 'next/link';
import PropTypes from 'prop-types';
import DateComponent from '../../components/Date';
import { PostHead } from '../../components/Head';
import { byDate } from '../../util/sort';
import { getAllPosts } from '../../lib/api';
import useTags from 'lib/useTags.ts';
import Tag from 'components/Tag';
import { CSSTransition } from 'react-transition-group';

/**
 * A single blog item.
 *
 * @todo Once we've got all of the dates set, use the DateComponent here.
 * @param {{slug: string, title: string, date: string}} post
 */
function BlogItem({ href, title, created_at: date, summary }) {
  return (
    <li>
      <article>
        <Link href={href} prefetch={false}>
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
  const blogMeta = Object.assign({
    slug: 'blog',
    title: 'Posts',
    description: "What I've been up to lately, what's popped into my head.",
  }, headings);

  const { tags, isTagActive, isPostActive, filtered, toggleTag } = useTags(posts);

  return (
    <>
      <PostHead frontMatter={blogMeta} />

      <h1 className="Blog__title">{blogMeta.title}</h1>

      <div className="Blog">
        {blogMeta.slug === 'blog' ? (
          <div className="Blog__filters">
            <h3 className="Blog__title leading-tight mt-sm">Filter</h3>
            <ul className="cluster cluster--sm mt-md">
              {tags.map(tag => (
                <li key={tag.slug}>
                  <Tag isActive={isTagActive(tag)} tag={tag} onChange={toggleTag} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="Blog__list">
          <ul>
            {posts.map((meta) => console.log(isPostActive(meta)) || (
              <CSSTransition key={meta.slug} in={isPostActive(meta)} unmountOnExit timeout={300} classNames="fade-left">
                <BlogItem key={meta.slug} href={`/${blogMeta.slug}/${meta.slug}`} {...meta} />
              </CSSTransition>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts('posts');

  return { props: { posts } };
}

export default Blog;
