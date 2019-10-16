import React from 'react';
import PropTypes from 'prop-types';

import styles from './pagination.module.scss';

const PaginationLink = props => {
  const { className, next, previous, ...attributes } = props;
  let { children } = props;

  const classes = `${styles['page-link']} ${className}`.trim();

  let defaultAriaLabel;
  if (previous) {
    defaultAriaLabel = 'Previous';
    children = (
      <span className={styles.caret} aria-hidden="true" key="caret">
        {'\u2039'}
      </span>
    );
  } else if (next) {
    defaultAriaLabel = 'Next';
    children = (
      <span className={styles.caret} aria-hidden="true" key="caret">
        {'\u203A'}
      </span>
    );
  }

  return (
    <button
      type="button"
      {...attributes}
      className={classes}
      aria-label={defaultAriaLabel}
    >
      {children}
    </button>
  );
};

PaginationLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  next: PropTypes.bool,
  previous: PropTypes.bool,
};

PaginationLink.defaultProps = {
  children: null,
  className: '',
  next: false,
  previous: false,
};

export default PaginationLink;
