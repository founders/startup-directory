import React from 'react';
import styles from '../styles/Feed.module.css';

import OrgCard from '../components/OrgCard';

function hasSharedElem(a, b) {
  for (const elemB of b) {
    if (a.some((elemA) => elemA === elemB)) {
      return true;
    }
  }
  return false;
}

const Feed = ({ filters }) => {
  const [data, setData] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // fetch for new results
    setData([
      {
        name: 'Allergenius',
        founded: 2019,
        isHiring: false,
        categories: ['Software', 'Productivity'],
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      },
    ]);
  }, []);

  React.useEffect(() => {
    setResults(data);
  }, [data]);

  React.useEffect(() => {
    const filteredResults = data
      // filter by isHiring
      ?.filter((res) => !filters.isHiring || res?.isHiring)
      // filter by selected tags if at least one tag selected
      ?.filter(
        (res) =>
          filters.categories.length === 0 ||
          hasSharedElem(res.categories, filters.categories),
      )
      // filter by query
      ?.filter(
        (res) =>
          !filters.query ||
          (res?.name + res?.desc + res?.categories?.join('-'))
            ?.toLowerCase()
            .toLowerCase()
            .includes(filters.query.toLowerCase()),
      );
    // filter by founding date
    // ?.filter(
    //   (res) =>
    //     filter.minFoundingDate ||
    //     filter.maxFoundingDate ||
    //     (res?.founded >= filter.minFoundingDate &&
    //       res?.founded <= filter.maxFoundingDate),
    // );

    setResults(filteredResults);
  }, [
    filters.query,
    filters.isHiring,
    filters.minFoundingDate,
    filters.maxFoundingDate,
    filters.categories,
  ]);

  return (
    <section className={styles.feedBox}>
      <p>
        {results.length} result{results.length !== 1 && 's'}{' '}
        {filters.query && `for '${filters.query}'`}
      </p>
      {results.map((res) => (
        <OrgCard key={res.id} org={res} query={filters.query} />
      ))}
    </section>
  );
};

export default Feed;
