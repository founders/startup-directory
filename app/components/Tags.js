import React from 'react';

/**
 * List of tags displayed horizontally
 *
 * @param {{
 *  tags: Array<String>,
 *  style: Object,
 *  tagStyle: Object,
 *  fadeRight: boolean,
 *  onClick: (e: Event) => void
 * }} props
 * @returns {React.Component}
 */
const Tags = React.forwardRef(
  ({ tags, onClick, style, tagStyle, fadeRight, showDelete }, ref) => {
    return (
      <ul
        style={{
          padding: 0,
          listStyle: 'none',
          margin: 0,
          ...style,
        }}
        ref={ref}
      >
        {tags.map((tag, idx) => (
          <li
            style={{
              display: 'inline-flex',
              padding: '0 5px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 500,
              fontFamily: '"Work Sans", sans-serif',
              backgroundColor: 'rgba(255, 151, 00, 0.12)',
              color: '#f89620',
              marginRight: idx !== tags.length - 1 ? '4px' : 0,
              height: '18px',
              alignItems: 'center',
              justifyContent: 'center',
              ...(onClick ? { cursor: 'pointer' } : {}),
              ...tagStyle,
            }}
            key={'tag-list-tag-' + tag}
            onClick={() => onClick?.(tag)}
          >
            {tag}
            {showDelete && (
              <span
                style={{
                  width: '1em',
                  height: '1em',
                  borderRadius: '50%',
                  marginLeft: '0.5em',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: tagStyle.color ?? '#f89620',
                  color:
                    tagStyle.backgroundColor ??
                    tagStyle.background ??
                    'rgb(255, 243, 224)',
                }}
              >
                &times;
              </span>
            )}
          </li>
        ))}
        {fadeRight && (
          <div
            style={{
              width: '20px',
              height: '100%',
              background:
                'linear-gradient(90deg, rgba(255,255,255,0) 0%, #fafafa 100%)',
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          />
        )}
      </ul>
    );
  },
);

export default Tags;
