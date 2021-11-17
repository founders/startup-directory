import React from 'react';
import Link from 'next/link';
import styles from '../styles/OrgCard.module.css';
import Skeleton from 'react-loading-skeleton';
import Tags from './Tags';

/**
 * Card displaying individual organization information
 * receives organization data as a prop
 *
 * @param {*} props
 * @returns {React.Component}
 */
export default function OrgCard({ org, skeleton }) {
  if (skeleton) {
    return (
      <div className={styles.orgCardWrapper}>
        <Skeleton height={80} width={80} style={{ marginRight: '18px' }} />
        <div className="info">
          <h3 style={{ display: 'flex', alignItems: 'center' }}>
            <Skeleton width={200} style={{ marginRight: '8px' }} />{' '}
            <Skeleton width={70} />
          </h3>
          <p>
            <Skeleton />
          </p>
          <Skeleton width={120} />
        </div>
        <a
          style={{
            marginLeft: '18px',
            backgroundColor: '#3c3c3c12',
            color: '#3c3c3c3c',
          }}
        >
          <i className={styles.rightArr} />
        </a>
      </div>
    );
  }
  return (
    <div className={styles.orgCardWrapper}>
      <img
        src={org.avatar ?? `https://picsum.photos/seed/picsum/300/300`}
        alt={`${org.name} Logo`}
      />
      <div className="info">
        <h3 style={{ display: 'flex', alignItems: 'center' }}>
          {org.name}{' '}
          {org.isHiring && (
            <Tags
              style={{ display: 'inline-block', marginLeft: '8px' }}
              tagStyle={{
                marginBottom: '2.5px',
                color: '#0075FF',
                backgroundColor: '#0075FF1F',
              }}
              tags={['Hiring']}
            />
          )}
        </h3>
        <p>{org.description}</p>
        <Tags
          tags={[
            `Founded ${new Date(org.founded).getFullYear()}`,
            ...(org.categories ?? []),
            ...(org.resources ?? []),
          ]}
        />
      </div>
      <Link href={`/org/${org.id}`}>
        <a>
          <i className={styles.rightArr} />
        </a>
      </Link>
    </div>
  );
}
