import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function PendingUserSVG({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        fill={fillColor}
        stroke={fillColor}
      >
        <path
          data-cap="butt"
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          d="M11,13 c-2.824,0-5.329,0.638-6.975,1.193C2.81,14.604,2,15.749,2,17.032V21c0,0,7.958,0,8,0"
        />
        <rect
          x="15"
          y="18"
          fill="none"
          strokeMiterlimit="10"
          width="8"
          height="5"
        />
        <path
          fill="none"
          strokeMiterlimit="10"
          d="M17,18v-3 c0-1.1,0.9-2,2-2l0,0c1.1,0,2,0.9,2,2v3"
        />
        <path
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          d="M11,13L11,13 c-2.761,0-5-3.239-5-6V6c0-2.761,2.239-5,5-5h0c2.761,0,5,2.239,5,5v1C16,9.761,13.761,13,11,13z"
        />
      </g>
    </svg>
  );
}

PendingUserSVG.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

PendingUserSVG.defaultProps = {
  fillColor: '#2f3337',
  height: 24,
  width: 24,
};

export default PendingUserSVG;
