import Head from "next/head";
import styles from "../styles/Home.module.css";

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

        <p className={styles.description}>Or where it should be 🥴</p>

        <h2>Example of an environment variable:</h2>

        <p className={styles.description}>
          API_URL:{" "}
          <code className={styles.code}>
            {process.env.NEXT_PUBLIC_API_URL ?? (
              <span style={{ color: "red" }}>NOT_FOUND</span>
            )}
          </code>
        </p>
      </main>
    </div>
  );
}
