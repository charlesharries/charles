import { month as fullMonth } from 'util/date';
import { Post } from 'components/StreamItem';

interface Props {
  year: string;
  months: { [key: string]: Post[] };
}

export default function StreamYear({ year, months }: Props): JSX.Element {
  return (
    <div className="StreamYear">
      <h3>{year}</h3>
      <ul className="stack stack--sm">
        {Object.keys(months).map((month) => (
          <li className="cluster" key={`${year} ${month}`}>
            <h4>{fullMonth(parseInt(month))}</h4>
            <div className="flex-1">
              <ul className="cluster cluster--sm ">
                {months[month].map((post) => (
                  <li key={post.title}>
                    <a href="#" className="link">{post.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
