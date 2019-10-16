import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function Warning({ fillColor, ...rest }) {
  return (
    <svg className="warning-svg" viewBox="0 0 64 64" {...rest}>
      <g
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
        transform="translate(0.5 0.5)"
        fill={fillColor}
        stroke={fillColor}
      >
        <polygon
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          points="4,60 32,8 60,60 "
        />
        <line
          fill="none"
          strokeMiterlimit="10"
          x1="32"
          y1="28"
          x2="32"
          y2="43"
        />
        <circle fill="none" strokeMiterlimit="10" cx="32" cy="50" r="1" />
        <circle
          cx="32"
          cy="50"
          r="1"
          strokeLinejoin="miter"
          strokeLinecap="square"
          stroke="none"
        />
      </g>
    </svg>
  );
}

Warning.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Warning.defaultProps = {
  fillColor: '#389BFF',
  height: '50px',
  width: '50px',
};

export default Warning;
