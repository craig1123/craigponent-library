import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function CurrencyDollarSVG({ fillColor, ...rest }) {
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
          y1="1"
          x2="12"
          y2="23"
        />
        <path
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          d="M17.375,5 C14.875,3.625,7,2.6,7,7.333C7,13,17,11,17,16s-6.5,4.625-11,3"
        />
      </g>
    </svg>
  );
}

CurrencyDollarSVG.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

CurrencyDollarSVG.defaultProps = {
  fillColor: '#333333',
  height: '24px',
  width: '24px',
};

export default CurrencyDollarSVG;
