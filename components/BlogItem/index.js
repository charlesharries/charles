import Link from 'next/link';
import PropTypes from 'prop-types';

export default function BlogItem({ post }) {
  return (
    <li className="BlogPost">
      <article className="BlogPost">
        <h4 className="t-large mb-0">
          <Link href={`/${post.__resourcePath.replace('.mdx', '')}`}>
            {post.title.replace(' | Charles Harries', '')}
          </Link>
        </h4>
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
