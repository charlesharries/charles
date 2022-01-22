import { GetStaticProps } from 'next';
import StreamItem, { Post } from 'components/StreamItem/index';
import StreamYear from 'components/StreamYear';
import { getAllStreamPosts } from 'lib/api';

function Stream({ postData }) {
  const posts = postData.map((p) => populateDate(p));
  const showFull = 3;

  const firstThree = posts.slice(0, showFull);
  const grouped = groupByMonth(posts.slice(showFull));
  const years = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="Stream">
      <h1 className="Stream__title">Stream</h1>
      <ul>
        {firstThree.map((post) => (
          <li key={post.title}>
            <StreamItem post={post} />
          </li>
        ))}
      </ul>
      <h2>From further back</h2>
      <ul>
        {years.map((year) => (
          <li key={year} className="Stream__year">
            <StreamYear year={year} months={grouped[year]} />
          </li>
        ))}
      </ul>
    </div>
  );
}

interface HistoricalPosts {
  [key: string]: {
    [key: string]: Post[];
  }
}

/**
 * Group posts first by year, and then by month within the year.
 */
function groupByMonth(posts: Post[]): HistoricalPosts {
  const grouped: HistoricalPosts = {};
  posts.forEach((post) => {
    const month = post.created_at.getMonth();
    const year = post.created_at.getFullYear();
    if (!grouped[year]) {
      grouped[year] = {};
    }
    if (!grouped[year][month]) {
      grouped[year][month] = [];
    }
    grouped[year][month].push(post);
  });
  return grouped;
}

/**
 * Turn the string post.created_at into a JS Date.
 */
function populateDate(post): Post {
  post.created_at = new Date(post.created_at);
  return post;
}

export async function getStaticProps() {
  const postData = await getAllStreamPosts();

  return { props: { postData } };
}

export default Stream;
