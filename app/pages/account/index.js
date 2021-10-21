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

import emailjs from 'emailjs-com';


function Account() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { user } = useUser();

  const router = useRouter();

  const { account } = React.useContext(AccountContext);

  if (!isLoading && !account) {
    router.push('/');
    return null;
  }

  const formatMessage = (data) => {
    // Edit this method to make a new string that is more readable containing changes made to the data.
    return JSON.parse(JSON.stringify(data));
  }

  const handleFormSubmit = async (submission) => {
    const { formData: data } = submission;
    const res = await fetch('/api/accounts/org', {
      method: 'PATCH',
      body: JSON.stringify({ ...data, email: account.email }),
    });
    const json = await res.json();
    //Notify founders of change
    var obj = formatMessage(data);
    var name = "NAME: " + obj.name;
    var description = "DESCRIPTION: " + obj.description;
    var founded_date = "FOUNDED DATE: " + obj.founded;
    var category = "CATEGORY: " + obj.categories;
    var stage = "STAGE: " + obj.stage;
    var size = "SIZE: " + obj.size;
    var biography = "BIOGRAPHY: " + obj.biography;
    var is_hiring = "HIRING: " + obj.isHiring;


    console.log(name);
    console.log(description);
    console.log(founded_date);
    console.log(category);
    console.log(stage);
    console.log(size);
    console.log(biography);
    console.log(is_hiring);
    emailjs.send('service_2cqk6gm', 'template_6z1qve1', {'name': name, 'description': description, 'founded_date': founded_date, 'category': category, 'stage': stage, 'size': size, 'biography': biography, 'is_hiring': is_hiring}, 'user_4ilUAq4zJ8J7iYZTlGs2l');
    console.log(json);
    // sendEmail({
    //   text: data,  
    // });
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
