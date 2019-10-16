import React from 'react';
import { string, number, oneOfType } from 'prop-types';

function Clock({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g
        strokeLinecap="square"
        strokeWidth="2"
        fill="none"
        stroke={fillColor}
        strokeMiterlimit="10"
      >
        <circle cx="12" cy="12" r="11" />
        <polyline points="12,6 12,12 18,12" />
      </g>
    </svg>
  );
}
Clock.propTypes = {
  className: string,
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Clock.defaultProps = {
  className: '',
  fillColor: '#8a8f9c',
  height: 24,
  width: 24,
};

export default Clock;
