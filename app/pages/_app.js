import '../styles/globals.css';
import '../styles/tagify.css';

import React from 'react';
import { UserProvider, useUser } from '@auth0/nextjs-auth0';
import AccountContext from '../utils/AccountContext';

const { Provider: AccountProvider } = AccountContext;

export default function App({ Component, pageProps }) {
  const [account, setAccount] = React.useState(undefined);

  return (
    <UserProvider>
      <AccountProvider value={{ account, setAccount }}>
        <GetAccount />
        <Component {...pageProps} />
      </AccountProvider>
    </UserProvider>
  );
}

const GetAccount = () => {
  const { user } = useUser();
  const { setAccount, account } = React.useContext(AccountContext);

  React.useEffect(() => {
    (async function () {
      if (!user) return;
      const response = await fetch('/api/accounts/', {
        method: 'POST',
        body: JSON.stringify({ email: user.email }),
      });
      const json = await response.json();
      if (account === undefined) {
        setAccount?.(json.data);
      }
    })();
  }, [user]);

  return null;
};
