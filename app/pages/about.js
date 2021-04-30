import React from 'react';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/Layout';

function About({ content }) {
  return (
    <Layout title="About">
      <span className="markdown">
        <ReactMarkdown children={content} />
      </span>
    </Layout>
  );
}

About.getInitialProps = async () => {
  const { default: file } = await import(`../content/about.md`);
  const { content } = matter(file);
  return { content };
};

export default About;
