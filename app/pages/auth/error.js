import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function About() {
  const router = useRouter();

  React.useEffect(() => {
    if (router.query.state) {
      delete router.query.state;
      router.push(router);
    }
  }, [router.query]);
  return (
    <Layout title="ERROR">
      <p>
        This account is not registered. Please use the correct email or reach
        out to Founders for access.
      </p>
    </Layout>
  );
}
