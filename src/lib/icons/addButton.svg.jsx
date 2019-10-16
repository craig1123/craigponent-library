import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function AddButton({ fillColor, ...rest }) {
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
          fill="none"
          strokeMiterlimit="10"
          x1="12"
          y1="7"
          x2="12"
          y2="17"
        />
        <line
          fill="none"
          strokeMiterlimit="10"
          x1="17"
          y1="12"
          x2="7"
          y2="12"
        />
        <circle
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          cx="12"
          cy="12"
          r="11"
        />
      </g>
    </svg>
  );
}

AddButton.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

AddButton.defaultProps = {
  fillColor: '#389BFF',
  height: '24px',
  width: '24px',
};

export default AddButton;
