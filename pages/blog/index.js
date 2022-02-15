import Link from 'next/link';
import PropTypes from 'prop-types';
import DateComponent from '../../components/Date';
import { PostHead } from '../../components/Head';
import { byDate } from '../../util/sort';
import { getAllPosts } from '../../lib/api';
import useTags from 'lib/useTags.ts';
import Tag from 'components/Tag';
import { CSSTransition } from 'react-transition-group';
import capitalise from 'util/capitalise';

/**
 * A single blog item.
 *
 * @todo Once we've got all of the dates set, use the DateComponent here.
 * @param {{slug: string, title: string, date: string}} post
 */
function BlogItem({ href, title, created_at: date, summary, type = 'posts' }) {
  if (type !== 'posts') href = href.replace('blog', type);

  return (
    <li>
      <article>
        <Link href={href} prefetch={false}>
          <a className="BlogLink t-para">
            <div className="BlogLink__meta">
              <DateComponent date={date} short element="span" className="BlogLink__date t-xs" />
              {type !== 'posts' && <p className="badge mb-0 mt-2xs">{type}</p>}
            </div>
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

  const { tags, types, isTagActive, isPostActive, filtered, toggleTag } = useTags(posts);

  return (
    <>
      <PostHead frontMatter={blogMeta} />

      <h1 className="Blog__title">{blogMeta.title}</h1>

      <div className="Blog">
        {blogMeta.slug === 'blog' ? (
          <div className="Blog__filters">
            <h3 className="Blog__title leading-tight mt-sm">Filter</h3>
            <ul className="cluster cluster--sm mt-md">
              <li className="t-small mt-xs">By tag</li>
              {tags.map((tag) => (
                <li key={tag.slug}>
                  <Tag name={tag.slug} label={tag.title} isActive={isTagActive(tag.slug)} onChange={toggleTag} />
                </li>
              ))}
            </ul>

            <hr className="mt-sm" />

            <ul className="cluster cluster--sm mt-sm">
              <li className="t-small mt-xs">By type</li>
              {types.map(type => (
                <li key={type}>
                  <Tag label={capitalise(type)} name={type} isActive={isTagActive(type)} tag={type} onChange={toggleTag} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="Blog__list">
          <ul>
            {posts.map((meta) => (
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
  const [posts, walks] = await Promise.all([
    getAllPosts('posts'),
    getAllPosts('walks'),
  ]);

  const allPosts = posts
    .concat(walks)
    .sort((p1, p2) => (new Date(p1.created_at)) < (new Date(p2.created_at)) ? 1 : -1);

  return { props: { posts: allPosts } };
}

export default Blog;
