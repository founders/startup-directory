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
      The Startup Directory is Founders' attempt at unifying startups on campus. 
      Startups can register with the directory and upload information about themselves for the world to see. 
      As more and more students attend Founders events and begin creating their own ventures, our directory will contain 
      more information about the greater entrepreneurship community. Click into any of the listed startups to learn more about them.
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
