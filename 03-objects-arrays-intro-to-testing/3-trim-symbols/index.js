/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) return string;
  if (size === 0) return '';

  const result = [];
  let prevChar = null;
  let count = 0;

  for (const currChar of string.split('')) {
    if (currChar !== prevChar || count < size) {
      result.push(currChar);
      count = currChar === prevChar ? count + 1 : 1;
    }
    prevChar = currChar;
  }

  return result.join('');
}
