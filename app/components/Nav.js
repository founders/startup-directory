import React from 'react';
import styles from '../styles/Nav.module.css';
import Link from 'next/link';

const Nav = () => (
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
      <li>
        <Link href="/login" activeClassName="active-link" exact>
          Login
        </Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
