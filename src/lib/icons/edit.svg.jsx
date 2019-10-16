import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function Edit({ fillColor, ...rest }) {
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
          x1="2"
          y1="23"
          x2="22"
          y2="23"
          fill="none"
          strokeMiterlimit="10"
        />
        <polygon
          points="8 18 3 19 4 14 16 2 20 6 8 18"
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
        />
      </g>
    </svg>
  );
}

Edit.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Edit.defaultProps = {
  fillColor: '#17181a',
  height: 24,
  width: 24,
};

export default Edit;
