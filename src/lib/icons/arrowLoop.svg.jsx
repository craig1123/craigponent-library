import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function ArrowLoop({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        transform="translate(0.5 0.5)"
        fill={fillColor}
        stroke={fillColor}
      >
        <polyline
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          points="22,6 2,6 2,12 "
        />
        <polyline
          fill="none"
          strokeMiterlimit="10"
          points="2,18 22,18 22,12 "
        />
        <polyline
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          points="18,10 22,6 18,2 "
        />
        <polyline fill="none" strokeMiterlimit="10" points=" 6,14 2,18 6,22 " />
      </g>
    </svg>
  );
}

ArrowLoop.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

ArrowLoop.defaultProps = {
  fillColor: '#2F3337',
  height: '24px',
  width: '24px',
};

export default ArrowLoop;
