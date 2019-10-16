import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function User({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        fill={fillColor}
        stroke={fillColor}
      >
        <path
          fill="none"
          strokeMiterlimit="10"
          d="M1,23 c0-5.523,4.477-10,10-10h2c5.523,0,10,4.477,10,10"
        />
        <circle
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          cx="12"
          cy="7"
          r="6"
        />
      </g>
    </svg>
  );
}

User.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

User.defaultProps = {
  fillColor: '#17181a',
  height: 24,
  width: 24,
};

export default User;
