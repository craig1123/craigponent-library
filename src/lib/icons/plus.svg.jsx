import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function Plus({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        fill={fillColor}
        stroke={fillColor}
      >
        <line
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          x1="12"
          y1="2"
          x2="12"
          y2="22"
        />
        <line
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          x1="22"
          y1="12"
          x2="2"
          y2="12"
        />
      </g>
    </svg>
  );
}

Plus.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Plus.defaultProps = {
  fillColor: '#17181a',
  height: '16px',
  width: '16px',
};

export default Plus;
