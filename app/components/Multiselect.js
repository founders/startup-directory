import React from 'react';
import Tags from './Tags';
import styles from '../styles/Multiselect.module.css';

const Multiselect = ({ tags, onChange }) => {
  const [selected, setSelected] = React.useState([]);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    onChange?.({ selected, query });
  }, [selected, query]);

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
      case 'Backspace':
        if (!query) {
          newSelected.pop();
          setSelected(newSelected);
        }
        break;
      case 'Enter':
        const newSelection = getFilteredTags(tags)[0];
        console.log(selected, newSelection);
        if (newSelection && selected.indexOf(newSelected) === -1) {
          newSelected.push(newSelection);
          setSelected(newSelected);
          setQuery('');
        }
        break;
      case 'ArrowDown':
        document
          .getElementById('tag-option-' + getFilteredTags(tags)[0])
          .focus();
        break;
    }
  };

  const getFilteredTags = (tags) =>
    tags?.filter((tag) => tag.toLowerCase().includes(query.toLowerCase())) ??
    [];

  return (
    <div className={styles.multiselectWrapper}>
      <div className={styles.tagsInput}>
        <Tags tags={selected} onClick={handleTagClick} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e?.target?.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <ul className={styles.dropdown}>
        {getFilteredTags(tags).length > 0 ? (
          getFilteredTags(tags).map((tag) => (
            <li
              key={'tag-option-' + tag}
              id={'tag-option-' + tag}
              onClick={() => {
                setSelected([...new Set([...selected, tag])]);
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
  );
};

export default Multiselect;
