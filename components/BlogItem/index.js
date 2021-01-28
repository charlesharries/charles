import Link from 'next/link';
import PropTypes from 'prop-types';

export default function BlogItem({ post }) {
  return (
    <li className="BlogPost">
      <article className="BlogPost">
        <p className="t-large mb-0">
          <Link href={`/${post.__resourcePath.replace('.mdx', '')}`}>
            {post.title.replace(' | Charles Harries', '')}
          </Link>
        </p>
        <p className="font-sm">{post.description}</p>
      </article>
    </li>
  );
}

BlogItem.propTypes = {
  post: PropTypes.shape({
    __resourcePath: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};
