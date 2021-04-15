import React from 'react';
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
    </footer>
  );
}
