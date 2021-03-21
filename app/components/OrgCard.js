import React from 'react';
import Link from 'next/link';
import styles from '../styles/OrgCard.module.css';
import Tags from './Tags';

/**
 * Card displaying individual organization information
 * receives organization data as a prop
 *
 * @param {*} props
 * @returns {React.Component}
 */
export default function OrgCard({ org }) {
  return (
    <div className={styles.orgCardWrapper}>
      <img
        src={org.logo ?? 'https://picsum.photos/seed/picsum/300/300'}
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
        <Tags tags={org.categories ?? []} />
      </div>
      <Link href={org.name}>
        <a>
          <i className={styles.rightArr} />
        </a>
      </Link>
    </div>
  );
}
