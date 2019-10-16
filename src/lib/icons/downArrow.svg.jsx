import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function DownArrow({ fillColor, ...rest }) {
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
          y1="2"
          x2="12"
          y2="22"
        />
        <polyline
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          points="19,15 12,22 5,15 "
        />
      </g>
    </svg>
  );
}

DownArrow.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

DownArrow.defaultProps = {
  fillColor: '#2F3337',
  height: '24px',
  width: '24px',
};

export default DownArrow;
