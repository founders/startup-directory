import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Form from './form.js'
import "bootstrap/dist/css/bootstrap.css";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the
          <br />
          <a href={undefined}>Startup Directory</a>
        </h1>
        <Form onSubmit={values => alert(JSON.stringify(values))} />
        <p className={styles.description}>Or where it should be 🥴</p>
      </main>
    </div>
  );
}
//<Form onSubmit={values => alert(JSON.stringify(values))} />
