import Link from 'next/link';
import Blog from 'pages/blog';
import DateComponent from '../../components/Date';
import { getAllPosts } from '../../lib/api';

const SamsBlog = ({ posts }) => <Blog headings={{
  slug: 'sam',
  title: "Sam's opinions on stuff",
}} posts={posts} />

export async function getStaticProps() {
  const posts = await getAllPosts('sam-posts');

  return { props: { posts } };
}

export default SamsBlog;
