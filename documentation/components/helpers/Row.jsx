import React from 'react';
import PropTypes from 'prop-types';

const style = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  width: '100%',
};

const Row = ({ children }) => <div style={style}>{children}</div>;

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Row;
