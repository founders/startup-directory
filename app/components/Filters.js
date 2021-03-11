import React from 'react';
import styles from '../styles/Filters.module.css';
import Multiselect from './Multiselect';

import { CATEGORIES } from '../utils/constants';

const Filters = ({ filters, updateFilters }) => {
  const handleCheck = (e) => {
    updateFilters({ ...filters, isHiring: e?.target?.checked });
  };

  const handleCategoryChange = ({ selected }) => {
    updateFilters({ ...filters, categories: selected });
  };

  const [values, setValues] = React.useState([]);

  return (
    <aside className={styles.filterBox}>
      <h3>Filters</h3>
      <Multiselect tags={CATEGORIES} onChange={handleCategoryChange} />
      <input
        type="checkbox"
        checked={filters.isHiring}
        onChange={handleCheck}
      />
    </aside>
  );
};

export default Filters;
