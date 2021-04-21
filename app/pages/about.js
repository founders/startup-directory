import React from 'react';

import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout title="About">
      {new Array(3).fill('').map(() => (
        <p>
          {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat vitae
          reiciendis cumque perspiciatis autem, amet officiis corrupti
          recusandae id, debitis, hic unde doloremque quod! Illo iusto unde
          atque tenetur laborum.`.repeat(Math.random() * 3 + 2)}
        </p>
      ))}
    </Layout>
  );
}
