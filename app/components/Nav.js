import React from 'react';
import styles from '../styles/Nav.module.css';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

/**
 * Navigation Bar
 *
 * @returns {React.Component}
 */
const Nav = () => {
  const { user, _isLoading } = useUser();

  return (
    <nav className={styles.navWrapper}>
      <Link href="/">
        <a>
          <img className={styles.logoWrapper} src="/logo.svg" />
        </a>
      </Link>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/" activeClassName="active-link" exact>
            Directory
          </Link>
        </li>
        <li>
          <Link href="/about" activeClassName="active-link" exact>
            About
          </Link>
        </li>
        <li>
          {user?.name ? (
            <div className={styles.dropdown}>
              <span className={styles.fakeLink}>{user?.name}</span>
              <div className="content">
                <Link href="/account" activeClassName="active-link" exact>
                  Account
                </Link>
                <Link
                  href="/api/auth/logout"
                  activeClassName="active-link"
                  exact
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <Link href="/api/auth/login" activeClassName="active-link" exact>
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
