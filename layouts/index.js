import PropTypes from 'prop-types';
import DateComponent from '../components/Date';
import { PostHead } from '../components/Head';

function BlogPage({ children, frontMatter }) {
  return (
    <div className="Post">
      <PostHead frontMatter={frontMatter} />

      <DateComponent date={frontMatter.date} />
      <h1>{frontMatter.title}</h1>

      {children}
    </div>
  );
}

BlogPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  frontMatter: PropTypes.object,
};

export default BlogPage;
