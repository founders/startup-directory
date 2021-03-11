import React from 'react';
import Nav from '../components/Nav';
import Head from 'next/head';
import styles from '../styles/Layout.module.css';

export default function Layout({ title, children }) {
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
          <h1>{title || 'Startup Directory'}</h1>
          {children}
        </main>
      </div>
    </>
  );
}
