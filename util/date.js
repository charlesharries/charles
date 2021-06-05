/**
 * Get the English 'short' month for the given date.
 *
 * @param {Date} d - The date to get the month for.
 * @returns {string} - E.g. 'Jan', 'Feb'
 */
function shortMonth(d) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return months[d.getMonth()];
}

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
 * Get a short representation of a date.
 *
 * @param {Date} date
 * @returns {string} - E.g. 12 Feb '21
 */
export function shortDate(date) {
  const y = date.getFullYear() % 100;
  const m = shortMonth(date);
  let d = date.getDate();

  if (d < 10) {
    d = `0${d}`;
  }

  return `${d} ${m} ${y}`;
}

/**
 * Format a date like "1 January 2021".
 *
 * @param   {Date} date - The date to format.
 * @returns {string}
 */
export const longDate = date => {
  const y = date.getFullYear() % 100;
  const m = month(date);
  const d = date.getDate();

  return `${d} ${m} '${y}`;
};
