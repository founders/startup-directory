/** @constant {number} */
const DATE_FOUNDED_MIN = 2010;

/** @constant {number} */
const DATE_FOUNDED_MAX = new Date().getFullYear;

/** @constant {Object<string, any>} */
export const DEFAULT_FILTERS = Object.freeze({
  query: '',
  categories: [],
  minFoundingDate: DATE_FOUNDED_MIN,
  maxFoundingDate: DATE_FOUNDED_MAX,
  isHiring: false,
});

/** @constant {Array<string>} */
export const CATEGORIES = Object.freeze(
  [
    'Finance',
    'Biotechnology',
    'Advertising',
    'Healthcare',
    'Food & Beverage',
    'Research',
    'Software',
  ].sort((a, b) => a.localeCompare(b)),
);

/** @constant {Object<string, string>} */
export const TAG_COLORS = Object.freeze({
  BLUE: '',
  BLUE_BACKGROUND: '',
  ORANGE: '',
  ORANGE_BACKGROUND: '',
});
