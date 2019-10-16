import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function Withdraw({ fillColor, ...rest }) {
  return (
    <svg {...rest} viewBox="0 0 16 16" className="withdraw-svg">
      <g strokeWidth="1.3" fill={fillColor} stroke={fillColor}>
        <line
          fill="none"
          stroke={fillColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="8.5"
          y1="11.5"
          x2="8.5"
          y2="0.5"
        />
        <polyline
          fill="none"
          stroke={fillColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          points="13.5,5.5 8.5,0.5 3.5,5.5 "
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

Withdraw.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Withdraw.defaultProps = {
  fillColor: '#2f3337',
  height: '15px',
  width: '15px',
};

export default Withdraw;
