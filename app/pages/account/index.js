import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Account.module.css';
import Skeleton from 'react-loading-skeleton';
import { useUser } from '@auth0/nextjs-auth0';
import AccountContext from '../../utils/AccountContext';
import Form from '../../components/Form';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Onboarding from '../../components/accounts/Onboarding';
import Layout from '../../components/Layout';

function Account() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { user } = useUser();

  const router = useRouter();

  const { account } = React.useContext(AccountContext);

  if (!isLoading && !account) {
    router.push('/');
    return null;
  }

  const handleFormSubmit = async (submission) => {
    const { formData: data } = submission;
    const res = await fetch('/api/accounts/org', {
      method: 'PATCH',
      body: JSON.stringify({ ...data, email: account.email }),
    });
    const json = await res.json();
    setIsLoading(false);
  };

  let content = (
    <>
      <Form onSubmit={handleFormSubmit} account={account} />
    </>
  );
  // show actions for accounts with no associated organizations
  if (!account?.orgId) {
    content = <Onboarding user={user} />;
  }

  if (account) {
    return (
      <Layout
        title={!account?.orgId ? 'Account' : 'Edit Your Profile'}
        hideFooter
      >
        {content}
      </Layout>
    );
  }
  return null;
}

export default withPageAuthRequired(Account);
