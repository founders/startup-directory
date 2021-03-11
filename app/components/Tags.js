import React from 'react';

export default function Tags({ tags, onClick }) {
  return (
    <ul
      style={{
        padding: 0,
        listStyle: 'none',
        margin: 0,
      }}
    >
      {tags.map((tag) => (
        <li
          style={{
            display: 'inline-flex',
            padding: '0 5px',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: '"Work Sans", sans-serif',
            backgroundColor: 'rgba(255, 151, 00, 0.12)',
            color: '#f89620',
            marginRight: '4px',
            height: '18px',
            alignItems: 'center',
            justifyContent: 'center',
            ...(onClick ? { cursor: 'pointer' } : {}),
          }}
          key={'tag-list-tag-' + tag}
          onClick={() => onClick?.(tag)}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
