import { Post, PostFrontMatter } from 'lib/types';
import Link from 'next/link';
import { month as fullMonth } from 'util/date';

interface Props {
  year: string;
  months: { [key: string]: PostFrontMatter[] };
}

export default function StreamYear({ year, months }: Props): JSX.Element {
  const sortedMonths = Object.keys(months).sort((a, b) => parseInt(b) - parseInt(a))

  // Have to define this explicitly because React.CSSProperties
  // doesn't include custom properties :|
  const separatorStyle = { '--separator': '"•"' } as React.CSSProperties

  return (
    <div className="StreamYear">
      <h3>{year}</h3>
      <ul className="stack stack--sm">
        {sortedMonths.map((month) => (
          <li className="cluster" key={`${year} ${month}`}>
            <h4 className="w-10 mobile:w-100">{fullMonth(parseInt(month))}</h4>
            <div className="flex-1">
              <ul className="cluster cluster--sm" style={separatorStyle}>
                {months[month].map((post) => (
                  <li key={post.title}>
                    <Link href={`/stream/${post.slug}`}>
                      <a className="link">
                        {post.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div >
  );
}
