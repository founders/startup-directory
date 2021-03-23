import React from 'react';
import Form from '../../components/Form';
import Layout from '../../components/Layout';
import styles from '../../styles/Form.module.css';


export default function Home(){
    return (
    <Layout title="Create Post">
      <p className={styles.desc}>
        Please Use this Form to add your startup to the Directory!
      </p>
      <Form onSubmit={FormData => alert(JSON.stringify(FormData))} />
    </Layout>
    );
    
}