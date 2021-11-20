import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Organization.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Skeleton from 'react-loading-skeleton';

import JobCard from '../../components/JobCard';
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
    return null;
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
                  src={
                    org?.avatar ?? 'https://picsum.photos/seed/picsum/300/300'
                  }
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
                    backgroundColor: org.isHiring
                      ? 'rgba(0, 117, 255, 0.12)'
                      : '#3c3c3c2c',
                    color: org.isHiring ? '#0075FF' : '#3c3c3c80',
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
                    <h4>Stage:</h4> {org.stage ?? ''}
                  </li>
                  <li>
                    <h4>Founded:</h4>{' '}
                    {(org.founded && new Date(org.founded).getFullYear()) ??
                      '??'}
                  </li>
                  <li>
                    <h4>Employees:</h4> {org.size ?? ''}
                  </li>
                </ul>
              </>
            ) : (
              <Skeleton count={5} />
            )}
          </div>
          {org?.isHiring && (
            <div className="card">
              <h2>Hiring Contact</h2>
              {(!isLoading && org?.email && (
                <a href={`mailto:${org.email}`}>{org.email}</a>
              )) || <Skeleton />}
            </div>
          )}
          {(isLoading || org?.founders?.length > 0) && (
            <div className="card">
              <h2>People</h2>
              {((!isLoading && org?.founders) || [undefined]).map((f) => (
                <div className={styles.logoWrapper}>
                  {f !== undefined ? (
                    <img
                      src={
                        f.avatar ?? 'https://picsum.photos/seed/picsum/300/300'
                      }
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
                    <p style={{ marginBottom: '3px' }}>
                      {(!isLoading && f?.title) || <Skeleton />}
                    </p>
                    {f?.linkedin ? (
                      <a href={f?.linkedin}>
                        <faLinkedin />
                      </a>
                    ) : (
                      <p></p>
                    )}
                    {f?.linkedin ? (
                      <a href={f?.linkedin}>
                        {' '}
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          className={styles.linkedin}
                        ></FontAwesomeIcon>{' '}
                      </a>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
        <article className={styles.orgArticle}>
          <h1>{(!isLoading && org?.name) || <Skeleton width={425} />}</h1>
          {!isLoading ? (
            (org?.biography ?? '')
              .split('\n')
              .filter((p) => !!p)
              .map((p) => <p>{p}</p>)
          ) : (
            <div style={{ lineHeight: 1.75, marginTop: '11px' }}>
              <Skeleton count={Math.random() * 3 + 2} />
              <Skeleton width={100} />
              <Skeleton count={Math.random() * 2 + 3} />
              <Skeleton width={230} />
            </div>
          )}
          {/*!isLoading && org?.jobs && */}
          {false && (
            <>
              <h2>Jobs</h2>
              <JobCard />
            </>
          )}
        </article>
      </div>
    </Layout>
  );
}
