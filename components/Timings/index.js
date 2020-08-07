import PropTypes from 'prop-types';
import './timings.css';

function Timings({ timings }) {
  return (
    <ol className="Timings">
      {timings.map(t => (
        <li className="Timings__time" key={t.label}>
          <span>{t.label}</span>
          <span>{t.time}</span>
        </li>
      ))}
    </ol>
  );
}

Timings.propTypes = {
  timings: PropTypes.array,
};

export default Timings;
