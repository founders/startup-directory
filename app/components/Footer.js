import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <p>
        &copy; {new Date().getFullYear()}{' '}
        <a href="http://founders.illinois.edu" target="_blank">
          Founders &mdash; Illinois Entrepreneurs
        </a>
        .
      </p>

      <p>
        <Link href="/api/auth/login" exact>
          <a>Startup Login</a>
        </Link>{' '}
        &middot;{' '}
        <Link href="/help" exact>
          <a>Help/Support</a>
        </Link>
      </p>
    </footer>
  );
}
