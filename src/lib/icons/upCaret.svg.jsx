import React from 'react';
import { string, oneOfType, number, shape } from 'prop-types';
import DownCaret from './downCaret.svg';

function UpCaret({ style, ...rest }) {
  const rotate = { transform: 'rotate(180deg)', ...style };
  return <DownCaret style={rotate} {...rest} />;
}

UpCaret.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  style: shape({}),
  width: oneOfType([string, number]),
};

UpCaret.defaultProps = {
  fillColor: '#8a8f9c',
  height: '14',
  style: {},
  width: '14',
};

export default UpCaret;
