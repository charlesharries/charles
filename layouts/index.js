import PropTypes from 'prop-types';
import DateComponent from '../components/Date';
import { PostHead } from '../components/Head';

function BlogPage({ children, frontMatter }) {
  return (
    <div className="Post">
      <PostHead frontMatter={frontMatter} />

      <DateComponent date={frontMatter.date} />
      <h1 className="mb-0">{frontMatter.title}</h1>
      {frontMatter.subtitle ? <h4 className="Post__subtitle mt-sm">{frontMatter.subtitle}</h4> : null}

      <div className="mt-lg">
        {children}
      </div>
    </div>
  );
}

BlogPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  frontMatter: PropTypes.object,
};

export default BlogPage;
