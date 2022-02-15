import { Timing } from 'lib/types';
import PropTypes from 'prop-types';

function Timings({ timings }: { timings: Timing[] }) {
  return (
    <ol className="Timings pl-0">
      {timings.map((t, i) => (
        <li className="Timings__time" key={`${i}:${t.location}`}>
          <span>{t.location}</span>
          <span>{t.reached_at}</span>
        </li>
      ))}
    </ol>
  );
}

Timings.propTypes = {
  timings: PropTypes.array,
};

export default Timings;
