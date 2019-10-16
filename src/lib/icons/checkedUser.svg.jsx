import React from 'react';
import { number, oneOfType, string } from 'prop-types';

function CheckedUser({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
        fill={fillColor}
        stroke={fillColor}
      >
        <path
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          d="M11,13 c-2.824,0-5.329,0.638-6.975,1.193C2.81,14.604,2,15.749,2,17.032V21h8"
          strokeLinecap="butt"
        />
        <path
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          d="M11,13L11,13 c-2.761,0-5-3.239-5-6V6c0-2.761,2.239-5,5-5h0c2.761,0,5,2.239,5,5v1C16,9.761,13.761,13,11,13z"
        />
        <polyline
          fill="none"
          strokeMiterlimit="10"
          points=" 15,20 17,22 22,17 "
        />
      </g>
    </svg>
  );
}

CheckedUser.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

CheckedUser.defaultProps = {
  fillColor: '#2f3337',
  height: 24,
  width: 24,
};

export default CheckedUser;
