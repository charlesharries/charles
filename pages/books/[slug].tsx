import Stars from 'components/Stars';
import { getAllPosts, getPostBySlug } from 'lib/api';
import { InferGetStaticPropsType } from 'next';
import BlogPost from 'pages/blog/[slug].js'

export default function BookPost({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  const FeaturedImage = () => {
    if (!book.featured_image[0]) return null;

    return <figure dangerouslySetInnerHTML={{ __html: book.featured_image[0]?.tag }}></figure>
  }

  const meta = (
    <>
      <p className="t-small text-accent d-flex gap-sm">
        <span>Published {book.publication_year}</span>
        {book.length ? <span>{book.length} pages</span> : null}
        <Stars count={book.rating} />
      </p>
      <FeaturedImage />
    </>
  );

  return <BlogPost post={book} beforePost={meta} frontMatter={{ subtitle: `by ${book.writer}` }} />
};

export async function getStaticPaths() {
  const posts = await getAllPosts('books');

  return {
    paths: posts.map((p) => ({
      params: { slug: p.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const book = await getPostBySlug('books', params.slug);

  return { props: { book } };
}