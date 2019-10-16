/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

export const StageItem = ({ item, className, styles }) => (
  <li style={styles} className={className}>
    {item}
  </li>
);

StageItem.propTypes = {
  item: PropTypes.node.isRequired,
  className: PropTypes.string,
  styles: PropTypes.object,
};

StageItem.defaultProps = {
  className: 'carousel__stage-item',
  styles: {},
};
