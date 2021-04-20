import React from 'react';

import {
  getWhitelist,
  createWhitelist,
  updateWhitelist,
} from '../utils/adminAPI';
import { validateEmail } from '../utils/helpers';

import Head from 'next/head';
import Link from 'next/link';
import { container, main } from '../styles/Layout.module.css';
import styles, { panel, whitelistHeader } from '../styles/Admin.module.css';

export default function About() {
  const [userList, setUserList] = React.useState('');
  const [lastUpdated, setLastUpdated] = React.useState(undefined);
  const [submissionState, setSubmissionState] = React.useState('IDLE');
  // TODO: Add searching for users
  //   const [query, setQuery] = React.useState('');

  const listToText = (l) => l.join('\n');
  const textToList = (t) => t.split('\n');

  React.useEffect(() => {
    (async () => {
      const {
        data: { data: whitelist, lastUpdated },
      } = await getWhitelist();

      if (whitelist && lastUpdated) {
        setUserList(listToText(whitelist));
        setLastUpdated(lastUpdated);
      }
    })();
  }, []);

  const handleUpdate = () => {
    const whitelist = textToList(userList).filter((el) => el !== '');

    if (whitelist.some((line) => !validateEmail(line))) {
      setSubmissionState('MALFORMATTED');
      return;
    }

    setSubmissionState('LOADING');
    updateWhitelist(whitelist)
      .then((res) => {
        const {
          data: { data: whitelist, lastUpdated },
        } = res;
        setUserList(listToText(whitelist));
        setLastUpdated(lastUpdated);
        setSubmissionState('IDLE');
      })
      .catch((e) => {
        console.error(e);
        setSubmissionState('ERROR');
      });
  };

  return (
    <div className={container}>
      <Head>
        <title>Admin Portal | Startup Directory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={main}>
        <h1>Admin Portal</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
          exercitationem, amet quo possimus laboriosam et corporis natus ut
          libero eum repellat at, nam aliquam rem ullam obcaecati nulla
          voluptate porro!
        </p>
        <div className={panel}>
          <aside>
            <ul className="card">
              <li style={{ cursor: 'default' }}>
                <b>Directory</b>
              </li>
              <li>Analytics</li>
              <li className="active-admin-menu-item">Manage Whitelist</li>
              <li>Manage Data</li>
              <li>Logout</li>
            </ul>
          </aside>
          <article className="card">
            <h2>Manage Whitelist</h2>
            <p>
              Update the whitelist with this virtual text file. Each line must
              be a valid email or blank (these get stripped out) to submit.
            </p>
            <div className={whitelistHeader}>
              <code>whitelist.txt</code>{' '}
              {lastUpdated && <span>Last Updated: {lastUpdated}</span>}
              {/* <label htmlFor="user-search">
                Search:{' '}
                <input
                  id="user-search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label> */}
            </div>
            <textarea
              defaultValue={userList}
              onChange={(e) => setUserList(e.target.value)}
              disabled={submissionState === 'LOADING'}
              name="whitelist"
              id="whitelist"
              rows="10"
            ></textarea>
            <button onClick={handleUpdate}>Update Whitelist</button>{' '}
            {submissionState === 'LOADING' && <small> Submitting...</small>}
            {submissionState === 'ERROR' && (
              <small style={{ color: 'red' }}>
                &nbsp; &times; Error on submit.
              </small>
            )}
            {submissionState === 'MALFORMATTED' && (
              <small style={{ color: 'red' }}>
                &nbsp; &times; One or more entry is invalid.
              </small>
            )}
          </article>
        </div>
      </main>
    </div>
  );
}
