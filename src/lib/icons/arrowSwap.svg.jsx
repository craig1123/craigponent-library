import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function ArrowSwap({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        transform="translate(0.5 0.5)"
        fill={fillColor}
        stroke={fillColor}
      >
        <line
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          x1="7"
          y1="17"
          x2="7"
          y2="2"
        />
        <polyline
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          points="3,6 7,2 11,6 "
        />
        <line
          fill="none"
          strokeMiterlimit="10"
          x1="17"
          y1="6"
          x2="17"
          y2="22"
        />
        <polyline
          fill="none"
          strokeMiterlimit="10"
          points=" 13,18 17,22 21,18 "
        />
      </g>
    </svg>
  );
}

ArrowSwap.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

ArrowSwap.defaultProps = {
  fillColor: '#2F3337',
  height: '24px',
  width: '24px',
};

export default ArrowSwap;
