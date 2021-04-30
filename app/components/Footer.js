import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';
import { useUser } from '@auth0/nextjs-auth0';

export default function Footer() {
  const { user } = useUser();

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
        {user ? (
          <Link href="/api/auth/logout" exact>
            <a>Logout</a>
          </Link>
        ) : (
          <Link href="/api/auth/login" exact>
            <a>Startup Login</a>
          </Link>
        )}{' '}
        &middot;{' '}
        <Link href="/help/getting-registered" exact>
          <a>Help/Support</a>
        </Link>
      </p>
    </footer>
  );
}
