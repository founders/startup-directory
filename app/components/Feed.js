import React from 'react';
import styles from '../styles/Feed.module.css';

import OrgCard from '../components/OrgCard';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

/**
 * Checks for overlap between array A and B
 *
 * @param {Array} a
 * @param {Array} b
 * @returns {boolean}
 *
 * @public
 */
function hasSharedElem(a, b) {
  for (const elemB of b) {
    if (a.some((elemA) => elemA === elemB)) {
      return true;
    }
  }
  return false;
}

/**
 * Feed of organizations that makes requests and filters
 * according to props
 *
 * @param {*} props
 * @returns {React.Component}
 */
export default function Feed({ filters }) {
  const [data, setData] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // fetch for new results
    setIsLoading(true);
    fetch('/api/organizations')
      .then((res) => res.json())
      .then((json) => {
        json.data && setData(json.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    const filteredResults = data
      // filter by isHiring
      ?.filter((res) => !filters.isHiring || res?.isHiring)
      ?.filter((res) => !res?.isHidden)
      // filter by selected tags if at least one tag selected
      ?.filter(
        (res) =>
          filters.categories.length === 0 ||
          !res.categories ||
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
      )
      ?.filter(
        (res) =>
          !filters.minFoundingDate ||
          !filters.maxFoundingDate ||
          (new Date(res?.founded)?.getFullYear() >= filters.minFoundingDate &&
            new Date(res?.founded)?.getFullYear() <= filters.maxFoundingDate),
      );

    setResults(filteredResults);
  }, [
    filters.query,
    filters.isHiring,
    filters.minFoundingDate,
    filters.maxFoundingDate,
    filters.categories,
    data,
  ]);

  return (
    <section className={styles.feedBox}>
      {!isLoading ? (
        <p>
          {results?.length ?? 0} result{(results?.length ?? 0) !== 1 && 's'}{' '}
          {filters.query && `for '${filters.query}'`}
        </p>
      ) : (
        <p>Loading...</p>
      )}
      {!isLoading
        ? results?.map((res) => (
            <OrgCard key={res.id} org={res} query={filters.query} />
          ))
        : new Array(2).fill(0).map((_, idx) => <OrgCard key={idx} skeleton />)}
    </section>
  );
}

export const getServerSideProps = withPageAuthRequired();
