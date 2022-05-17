import { longDate, time } from '../util/date';

export default function FullDate({ datetime }) {
  const date = new Date(datetime);

  return (
    <time dateTime={date.toISOString()}>
      <span>{longDate(date)}</span><br />
      <span>{time(date)}</span>
    </time>
  );
}
