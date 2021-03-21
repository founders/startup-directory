import React from 'react';
import styles from '../styles/Filters.module.css';
import Multiselect from './Multiselect';

import { CATEGORIES } from '../utils/constants';

/**
 * Filter box containing form components. State is
 * stored in a parent component and edited via callback
 *
 * @param {*} props
 * @returns {React.Component}
 */
const Filters = ({ filters, updateFilters }) => {
  const handleCheck = (e) => {
    updateFilters({ ...filters, isHiring: e?.target?.checked });
  };

  const handleCategoryChange = ({ selected }) => {
    updateFilters({ ...filters, categories: selected });
  };

  return (
    <aside className={styles.filterBox}>
      <h3>Filters</h3>
      <Multiselect tags={CATEGORIES} onChange={handleCategoryChange} />
      <p>
        <input
          id="is-hiring"
          type="checkbox"
          checked={filters.isHiring}
          onChange={handleCheck}
        />
        <label htmlFor="is-hiring">Hiring</label>
      </p>
    </aside>
  );
};

export default Filters;
