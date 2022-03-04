import Link from 'next/link';
import { InferGetStaticPropsType } from 'next';
import DateComponent from '../../components/Date';
import { PostHead } from '../../components/Head';
import { getAllPosts } from '../../lib/api';
import useTags from 'lib/useTags';
import Tag from 'components/Tag';
import { CSSTransition } from 'react-transition-group';
import capitalise from 'util/capitalise';
import { BookFrontMatter, PostFrontMatter } from 'lib/types';

interface BookMetaProps {
  rating: number;
  publication_year: number;
  writer: string;
}

function BookMeta({ rating, publication_year, writer }: BookMetaProps) {
  function Star() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  }

  return (
    <span className="BookMeta d-flex align-center gap-sm">
      <span>{writer}, {publication_year}</span>
      <span className="d-flex align-center">
        {Array.from(Array(rating).keys()).map((_, i) => <Star key={i} />)}
      </span>
    </span>
  )
}

/**
 * A single blog item.
 */
function BlogItem({ href, title, created_at: date, summary, type = 'posts', ...rest }) {
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
              <p className="mb-0 t-small text-accent leading-loose">
                {type === 'books' ? <BookMeta {...rest as BookMetaProps} /> : summary}
              </p>
            </div>
          </a>
        </Link>
      </article>
    </li>
  );
}

function Blog({ posts, headings }: InferGetStaticPropsType<typeof getStaticProps>) {
  const blogMeta = Object.assign({
    slug: 'blog',
    title: 'Posts',
    description: "What I've been up to lately, what's popped into my head.",
  }, headings);

  const { tags, types, isTagActive, isPostActive, toggleTag } = useTags(posts);

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
                  <Tag label={capitalise(type)} name={type} isActive={isTagActive(type)} onChange={toggleTag} />
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
  const [posts, walks, books] = await Promise.all([
    getAllPosts('posts'),
    getAllPosts('walks'),
    getAllPosts('books'),
  ]);

  const allPosts = [...posts, ...walks, ...books]
    .sort((p1, p2) => (new Date(p1.created_at)) < (new Date(p2.created_at)) ? 1 : -1);

  return { props: { posts: allPosts as (PostFrontMatter | BookFrontMatter)[], headings: {} } };
}

export default Blog;
