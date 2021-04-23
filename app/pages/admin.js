import React from 'react';

import {
  getWhitelist,
  createWhitelist,
  updateWhitelist,
  getAnalytics,
} from '../utils/adminAPI';
import { validateEmail } from '../utils/helpers';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Head from 'next/head';
import Link from 'next/link';
import { container, main } from '../styles/Layout.module.css';
import styles, {
  panel as panelStyle,
  whitelistHeader,
} from '../styles/Admin.module.css';
import AccountContext from '../utils/AccountContext';
import { useRouter } from 'next/router';

const PANEL = {
  ANALYTICS: 'ANALYTICS',
  WHITELIST: 'WHITELIST',
  MANAGE: 'MANAGE',
};

function Admin() {
  const [panel, setPanel] = React.useState(PANEL.WHITELIST);

  const { account } = React.useContext(AccountContext);

  const [userList, setUserList] = React.useState('');
  const [lastUpdated, setLastUpdated] = React.useState(undefined);

  const [analytics, setAnalytics] = React.useState(undefined);

  const [submissionState, setSubmissionState] = React.useState('IDLE');
  // TODO: Add searching for users
  //   const [query, setQuery] = React.useState('');

  const router = useRouter();

  const listToText = (l) => l.join('\n');
  const textToList = (t) => t.split('\n');

  React.useEffect(() => {
    (async () => {
      const res = await getWhitelist();

      if (!res || !res.success) return;

      const {
        data: { data: whitelist, lastUpdated },
      } = res;

      if (whitelist && lastUpdated) {
        setUserList(listToText(whitelist));
        setLastUpdated(lastUpdated);
      }

      const upstreamAnalytics = await getAnalytics();
      if (upstreamAnalytics?.data) {
        setAnalytics(upstreamAnalytics.data);
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

  const contentWhitelist = (
    <article className="card">
      <h2>Manage Whitelist</h2>
      <p>
        Update the whitelist with this virtual text file. Each line must be a
        valid email or blank (these get stripped out) to submit.
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
        <small style={{ color: 'red' }}>&nbsp; &times; Error on submit.</small>
      )}
      {submissionState === 'MALFORMATTED' && (
        <small style={{ color: 'red' }}>
          &nbsp; &times; One or more entry is invalid.
        </small>
      )}
    </article>
  );

  let analyticsContent = (
    <article className="card">
      <h2>Analytics</h2>
      <div style={{ display: 'flex', width: '100%', height: '75%' }}>
        {analytics ? (
          <>
            {Object.keys(analytics).map((key, idx) => (
              <div
                style={{
                  borderLeft: `${idx === 0 ? 'none' : '1px solid #3c3c3c'}`,
                  fontSize: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {analytics[key]}
                <span style={{ fontSize: 14, marginTop: '1em' }}>
                  {key.toUpperCase()}
                </span>
              </div>
            ))}
          </>
        ) : (
          <>Loading...</>
        )}
      </div>
    </article>
  );

  let content;

  switch (panel) {
    case PANEL.ANALYTICS:
      content = <>{analyticsContent}</>;
      break;
    case PANEL.WHITELIST:
      content = <>{contentWhitelist}</>;
      break;
    // case PANEL.MANAGE:
    //   content = <></>;
    //   break;
    default:
      content = (
        <span>
          <div className="card">
            <h2 style={{ color: 'red', margin: 0, opacity: 0.8 }}>
              Error! Could not fetch content.
            </h2>
          </div>
        </span>
      );
  }

  if (!account) {
    return null;
  }

  if (!account.isAdmin) {
    router.push('/');
    return null;
  }

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
        <div className={panelStyle}>
          <aside>
            <Link href="/" exact>
              <a className={`card ${styles.backLink}`}>
                &larr; Back to Directory
              </a>
            </Link>
            <ul className="card">
              <li style={{ cursor: 'default' }}>
                <b>Directory</b>
              </li>
              <li
                className={
                  panel === PANEL.ANALYTICS
                    ? 'active-admin-menu-item'
                    : undefined
                }
                onClick={() => setPanel(PANEL.ANALYTICS)}
              >
                Analytics
              </li>
              <li
                className={
                  panel === PANEL.WHITELIST
                    ? 'active-admin-menu-item'
                    : undefined
                }
                onClick={() => setPanel(PANEL.WHITELIST)}
              >
                Manage Whitelist
              </li>
              <li
                className={
                  panel === PANEL.MANAGE ? 'active-admin-menu-item' : undefined
                }
                onClick={() => setPanel(PANEL.MANAGE)}
              >
                Manage Data
              </li>
              <Link href="/api/auth/logout" exact>
                <li>Logout</li>
              </Link>
            </ul>
          </aside>
          {content}
        </div>
      </main>
    </div>
  );
}

export default withPageAuthRequired(Admin);
