

/**
 * Compare two post dates for sorting.
 *
 * @param   {{ date: string }} p1
 * @param   {{ date: string }} p2
 * @returns {number}
 */
export function byDate(p1, p2) {
  return p1.date < p2.date ? 1 : -1;
}