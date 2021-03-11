import React from 'react';

import styles from '../styles/SearchInput.module.css';

const SearchInput = ({ filters, updateFilters }) => {
  const handleChange = (e) => {
    updateFilters({ ...filters, query: e?.target?.value });
  };

  return (
    <label role="search" className={styles.searchBox}>
      <i className={styles.searchIcon} />
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search for a startup..."
      />
    </label>
  );
};

export default SearchInput;
