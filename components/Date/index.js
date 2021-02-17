import PropTypes from 'prop-types';
import { shortDate, longDate } from '../../util/date';

const shortStyle = {
  textTransform: 'uppercase',
  fontSize: '0.85em',
};

const longStyle = { fontStyle: 'italic' };

function DateComponent({ children, date: dateString, short = false }) {
  const style = short ? shortStyle : longStyle;

  if (children) {
    return <p style={style}>{children}</p>;
  }

  const format = short ? shortDate : longDate;

  return (
    <p style={style}>
      <time dateTime={dateString}>{format(new Date(dateString))}</time>
    </p>
  );
}

DateComponent.propTypes = {
  date: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  short: PropTypes.bool,
};

export default DateComponent;
