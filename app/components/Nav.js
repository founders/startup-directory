import React from 'react';
import styles from '../styles/Nav.module.css';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

/**
 * Navigation Bar
 *
 * @returns {React.Component}
 */
<<<<<<< HEAD
const Nav = () => {
  const { user, error, isLoading } = useUser();

  return (
    <nav className={styles.navWrapper}>
      <Link href="/">LOGO</Link>
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
        {!user && (
          <li>
            <Link href="/login" activeClassName="active-link" exact>
              Login
            </Link>
          </li>
        )}
        {user && (
          <li>
            <Link href="/login" activeClassName="active-link" exact>
              Logout
            </Link>
          </li>
        )}
        {user && (
          <li>
            <h2>{user.name}</h2>
          </li>
        )}
      </ul>
    </nav>
  );
};
=======
const Nav = () => (
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
        <Link href="/login" activeClassName="active-link" exact>
          Login
        </Link>
      </li>
    </ul>
  </nav>
);
>>>>>>> c3e50b56ecc77e78e08227b09bcb1b87166d413c

export default Nav;
