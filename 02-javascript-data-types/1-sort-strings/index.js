/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const factor = param == 'desc' ? -1 : 1;
  const locales = ['ru', 'en'];
  const options = {caseFirst: "upper"};
  const comparator = (str1, str2) => factor * str1.localeCompare(str2, locales, options);
  return [].concat(arr).sort(comparator);
}
