/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './badge.module.scss';

const Badge = props => {
  const { children, className, noBackground, type, ...rest } = props;

  if (!children) {
    return '';
  }

  const noBackgroundClass = noBackground ? styles['no-background'] : '';
  const badgeClassName = `${styles.badge} ${
    styles[`badge-${type}`]
  } ${noBackgroundClass} ${className}`.trim();

  return (
    <span className={badgeClassName} {...rest}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** Will render the badge will just the text color with no background color */
  noBackground: PropTypes.bool,
  type: PropTypes.oneOf([
    'primary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ]),
};

Badge.defaultProps = {
  children: null,
  className: '',
  noBackground: false,
  type: 'primary',
};

export default Badge;
