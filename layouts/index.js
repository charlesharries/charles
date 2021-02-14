import PropTypes from 'prop-types';
import { PostHead } from '../components/Head';

function BlogPage({ children, frontMatter }) {
  return (
    <div className="Post">
      <PostHead frontMatter={frontMatter} />

      {children}
    </div>
  );
}

BlogPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  frontMatter: PropTypes.object,
};

export default BlogPage;
