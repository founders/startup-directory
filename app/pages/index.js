import React from 'react';

import Layout from '../components/Layout';

import Filters from '../components/Filters';
import SearchInput from '../components/SearchInput';
import Feed from '../components/Feed';

import styles from '../styles/Home.module.css';

import { DEFAULT_FILTERS } from '../utils/constants';

export default function Home() {
  const [filters, setFilters] = React.useState(DEFAULT_FILTERS);

  return (
    <Layout>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <div className={styles.directoryWrapper}>
        <div className={styles.leftWrapper}>
          <Filters filters={filters} updateFilters={setFilters} />
        </div>

        <div className={styles.rightWrapper}>
          <SearchInput filters={filters} updateFilters={setFilters} />
          <Feed filters={filters} />
        </div>
      </div>
    </Layout>
  );
}
