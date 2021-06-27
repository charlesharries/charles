import PropTypes from 'prop-types';
import { shortDate, longDate } from '../../util/date';

const shortStyle = {};

const longStyle = { fontStyle: 'italic' };

function DateComponent({
  children,
  date: dateString,
  short = false,
  element = 'p',
  className = '',
}) {
  const style = short ? shortStyle : longStyle;
  const Element = element;

  if (children) {
    return (
      <p className={className} style={style}>
        {children}
      </p>
    );
  }

  const format = short ? shortDate : longDate;

  return (
    <Element style={style} className={className}>
      <time className="font-monospace nowrap" dateTime={dateString}>
        {format(new Date(dateString))}
      </time>
    </Element>
  );
}

DateComponent.propTypes = {
  date: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  short: PropTypes.bool,
  element: PropTypes.string,
  className: PropTypes.string,
};

export default DateComponent;
