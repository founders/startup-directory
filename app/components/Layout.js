import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Head from 'next/head';
import styles from '../styles/Layout.module.css';

/**
 * Page layout wrapper
 *
 * @param {*} props
 * @returns {React.component}
 */
export default function Layout({ title, children, hideTitle }) {
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <Head>
          <title>
            {title ? `${title} | Startup Directory` : 'Startup Directory'}
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          {!hideTitle && <h1>{title || 'Startup Directory'}</h1>}
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
