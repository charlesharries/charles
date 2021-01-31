import PropTypes from 'prop-types';

/**
 * Get the English month for the given date.
 *
 * @param {Date} d - The date to get the month for.
 */
function month(d) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months[d.getMonth()];
}

/**
 * Format a date like "1 January 2021".
 *
 * @param   {Date} date - The date to format.
 * @returns {string}
 */
const format = date => {
  const y = date.getFullYear() % 100;
  const m = month(date);
  const d = date.getDate();

  return `${d} ${m} '${y}`;
};

function DateComponent({ children, date: dateString }) {
  const style = { fontStyle: 'italic' };

  if (children) {
    return <p style={style}>{children}</p>;
  }

  return (
    <p style={style}>
      <time dateTime={dateString}>{format(new Date(dateString))}</time>
    </p>
  );
}

DateComponent.propTypes = {
  date: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default DateComponent;
