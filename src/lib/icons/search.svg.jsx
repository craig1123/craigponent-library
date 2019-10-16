import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function Search({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
        fill={fillColor}
        stroke={fillColor}
      >
        <line
          x1="22"
          y1="22"
          x2="15.656"
          y2="15.656"
          fill="none"
          strokeMiterlimit="10"
        />
        <circle
          cx="10"
          cy="10"
          r="8"
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
        />
      </g>
    </svg>
  );
}

Search.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Search.defaultProps = {
  fillColor: '#333333',
  height: '24px',
  width: '24px',
};

export default Search;
