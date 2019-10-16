import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function MenuIcon({ fillColor, ...rest }) {
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
          x1="1"
          y1="12"
          x2="23"
          y2="12"
        />
        <line
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          x1="1"
          y1="5"
          x2="23"
          y2="5"
        />
        <line
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          x1="1"
          y1="19"
          x2="23"
          y2="19"
        />
      </g>
    </svg>
  );
}

MenuIcon.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

MenuIcon.defaultProps = {
  fillColor: '#FFFFFF',
  height: '20px',
  width: '20px',
};

export default MenuIcon;
