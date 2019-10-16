import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function Wallet({ fillColor, ...rest }) {
  return (
    <svg {...rest} viewBox="0 0 24 24">
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
          d="M21,12V5H3 C1.895,5,1,4.105,1,3v17c0,1.657,1.343,3,3,3h17v-7"
        />
        <path
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          d="M17,2V1H3 C1.895,1,1,1.895,1,3v0c0,1.105,0.895,2,2,2"
        />
        <path
          fill="none"
          strokeMiterlimit="10"
          d="M23,16h-5 c-1.105,0-2-0.895-2-2l0,0c0-1.105,0.895-2,2-2h5V16z"
        />
      </g>
    </svg>
  );
}

Wallet.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Wallet.defaultProps = {
  fillColor: '#333333',
  height: '24px',
  width: '24px',
};

export default Wallet;
