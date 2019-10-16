import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function UpArrow({ fillColor, ...rest }) {
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
          strokeMiterlimit="10"
          x1="12"
          y1="22"
          x2="12"
          y2="2"
        />
        <polyline
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          points="5,9 12,2 19,9 "
        />
      </g>
    </svg>
  );
}

UpArrow.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

UpArrow.defaultProps = {
  fillColor: '#2F3337',
  height: '24px',
  width: '24px',
};

export default UpArrow;
