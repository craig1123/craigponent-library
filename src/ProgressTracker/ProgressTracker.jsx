import React from 'react';
import PropTypes from 'prop-types';
import styles from './progressTracker.module.scss';

const empty = {};

const ProgressTracker = ({
  activeIndex,
  className,
  color,
  items,
  selectIndex,
  vertical,
  ...rest
}) => {
  const verticalClass = vertical ? ` ${styles.vertical}` : '';
  return (
    <ul
      className={`${
        styles['progress-tracker-wrapper']
      }${verticalClass} ${className}`.trim()}
      {...rest}
    >
      {items.map((content, i) => {
        const alreadyPassed = activeIndex >= i + 1;
        const divAttributes = alreadyPassed
          ? {
            onClick: () => selectIndex(i), // eslint-disable-line
            onKeyPress: () => selectIndex(i), // eslint-disable-line
              role: 'button',
              tabIndex: 0,
          } // eslint-disable-line
          : empty;
        const circleNumber = (
          <div
            {...divAttributes}
            style={
              activeIndex >= i
                ? {
                    color: '#fff',
                    border: `2px solid ${color}`,
                    cursor: 'pointer',
                    backgroundColor: color,
                } // eslint-disable-line
                : { color: '#8a8f9c', border: '1px solid #8a8f9c' }
            }
            className={`${styles['circle-number']}${verticalClass}`}
          >
            {i + 1}
          </div>
        );
        return (
          <li
            className={`${styles['progress-step']}${verticalClass}`}
            key={i} // eslint-disable-line
          >
            {vertical ? (
              <>
                {circleNumber}
                {content && (
                  <div className={`${styles.word}${verticalClass}`}>
                    {content}
                  </div>
                )}
              </>
            ) : (
              <>
                {content && <div className={styles.word}>{content}</div>}
                {circleNumber}
              </>
            )}
            {i < items.length - 1 && (
              <div
                style={activeIndex >= i ? { backgroundColor: color } : empty}
                className={`${styles.line}${verticalClass}`}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

ProgressTracker.propTypes = {
  activeIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.number]),
  ).isRequired,
  selectIndex: PropTypes.func,
  vertical: PropTypes.bool,
};

ProgressTracker.defaultProps = {
  className: '',
  color: '#00ce7d',
  selectIndex: () => {},
  vertical: false,
};

export default ProgressTracker;
