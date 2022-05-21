import { PostHead } from 'components/Head';
import StreamItem from 'components/StreamItem/index';
import StreamYear from 'components/StreamYear';
import { getAllPosts, getPostBySlug } from 'lib/api';
import { Post, PostFrontMatter, PostFrontMatterResponse, PostResponse } from 'lib/types';

const showFull = 5;

interface Props {
  fullPostData: PostResponse[];
  frontMatterData: PostFrontMatterResponse[];
}

function Stream({ fullPostData, frontMatterData }: Props) {
  const pageFrontMatter = {
    title: 'Stream',
    slug: 'stream',
  }

  const fullPosts = fullPostData.map((p) => populateDate(p));
  const frontMatter = frontMatterData.map((p) => populateDate(p));

  const grouped = groupByMonth(frontMatter.slice(showFull));
  const years = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="Stream">
      <PostHead frontMatter={pageFrontMatter} />
      <h1 className="Stream__title">Stream</h1>
      <ul>
        {fullPosts.map((post, i) => (
          <li className={`${i > 0 ? 'mt-lg' : ''}`} key={post.title}>
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
    [key: string]: PostFrontMatter[];
  }
}

/**
 * Group posts first by year, and then by month within the year.
 */
function groupByMonth(posts: PostFrontMatter[]): HistoricalPosts {
  return posts.reduce((grouped, post) => {
    const month = post.created_at.getMonth();
    const year = post.created_at.getFullYear();
    if (!grouped[year]) {
      grouped[year] = {};
    }
    if (!grouped[year][month]) {
      grouped[year][month] = [];
    }
    grouped[year][month].push(post);
    return grouped
  }, {})
}

type Response = PostResponse | PostFrontMatterResponse;
type PostType<T> =
  T extends PostResponse ? Post :
  T extends PostFrontMatterResponse ? PostFrontMatter :
  never;

/**
 * Turn the string post.created_at into a JS Date.
 */
function populateDate<T extends Response>(post: T): PostType<T> {
  const populated = { ...post } as any;
  populated.created_at = new Date(post.created_at);
  return populated;
}

export async function getStaticProps(): Promise<{ props: Props, revalidate: number }> {
  const frontMatterData = await getAllPosts('stream');
  const fullPostData = await Promise.all(frontMatterData.slice(0, showFull)
    .map(frontMatter => {
      return getPostBySlug('stream', frontMatter.slug)
    }))

  return {
    props: { fullPostData, frontMatterData },
    revalidate: 5,
  };
}

export default Stream;
