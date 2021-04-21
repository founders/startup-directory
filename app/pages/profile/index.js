import React from 'react';
import Form from '../../components/Form';
import Layout from '../../components/Layout';
import styles from '../../styles/Form.module.css';
//import Glyphicon from 'react-bootstrap/lib/Glyphicon';


export default function Profile(){
    return (
      <Layout title="Edit your startup's profile">
      <p className={styles.desc}>
        Please Use this Form to add your startup to the Directory!
      </p>
      <div className={styles.center}> 
      <Form onSubmit={FormData => alert(JSON.stringify(FormData))} />
      </div>
    </Layout>
    );
    
}