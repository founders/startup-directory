import React from 'react';
import styles from '../styles/Nav.module.css';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import AccountContext from '../utils/AccountContext';

/**
 * Navigation Bar
 *
 * @returns {React.Component}
 */
const Nav = () => {
  const { user } = useUser();

  const { account } = React.useContext(AccountContext);

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
        {!user &&
        <li>
          <Link href="/api/auth/login" activeClassName="active-link" exact>
            Sign In
          </Link>
        </li>
        }
        <li>
          {user && (
            <div className={styles.dropdown}>
              <span className={styles.fakeLink}>
                {user?.picture ? (
                  <img src={user.picture} alt="" />
                ) : (
                  <div className={styles.fakePicture}>
                    {user?.name?.[0] ?? '🚀'}
                  </div>
                )}
                <span style={{ transform: 'scaleY(0.65)' }}>&#9660;</span>
              </span>
              <div className="content">
                <Link href="/account" activeClassName="active-link" exact>
                  Account
                </Link>
                {account?.isAdmin && (
                  <Link href="/admin" activeClassName="active-link" exact>
                    Admin
                  </Link>
                )}
                <Link
                  href="/api/auth/logout"
                  activeClassName="active-link"
                  exact
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
