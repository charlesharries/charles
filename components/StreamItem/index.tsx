import { Image as CraftImage, Post } from "lib/types";
import useLightbox from "lib/useLightbox";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import FullDate from "../FullDate";

function StreamItemFeaturedImage({ image }: { image: CraftImage }) {
  return (
    <figure>
      <Image src={image.url} alt={image.alt} width={image.width} height={image.height} />
      <figcaption>{image.alt}</figcaption>
    </figure>
  );
}

export default function StreamItem({ post }: { post: Post }): JSX.Element {
  const el = useRef();
  useLightbox(el.current);

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
    <article ref={el} className="StreamItem">
      <div className="StreamItem__meta">
        <div className="font-monospace t-xs text-right text-accent shadow">
          <FullDate datetime={post.created_at} />
        </div>
      </div>

      <div className="StreamItem__body Post">
        {post.show_title && <h2 className="t-h3" id={post.slug}>
          <Link href={`/stream/${post.slug}`}>{post.title}</Link>
        </h2>}

        <div className="mt-sm">
          <FeaturedImages />

          <div
            className="StreamItem__body__content"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </div>
      </div>
    </article>
  );
}
