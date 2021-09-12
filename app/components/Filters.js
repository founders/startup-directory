import React from 'react';
import styles from '../styles/Filters.module.css';
import Multiselect from './Multiselect';

import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { DATE_FOUNDED_MIN, DATE_FOUNDED_MAX } from '../utils/constants';

import { CATEGORIES } from '../utils/constants';

/**
 * Filter box containing form components. State is
 * stored in a parent component and edited via callback
 *
 * @param {*} props
 * @returns {React.Component}
 */
const Filters = ({ filters, updateFilters }) => {
  const handleCheck = (e) => {
    updateFilters({ ...filters, isHiring: e?.target?.checked });
  };

  const handleCategoryChange = ({ selected }) => {
    updateFilters({ ...filters, categories: selected });
  };

  const handleDateFilterChange = (newDateFilter) => {
    const [minFoundingDate, maxFoundingDate] = newDateFilter;
    updateFilters({ ...filters, minFoundingDate, maxFoundingDate });
  };

  return (
    <aside className={styles.filterBox}>
      <h3>Filters</h3>
      <Multiselect tags={CATEGORIES} onChange={handleCategoryChange} />
      {/* <p>
        <input
          id="is-hiring"
          type="checkbox"
          checked={filters.isHiring}
          onChange={handleCheck}
        />
        <label htmlFor="is-hiring">Hiring</label>
      </p> */}
      <p>
        <label htmlFor="">
          Founded{' '}
          {filters.minFoundingDate === filters.maxFoundingDate
            ? `in ${filters.minFoundingDate}`
            : `from ${filters.minFoundingDate} to ${filters.maxFoundingDate}`}
        </label>
        <Range
          value={[filters.minFoundingDate, filters.maxFoundingDate]}
          min={DATE_FOUNDED_MIN}
          max={DATE_FOUNDED_MAX}
          step={1}
          count={2}
          marks={new Array(DATE_FOUNDED_MAX - DATE_FOUNDED_MIN + 1)
            .fill(0)
            .map((_, idx) => DATE_FOUNDED_MIN + idx)
            .reduce(
              (acc, mark) => ({
                ...acc,
                [mark]:
                  mark % 2 === 0 ? (
                    <label
                      style={{
                        display: 'block',
                        transform: 'rotate(45deg)',
                        paddingTop: '0.5em',
                        fontWeight: '600',
                      }}
                    >
                      {mark}
                    </label>
                  ) : undefined,
              }),
              {},
            )}
          onChange={handleDateFilterChange}
          style={{
            width: '96%',
            margin: '0.5em auto 1.5em 2%',
          }}
          dotStyle={{
            border: 'none',
            borderTop: '5px solid #C4C4C4',
            borderBottom: '5px solid #C4C4C4',
            width: '4px',
            marginBottom: '-1px',
            borderRadius: '4px',
            backgroundColor: '#C4C4C4',
          }}
          activeDotStyle={{
            backgroundClip: '#F89620',
            borderTop: '5px solid #F89620',
            borderBottom: '5px solid #F89620',
          }}
          railStyle={{
            // backgroundColor: '#C4C4C4',
            borderRadius: 0,
          }}
          trackStyle={Array(1).fill({
            backgroundColor: '#F89620',
          })}
          handleStyle={Array(2).fill({
            backgroundColor: '#C4C4C4',
            height: '0.9em',
            width: '1.1em',
            marginTop: '-0.333em',
            borderRadius: '4px',
            border: 'none',
          })}
        />
      </p>
    </aside>
  );
};

export default Filters;
