import React from 'react';
import PropTypes from 'prop-types';

const Box = ({ children, minHeight, style }) => (
  <div style={{ minHeight, ...style }}>{children}</div>
);

Box.propTypes = {
  children: PropTypes.node.isRequired,
  minHeight: PropTypes.number,
  style: PropTypes.shape({}),
};

Box.defaultProps = {
  minHeight: 200,
  style: {},
};

export default Box;
