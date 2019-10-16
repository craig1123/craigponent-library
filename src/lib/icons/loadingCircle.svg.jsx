import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function LoadingCircle({ fillColor, ...rest }) {
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
        <g>
          <path
            fill="none"
            stroke={fillColor}
            strokeMiterlimit="10"
            d="M1.9596902,16.5002346 C1.3430252,15.1265316,1,13.6033249,1,12C1,5.9248676,5.9248676,1,12,1s11,4.9248676,11,11s-4.9248676,11-11,11 c-2.6506577,0-5.0823407-0.937542-6.9815297-2.4991035"
          />
        </g>
      </g>
    </svg>
  );
}

LoadingCircle.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

LoadingCircle.defaultProps = {
  fillColor: '#2F3337',
  height: '24px',
  width: '24px',
};

export default LoadingCircle;
