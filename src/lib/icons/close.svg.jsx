import React from 'react';
import { string, oneOfType, number, bool } from 'prop-types';

function Close({ circle, secondaryColor, fillColor, ...rest }) {
  const offset = circle ? 2 : 0;
  return (
    <svg viewBox={circle ? '0 0 28 28' : '0 0 24 24'} {...rest}>
      <g
        strokeWidth="2"
        fill={secondaryColor}
        stroke={fillColor}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {circle && (
          <circle fill={secondaryColor} r={28 / 2} cx="50%" cy="50%" />
        )}
        <line
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          x1={19 + offset}
          y1={5 + offset}
          x2={5 + offset}
          y2={19 + offset}
        />
        <line
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          x1={19 + offset}
          y1={19 + offset}
          x2={5 + offset}
          y2={5 + offset}
        />
      </g>
    </svg>
  );
}

Close.propTypes = {
  secondaryColor: string,
  fillColor: string,
  circle: bool,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Close.defaultProps = {
  secondaryColor: '#000',
  fillColor: '#000',
  height: 16,
  width: 16,
  circle: false,
};

export default Close;
