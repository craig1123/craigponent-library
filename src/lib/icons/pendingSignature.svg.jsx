import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function PendingSignature({ fillColor, ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        fill={fillColor}
        stroke={fillColor}
      >
        <path
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          d="M10,13 c-2.824,0-5.329,0.638-6.975,1.193C1.81,14.604,1,15.749,1,17.032V21c0,0,7.958,0,8,0"
        />
        <path
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          d="M10,13L10,13 c-2.761,0-5-3.239-5-6V6c0-2.761,2.239-5,5-5h0c2.761,0,5,2.239,5,5v1C15,9.761,12.761,13,10,13z"
        />
        <polyline
          fill="none"
          strokeMiterlimit="10"
          points="18,16 18,18 20,18"
        />
        <circle fill="none" strokeMiterlimit="10" cx="18" cy="18" r="5" />
      </g>
    </svg>
  );
}

PendingSignature.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

PendingSignature.defaultProps = {
  fillColor: '#2f3337',
  height: 24,
  width: 24,
};

export default PendingSignature;
