import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function Bank({ fillColor, ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        fill={fillColor}
        stroke={fillColor}
      >
        <polygon
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          points="12,2 1,8 1,11 23,11 23,8 "
        />
        <line fill="none" strokeMiterlimit="10" x1="3" y1="20" x2="3" y2="14" />
        <line fill="none" strokeMiterlimit="10" x1="9" y1="20" x2="9" y2="14" />
        <line
          fill="none"
          strokeMiterlimit="10"
          x1="15"
          y1="20"
          x2="15"
          y2="14"
        />
        <line
          fill="none"
          strokeMiterlimit="10"
          x1="21"
          y1="20"
          x2="21"
          y2="14"
        />
        <line
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          x1="1"
          y1="23"
          x2="23"
          y2="23"
        />
        <circle
          data-stroke="none"
          fill={fillColor}
          cx="12"
          cy="7"
          r="1"
          strokeLinejoin="miter"
          strokeLinecap="square"
          stroke="none"
        />
      </g>
    </svg>
  );
}

Bank.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Bank.defaultProps = {
  fillColor: '#389BFF',
  height: 24,
  width: 24,
};

export default Bank;
