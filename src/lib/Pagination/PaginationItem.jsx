import React from 'react';
import PropTypes from 'prop-types';

import styles from './pagination.module.scss';

const PaginationItem = props => {
  const { active, disabled, ...attributes } = props;
  const activeClass = active ? styles.active : '';
  const disabledClass = disabled ? styles.disabled : '';
  const classes = `${styles['page-item']} ${activeClass} ${disabledClass}`;
  return <li {...attributes} className={classes} />;
};

PaginationItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

PaginationItem.defaultProps = {
  active: false,
  disabled: false,
};

export default PaginationItem;
