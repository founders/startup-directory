import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Organization.module.css';
import Skeleton from 'react-loading-skeleton';

import Tags from '../../components/Tags';
import Layout from '../../components/Layout';

export default function Org() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = React.useState(true);
  const [org, setOrg] = React.useState(undefined);

  React.useEffect(() => {
    if (!id) return;
    (async function () {
      setIsLoading(true);
      const res = await fetch(`/api/organizations/${id}`);
      const { data } = await res.json();
      if (data !== undefined) {
        setOrg(data);
        setIsLoading(false);
      } else {
        console.error('Failed to fetch organization.');
        setIsLoading(false);
      }
    })();
  }, [id]);

  if (!isLoading && !org) {
    router.push('/');
  }

  return (
    <Layout title={undefined} hideTitle>
      <div className={styles.orgGrid}>
        <aside>
          <Link href="/">
            <a className={styles.backLink}>
              <i className={styles.leftArr} style={{ marginRight: '6px' }} />{' '}
              Back to Results
            </a>
          </Link>
          <div className="card">
            <div className={styles.logoWrapper}>
              {!isLoading ? (
                <img
                  src={org?.logo ?? 'https://picsum.photos/seed/picsum/300/300'}
                  alt={`${org?.name} Logo`}
                />
              ) : (
                <Skeleton
                  height={79}
                  width={79}
                  style={{ marginRight: '18px' }}
                />
              )}
              <div>
                <h1>{(!isLoading && org?.name) || <Skeleton count={2} />}</h1>
              </div>
            </div>
            {!isLoading ? (
              <>
                <Tags
                  style={{ marginTop: '8px', marginBottom: '6px' }}
                  tagStyle={{
                    fontSize: '12px',
                    backgroundColor: '#3c3c3c2c',
                    color: '#3c3c3c80',
                  }}
                  tags={[org.isHiring ? 'Hiring' : 'Not Looking to Hire']}
                />
                <Tags
                  style={{ marginBottom: '6px' }}
                  tags={org.categories ?? []}
                  tagStyle={{ fontSize: '12px' }}
                />
                <ul className={styles.statsList}>
                  <li>
                    <h4>Stage:</h4> {org.stage}
                  </li>
                  <li>
                    <h4>Founded:</h4> {org.founded ?? '??'}
                  </li>
                  <li>
                    <h4>Employees:</h4> {org.size ?? '??'}
                  </li>
                </ul>
              </>
            ) : (
              <Skeleton count={5} />
            )}
          </div>
          <div className="card">
            <h2>Contact</h2>
            {(!isLoading && org?.email && (
              <a href="mailto:${org.email}">{org.email}</a>
            )) || <Skeleton />}
          </div>
          <div className="card">
            <h2>People</h2>
            {((!isLoading && org?.founders) || [undefined]).map((f) => (
              <div className={styles.logoWrapper}>
                {f !== undefined ? (
                  <img
                    src={f.logo ?? 'https://picsum.photos/seed/picsum/300/300'}
                    alt={f.name ?? '??'}
                  />
                ) : (
                  <Skeleton
                    height={79}
                    width={79}
                    style={{ marginRight: '18px' }}
                  />
                )}
                <div>
                  <h4>{(!isLoading && f?.name) || <Skeleton />}</h4>
                  <p>{(!isLoading && f?.title) || <Skeleton />}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
        <article className={styles.orgArticle}>
          <h1>{(!isLoading && org?.name) || <Skeleton width={425} />}</h1>
          {!isLoading ? (
            org?.description.split('\n').map((p) => <p>{p}</p>)
          ) : (
            <div style={{ lineHeight: 1.75, marginTop: '11px' }}>
              <Skeleton count={Math.random() * 3 + 2} />
              <Skeleton width={100} />
              <Skeleton count={Math.random() * 2 + 3} />
              <Skeleton width={230} />
            </div>
          )}
        </article>
      </div>
    </Layout>
  );
}
