import PropTypes from 'prop-types';
import Head from 'next/head';
import { title, description } from '../components/Head';

function BlogPage({ children, frontMatter }) {
  return (
    <div className="Post">
      <Head>
        <title>{frontMatter.title || title}</title>
        <meta
          name="description"
          content={frontMatter.description || description}
        />
      </Head>

      {children}
    </div>
  );
}

BlogPage.propTypes = {
  children: PropTypes.element,
  frontMatter: PropTypes.object,
};

export default BlogPage;
