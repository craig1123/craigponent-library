import React from 'react';
import { string, oneOfType, number } from 'prop-types';

const Phone = ({ fillColor, strokewidth, ...rest }) => (
  <svg viewBox="0 0 16 16" width="16" height="16" {...rest}>
    <g strokeWidth={strokewidth} fill={fillColor} stroke={fillColor}>
      <path
        fill="none"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M12,10l-2,2L4,6l2-2 L3,1L1,3c0,6.627,5.373,12,12,12l2-2L12,10z"
      />
    </g>
  </svg>
);

Phone.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  strokewidth: string,
  width: oneOfType([string, number]),
};

Phone.defaultProps = {
  fillColor: '#389BFF',
  height: '24px',
  strokewidth: '1px',
  width: '24px',
};

export default Phone;
