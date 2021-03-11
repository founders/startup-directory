import React from 'react';
import Link from 'next/link';
import styles from '../styles/OrgCard.module.css';
import Tags from './Tags';

export default function OrgCard({ org, query }) {
  return (
    <div className={styles.orgCardWrapper}>
      <img
        src={org.logo ?? 'https://picsum.photos/seed/picsum/300/300'}
        alt=""
      />
      <div className="info">
        <h3>{org.name}</h3>
        <p>{org.desc}</p>
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
