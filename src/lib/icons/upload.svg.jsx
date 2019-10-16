import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function Upload({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
        fill={fillColor}
        stroke={fillColor}
      >
        <line
          fill="none"
          strokeMiterlimit="10"
          x1="12"
          y1="17.998"
          x2="12"
          y2="9.998"
          strokeLinecap="butt"
        />
        <polyline
          fill="none"
          strokeMiterlimit="10"
          points=" 9,12.998 12,9.998 15,12.998 "
        />
        <path
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          d="M17,19h2 c2.209,0,4-1.793,4-4.002c0-2.197-1.782-4.013-4.025-3.997c-0.257-3.909-3.501-7.003-7.475-7.003c-4.019,0-7.29,3.164-7.482,7.136 C2.287,11.573,1,13.129,1,14.998C1,17.207,2.791,19,5,19h2"
        />
      </g>
    </svg>
  );
}

Upload.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Upload.defaultProps = {
  fillColor: '#545658',
  height: '24px',
  width: '24px',
};

export default Upload;
