import React from 'react';
import Layout from '../components/Layout';

export default function Login() {
  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          flexDirection: 'column',
          maxWidth: '600px',
          height: '300px',
          margin: '0 auto',
        }}
      >
        <a
          href="#"
          style={{
            padding: '1em 2em',
            display: 'block',
            backgroundColor: 'orangered',
            color: 'white',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          Login
        </a>
        <br />
        <a
          href="#"
          style={{
            padding: '1em 2em',
            display: 'block',
            backgroundColor: 'blue',
            color: 'white',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          Logout
        </a>
      </div>
    </Layout>
  );
}
