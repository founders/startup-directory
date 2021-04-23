import React from 'react';
import styles from '../styles/JobCard.module.css';
import Skeleton from 'react-loading-skeleton';

const FAKE_JOB = {
  title: 'Software Engineer Intern',
  description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi quos
    pariatur in voluptatem quia earum exercitationem distinctio inventore
    facere? Ipsam quisquam voluptatibus quaerat optio quae nisi incidunt quasi
    facere tempora.`,
  skills: ['JavaScript', 'Firebase', ' Angular', 'SQL'],
  link: '#',
};

export default function JobCard({ job }) {
  const { title, description, skills, link } = FAKE_JOB;

  return (
    <details className={`card ${styles.jobDetails}`}>
      <p>{description}</p>
      {skills && (
        <ul className={styles.skillList}>
          <li>Skills: </li>
          {skills.map((skill, idx) => (
            <li key={skill + idx}>
              {skill}
              {idx !== skills.length - 1 && ', '}
            </li>
          ))}
        </ul>
      )}
      <a href={link} className={styles.button}>
        Apply
      </a>
      <summary className={styles.jobSummary}>
        <h3>{title}</h3>
      </summary>
    </details>
  );
}
