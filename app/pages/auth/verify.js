import React from 'react';
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import AccountContext from '../../utils/AccountContext';

const VERIFICATION_STATE = Object.freeze({
  LOADING: 'LOADING',
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS',
});
function Verify() {
  const [isComplete, setIsComplete] = React.useState(
    VERIFICATION_STATE.LOADING,
  );
  const [account, setAccount] = React.useState(undefined);

  const { setAccount: setAccountContext } = React.useContext(AccountContext);

  React.useEffect(() => {
    if (account !== undefined) {
      setAccountContext?.(account);
    }
  }, [account]);

  const router = useRouter();
  const { user } = useUser();

  React.useEffect(() => {
    (async function () {
      const response = await fetch('/api/accounts/', {
        method: 'POST',
        body: JSON.stringify({ email: user.email }),
      });
      const json = await response.json();
      setAccount(json.data);
      setIsComplete(VERIFICATION_STATE[json.success ? 'SUCCESS' : 'FAILED']);
    })();
  }, [user]);

  switch (isComplete) {
    case VERIFICATION_STATE.SUCCESS:
      router.push(account.isAdmin ? '/' : '/account');
      return null;
    case VERIFICATION_STATE.FAILED:
      return <>Verification Failed. Try Again.</>;
    default:
      return null;
  }
}

export default withPageAuthRequired(Verify);
