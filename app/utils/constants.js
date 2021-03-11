const DATE_FOUNDED_MIN = 2010;
const DATE_FOUNDED_MAX = new Date().getFullYear;

export const DEFAULT_FILTERS = Object.freeze({
  query: '',
  categories: [],
  minFoundingDate: DATE_FOUNDED_MIN,
  maxFoundingDate: DATE_FOUNDED_MAX,
  isHiring: false,
});

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

export const TAG_COLORS = Object.freeze({
  BLUE: '',
  BLUE_BACKGROUND: '',
  ORANGE: '',
  ORANGE_BACKGROUND: '',
});
