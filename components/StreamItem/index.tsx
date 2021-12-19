import FullDate from '../FullDate.tsx';

interface FeaturedImageProps {
  image: { url: string; alt: string };
  key: string;
}

function StreamItemFeaturedImage({ image }: FeaturedImageProps) {
  return (
    <figure>
      <img src={image.url} alt={image.alt} />
      <figcaption>{image.alt}</figcaption>
    </figure>
  );
}

export default function StreamItem({ post }) {
  function FeaturedImages() {
    if (post.featured_image.length === 0) return null;

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
        <h2>{post.title}</h2>

        <div className="text-accent">
          <FullDate datetime={post.created_at.date} />
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
