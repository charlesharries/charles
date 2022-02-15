/**
 * Get the English 'short' month for the given date.
 */
function shortMonth(d: Date): string {
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
 */
export function month(d: Date|number): string {
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

  if (typeof d === 'number') {
    return months[d];
  }

  return months[d.getMonth()];
}

/**
 * Get a short representation of a date, e.g. 12 Feb '21
 */
export function shortDate(date: Date): string {
  const y = date.getFullYear() % 100;
  const m = shortMonth(date);
  let d: string | number = date.getDate();

  if (d < 10) {
    d = `0${d}`;
  }

  return `${d} ${m} ${y}`;
}

/**
 * Format a date like "1 January 2021".
 */
export const longDate = (date: Date): string => {
  const y = date.getFullYear() % 100;
  const m = month(date);
  const d = date.getDate();

  return `${d} ${m} '${y}`;
};

/**
 * Format a date like "3:30 pm"
 */
export const time = (date: Date): string => {
  const h = date.getHours();
  const m = date.getMinutes();

  let hour = h % 12;
  if (hour === 0) hour = 12;

  return `${hour}:${m < 10 ? '0' : ''}${m} ${h < 12 ? 'am' : 'pm'}`;
};
