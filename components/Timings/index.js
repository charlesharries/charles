import PropTypes from 'prop-types';

function Timings({ timings }) {
  return (
    <ol className="Timings">
      {timings.map((t, i) => (
        <li className="Timings__time" key={`${i}:${t.label}`}>
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
