import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const ERROR_TYPE = Object.freeze({
  blocked: 'Account Blocked',
});

export default function About() {
  const router = useRouter();

  React.useEffect(() => {
    if (router.query.state) {
      delete router.query.state;
      router.query.type = 'blocked';
      router.push(router);
    } else if (!router.query.type) {
      router.push('/');
    }
  }, [router.query]);

  return (
    <Layout title={`ERROR | ${ERROR_TYPE[router.query.type] ?? 'Unknown'}`}>
      <p>
        This account is not registered. Please use the correct email or reach
        out to Founders for access.
      </p>
      <p>
        To register your email with us, fill out <a href="https://forms.gle/i9mPTqByaueSQi1KA">this</a> whitelist form.
      </p>
    </Layout>
  );
}
