import { Image as CraftImage, Post } from 'lib/types';
import Image from 'next/image';
import FullDate from '../FullDate';

function StreamItemFeaturedImage({ image }: { image: CraftImage }) {
  return (
    <figure>
      <Image src={image.url} alt={image.alt} width={image.width} height={image.height} />
      <figcaption>{image.alt}</figcaption>
    </figure>
  );
}

export default function StreamItem({ post }: { post: Post }): JSX.Element {
  function FeaturedImages() {
    if (!post.featured_image?.length) return null;

    return (
      <div className="StreamItem__body__images">
        {post.featured_image.map((image) => (
          <StreamItemFeaturedImage image={image} key={image.url} />
        ))}
      </div>
    );
  }

  return (
    <article>
      <div className="StreamItem__heading desktop:d-flex align-bottom">
        <h2 id={post.slug}>{post.title}</h2>

        <div className="text-accent">
          <FullDate datetime={post.created_at} />
        </div>
      </div>

      <div className="StreamItem__body desktop:d-flex mt-sm">
        <div
          className="StreamItem__body__content Post"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        <FeaturedImages />
      </div>
    </article>
  );
}
