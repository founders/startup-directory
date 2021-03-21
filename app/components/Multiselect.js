import React from 'react';
import Tags from './Tags';
import styles from '../styles/Multiselect.module.css';

/**
 * Multiselect input allowing a user to search through a set of
 * tags and select them.
 *
 * @param {{
 *  tags: Array<String>,
 *  onChange: (args*) => void
 * }} props
 * @returns {React.Component}
 */
const Multiselect = ({ tags, onChange }) => {
  const [selected, setSelected] = React.useState([]); // currently selected tags
  const [query, setQuery] = React.useState(''); // current search query
  const [isOverflowing, setIsOverflowing] = React.useState(false); // is tagList overflowing

  const inputField = React.useRef(null);
  const tagList = React.createRef(null);

  /*
   * Checks for render overflow on received element
   *
   * @param {HTMLElement} el
   * @return {boolean}
   */
  function checkOverflow(el) {
    if (el?.style?.overflow) {
      var curOverflow = el.style.overflow;
      if (!curOverflow || curOverflow === 'visible')
        el.style.overflow = 'hidden';

      var isOverflowing =
        el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

      el.style.overflow = curOverflow;

      return isOverflowing;
    }
    return false;
  }

  // execute callback if available
  React.useEffect(() => {
    onChange?.({ selected, query });
  }, [selected, query]);

  // remove tag from selected on click
  const handleTagClick = (tag) => {
    const idx = selected.indexOf(tag);
    if (idx >= 0) {
      const newSelected = [...selected];
      newSelected.splice(idx, 1);
      setSelected(newSelected);
    }
  };

  const handleKeyDown = (e) => {
    const newSelected = [...selected];
    switch (e.key) {
      /*
       * Pop last tag if query is empty on back
       */
      case 'Backspace':
        if (!query) {
          if (selected.length === 0) {
            inputField?.current?.blur?.();
          } else {
            newSelected.pop();
            setSelected(newSelected);
          }
        }
        break;
      /*
       * Add first result to selected on enter
       * Clears query afterwards
       */
      case 'Enter':
        const newSelection = getFilteredTags(tags)[0];
        if (newSelection && selected.indexOf(newSelection) === -1) {
          newSelected.push(newSelection);
          setSelected(newSelected);
          setQuery('');
        }
        break;
    }
  };

  // update overflow upon mutation of tagList
  React.useEffect(() => {
    setIsOverflowing(checkOverflow(tagList.current));
  }, [tagList.current, selected]);

  // filters tag results for query
  const getFilteredTags = (tags) =>
    tags?.filter((tag) => tag.toLowerCase().includes(query.toLowerCase())) ??
    [];

  return (
    <>
      <div className={styles.multiselectWrapper}>
        <div className={styles.tagsInput}>
          <Tags
            ref={tagList}
            tags={selected}
            onClick={handleTagClick}
            style={{
              flex: '6 0 auto',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              position: 'relative',
              maxWidth: '65%',
            }}
            fadeRight={isOverflowing}
            tagStyle={{ position: 'relative' }}
          />
          <input
            ref={inputField}
            type="text"
            value={query}
            onChange={(e) => setQuery(e?.target?.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <ul className={styles.dropdown}>
          {getFilteredTags(tags).length > 0 ? (
            getFilteredTags(tags).map((tag, idx) => (
              <li
                key={'tag-option-' + tag}
                id={'tag-option-' + tag}
                tabIndex={idx + 1}
                onClick={() => {
                  setSelected([...new Set([...selected, tag])]);
                  inputField.current.focus();
                  setQuery('');
                }}
              >
                {tag}
              </li>
            ))
          ) : (
            <li data-empty-state>No Results</li>
          )}
        </ul>
      </div>
      {selected.length > 0 && (
        <p style={{ marginTop: '0.5em', fontSize: '12px', opacity: 0.6 }}>
          {selected.length} categor{selected.length === 1 ? 'y' : 'ies'}{' '}
          applied.
        </p>
      )}
    </>
  );
};

export default Multiselect;
