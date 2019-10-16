import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function Lock({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 10 12.5" {...rest}>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        fill={fillColor}
        stroke={fillColor}
      >
        <rect
          x="1"
          y="6"
          fill="none"
          strokeMiterlimit="10"
          width="8"
          height="5"
        />
        <path
          fill="none"
          strokeMiterlimit="10"
          d="M3,6v-3 c0-1.1,0.9-2,2-2l0,0c1.1,0,2,0.9,2,2v3"
        />
      </g>
    </svg>
  );
}

Lock.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Lock.defaultProps = {
  fillColor: '#2f3337',
  height: 24,
  width: 24,
};

export default Lock;
