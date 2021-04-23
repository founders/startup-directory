import React from 'react';
import { orgSelector } from '../../styles/Account.module.css';
import Skeleton from 'react-loading-skeleton';

/**
 * List of organizations with ability to select one
 * as a callback
 *
 * @param {*} props
 * @returns {React.Component}
 */
const OrgSelection = ({ updateSelected }) => {
  const [data, setData] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  const [selected, setSelected] = React.useState(undefined);

  React.useEffect(() => {
    // fetch existing orgs
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
    updateSelected?.(selected);
  }, [selected]);

  return (
    <section className={`card ${orgSelector}`}>
      <input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {!isLoading ? (
          data
            // filter by query
            ?.filter(
              (res) =>
                !query ||
                (res?.name + res?.desc + res?.categories?.join('-'))
                  ?.toLowerCase()
                  .toLowerCase()
                  .includes(query.toLowerCase()),
            )
            ?.map((org) => (
              <li key={org.id}>
                <span>
                  <img
                    src={
                      org.logo ?? `https://picsum.photos/seed/picsum/300/300`
                    }
                    alt={`${org.name} Logo`}
                  />
                  {org.name}
                </span>
                <button
                  onClick={() => setSelected(org)}
                  disabled={org.id === selected?.id}
                >
                  {org.id === selected?.id ? 'SELECTED' : 'SELECT'}
                </button>
              </li>
            ))
        ) : (
          <>
            {Array(7).fill(
              <li>
                <span>
                  <Skeleton
                    style={{ marginRight: '10px' }}
                    width={30}
                    height={30}
                  />{' '}
                  <Skeleton width={120} />
                </span>
                <Skeleton width={80} />
              </li>,
            )}
          </>
        )}
      </ul>
    </section>
  );
};

export default OrgSelection;
