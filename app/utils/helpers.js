import React from 'react';
import dbConnect from '../middleware/dbConnect';

/**
 * returns JSX for highlighting query within a string
 * @param {*} str
 * @param {*} query
 * @returns
 */
export function highlight(str, query) {
  if (!query) return str;
  const re = new RegExp(query.toLowerCase(), 'gi');
  const occurrences = [...str.toLowerCase().matchAll(re)].map((a) => a.index);

  let tokens = [];

  let lastIdx = 0;
  for (const i of occurrences) {
    tokens.push(str.slice(lastIdx, i));
    lastIdx = i;
  }

  const isTrailing =
    occurrences[occurrences.length - 1] + query.length == str.length;
  return (
    <>
      {tokens.map((token, idx) => (
        <>
          <>{token}</>
          <span style={{ backgroundColor: '#a6cfff' }}>{query}</span>
        </>
      ))}
    </>
  );
}

/**
 * validates given string for an email
 * @param {string} email
 * @returns
 */
export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
