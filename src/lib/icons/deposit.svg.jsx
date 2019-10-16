import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function Deposit({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 16 16" className="deposit-svg" {...rest}>
      <g strokeWidth="1.3" fill={fillColor} stroke={fillColor}>
        <line
          fill="none"
          stroke={fillColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="8.5"
          y1="0.5"
          x2="8.5"
          y2="11.5"
        />
        <polyline
          fill="none"
          stroke={fillColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          points="13.5,6.5 8.5,11.5 3.5,6.5 "
        />
        <line
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="15.5"
          y1="15.5"
          x2="1.5"
          y2="15.5"
        />
      </g>
    </svg>
  );
}

Deposit.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Deposit.defaultProps = {
  fillColor: '#2f3337',
  height: '15px',
  width: '15px',
};

export default Deposit;
