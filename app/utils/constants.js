/** @constant {number} */
export const DATE_FOUNDED_MAX = new Date().getFullYear();

/** @constant {number} */
export const DATE_FOUNDED_MIN = DATE_FOUNDED_MAX - 10;

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
    'Entertainment',
    'Education',
    'Technology',
    'Sports',
    'Arts',
    'Non-profit',
    'Consumer Goods',
    'Other'
  ].sort((a, b) => a.localeCompare(b)),
);

/** @constant {Array<string>} */
export const STAGES = Object.freeze([
  'Pre-Seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C',
  'Late-Stage',
]);

/** @constant {Array<string>} */
export const SIZES = Object.freeze([
  '1-10 Employees',
  '11-50 Employees',
  '51-100 Employees',
  '100+ Employees',
]);

/** @constant {Object<string, string>} */
export const TAG_COLORS = Object.freeze({
  BLUE: '',
  BLUE_BACKGROUND: '',
  ORANGE: '',
  ORANGE_BACKGROUND: '',
});
