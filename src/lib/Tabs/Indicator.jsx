import React from 'react';
import PropTypes from 'prop-types';

import styles from './tabs.module.scss';

const Indicator = ({
  indicatorClass,
  activeTabElement,
  indicatorColor,
  duration,
  ...restProps
}) => {
  const style = {
    backgroundColor: indicatorColor,
    transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
  };

  const classes = `${styles['active-border']} ${indicatorClass}`.trim();

  if (activeTabElement) {
    style.width = activeTabElement.offsetWidth;
    style.left = activeTabElement.offsetLeft;
  }

  return <div className={classes} style={style} {...restProps} />;
};

Indicator.propTypes = {
  indicatorClass: PropTypes.string,
  activeTabElement: PropTypes.object, // eslint-disable-line
  indicatorColor: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};

Indicator.defaultProps = {
  indicatorClass: '',
  activeTabElement: null,
};

export default Indicator;
