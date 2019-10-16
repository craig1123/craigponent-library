import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function Copy({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
        fill={fillColor}
        stroke={fillColor}
      >
        <polyline
          fill="none"
          strokeMiterlimit="10"
          points=" 16,8 22,8 22,22 8,22 8,16 "
        />
        <rect
          x="2"
          y="2"
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          width="14"
          height="14"
        />
      </g>
    </svg>
  );
}

Copy.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Copy.defaultProps = {
  fillColor: '#17181a',
  height: 24,
  width: 24,
};

export default Copy;
