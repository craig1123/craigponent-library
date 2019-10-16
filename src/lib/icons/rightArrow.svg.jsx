import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function RightArrow({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 32 32" {...rest}>
      <g fill="none" stroke={fillColor} strokeMiterlimit="10" strokeWidth="3">
        <path d="M2 16L30 16" />
        <path strokeLinecap="square" d="M21 7L30 16 21 25" />
      </g>
    </svg>
  );
}

RightArrow.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

RightArrow.defaultProps = {
  fillColor: '#2F3337',
  height: '18px',
  width: '35px',
};

export default RightArrow;
