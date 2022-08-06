import Link from "next/link";
import { InferGetStaticPropsType } from "next";
import DateComponent from "../../components/Date";
import { PostHead } from "../../components/Head";
import { getAllPosts } from "../../lib/api";
import useTags from "lib/useTags";
import Tag from "components/Tag";
import { CSSTransition } from "react-transition-group";
import capitalise from "util/capitalise";
import { BookFrontMatter, PostFrontMatter } from "lib/types";
import Stars from "components/Stars";

interface BookMetaProps {
  rating: number;
  publication_year: number;
  writer: string;
}

function BookMeta({ rating, publication_year, writer }: BookMetaProps) {
  return (
    <span className="BookMeta d-flex align-center gap-sm">
      <span>{writer}, {publication_year}</span>
      <Stars count={rating} />
    </span>
  )
}

/**
 * A single blog item.
 */
function BlogItem({ href, title, created_at: date, summary, type = "posts", ...rest }) {
  if (type !== "posts") href = href.replace("blog", type);

  return (
    <li>
      <article>
        <Link href={href} prefetch={false}>
          <a className="BlogLink t-para">
            <div className="BlogLink__meta">
              <DateComponent date={date} short element="span" className="BlogLink__date t-xs" />
              {type !== "posts" && <p className="badge mb-0 mt-2xs">{type}</p>}
            </div>
            <div className="BlogLink__text">
              <h3 className="t-para mt-0 font-regular mb-0">{title}</h3>
              <p className="mb-0 t-small text-accent leading-loose">
                {type === "books" ? <BookMeta {...rest as BookMetaProps} /> : summary}
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
    slug: "blog",
    title: "Posts",
    description: "What I've been up to lately, what's popped into my head.",
  }, headings);

  const { tags, types, isTagActive, isPostActive, toggleTag } = useTags(posts);

  return (
    <>
      <PostHead frontMatter={blogMeta} />

      <h1 className="Blog__title">{blogMeta.title}</h1>

      <div className="Blog">
        {blogMeta.slug === "blog" ? (
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
            {posts.filter(meta => isPostActive(meta)).map((meta) => (
              <BlogItem key={meta.slug} href={`/${blogMeta.slug}/${meta.slug}`} {...meta} />
            ))}
          </ul>
        </div>

      </div>
    </>
  );
}

export async function getStaticProps() {
  const [posts, walks, books] = await Promise.all([
    getAllPosts("posts"),
    getAllPosts("walks"),
    getAllPosts("books"),
  ]);

  const allPosts = [...posts, ...walks, ...books]
    .sort((p1, p2) => (new Date(p1.created_at)) < (new Date(p2.created_at)) ? 1 : -1);

  return {
    props: {
      posts: allPosts as (PostFrontMatter | BookFrontMatter)[],
      headings: {}
    },
    revalidate: 600,
  };
}

export default Blog;
