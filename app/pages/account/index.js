import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Account.module.css';
import Skeleton from 'react-loading-skeleton';
import { useUser } from '@auth0/nextjs-auth0';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Onboarding from '../../components/accounts/Onboarding';
import Layout from '../../components/Layout';

function Account() {
  const [account, setAccount] = React.useState(undefined);
  const [isLoading, setIsLoading] = React.useState(true);
  const { user } = useUser();

  React.useEffect(() => {
    setAccount({ ordID: false });
  }, [user]);

  if (!isLoading && !account) {
    router.push('/');
    return null;
  }

  let content = <>test</>;

  // show actions for accounts with no associated organizations
  if (!account?.orgId) {
    content = <Onboarding user={user} />;
  }

  return (
    <Layout
      title={!account?.orgId ? 'Account' : 'Edit Your Profile'}
      hideFooter
    >
      {content}
    </Layout>
  );
}

export default withPageAuthRequired(Account);
