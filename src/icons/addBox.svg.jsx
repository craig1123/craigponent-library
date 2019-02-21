import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function AddBoxSvg({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        fill={fillColor}
        stroke={fillColor}
      >
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
        />
        <line
          x1="12"
          y1="7"
          x2="12"
          y2="17"
          fill="none"
          strokeMiterlimit="10"
        />
        <line
          x1="17"
          y1="12"
          x2="7"
          y2="12"
          fill="none"
          strokeMiterlimit="10"
        />
      </g>
    </svg>
  );
}

AddBoxSvg.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

AddBoxSvg.defaultProps = {
  fillColor: '#17181a',
  height: 24,
  width: 24,
};

export default AddBoxSvg;
