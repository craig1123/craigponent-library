import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function Info({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        fill={fillColor}
        stroke={fillColor}
      >
        <circle
          cx="12"
          cy="12"
          r="11"
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
        />
        <line
          x1="11.959"
          y1="11"
          x2="11.959"
          y2="17"
          fill="none"
          strokeMiterlimit="10"
        />
        <circle data-stroke="none" cx="11.959" cy="7" r="1" stroke="none" />
      </g>
    </svg>
  );
}

Info.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Info.defaultProps = {
  fillColor: '#17181a',
  height: 24,
  width: 24,
};

export default Info;
