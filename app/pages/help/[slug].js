import React from 'react';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

import { useRouter } from 'next/router';

import Link from 'next/link';

import styles from '../../styles/Help.module.css';

import Layout from '../../components/Layout';

function PostPage(props) {
  const router = useRouter();

  if (!props.content) {
    router.push('/help/getting-registered');
    return null;
  }

  return (
    <Layout hideTitle>
      <div className={styles.helpWrapper}>
        <aside>
          <h2>Documentation</h2>
          <ul>
            {(props?.posts ?? [])
              .sort((a, b) => {
                if (a?.frontmatter?.title === 'Getting Registered') return -1;
                return 0;
              })
              .map((p) => (
                <li key={p.slug}>
                  <Link href={`/help/${p.slug}`} exact>
                    <a
                      className={
                        router.asPath === `/help/${p.slug}`
                          ? styles.activeLink
                          : ''
                      }
                    >
                      {p?.frontmatter?.title}
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
          <h2>Contact Us</h2>
          <ul>
            <li key="contact">
                <Link href={'mailto:team@founders.illinois.edu'} exact>
                  Email Founders
                </Link>
            </li>
            <li key="contact">
                <Link href={'https://foundersillinois.org'} exact>
                  Founders Website
                </Link>
            </li>
          </ul>
        </aside>
        <PostTemplate {...props} />
      </div>
    </Layout>
  );
}

function PostTemplate({ content, data }) {
  // This holds the data between `---` from the .md file
  const frontmatter = data;

  return (
    <div>
      <h1>{frontmatter?.title}</h1>
      <span className="markdown">
        <ReactMarkdown children={content} />
      </span>
    </div>
  );
}

PostPage.getInitialProps = async (context) => {
  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);
    const data = keys.map((key, index) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.');
      const value = values[index];
      // Parse yaml metadata & markdownbody in document
      const document = matter(value.default);
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      };
    });
    return data;
  })(require.context('../../content/help/', true, /\.md$/));

  const { slug } = context.query;

  try {
    const content = await import(`../../content/help/${slug}.md`);
    const data = matter(content.default);
    return { ...data, posts };
  } catch (e) {
    return { posts };
  }
};

export default PostPage;
