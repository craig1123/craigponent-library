import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function DownTriangle({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 16 16" {...rest}>
      <g fill={fillColor}>
        <path
          fill={fillColor}
          d="M8.001,14c0.326,0,0.632-0.159,0.819-0.427l7-10c0.214-0.305,0.238-0.704,0.068-1.035 C15.715,2.207,15.374,2,15.001,2H0.999C0.626,2,0.285,2.207,0.112,2.538c-0.17,0.331-0.146,0.73,0.068,1.035l7,10 C7.367,13.841,7.673,14,7.999,14C8,14,8,14,8.001,14C8,14,8,14,8.001,14z"
        />
      </g>
    </svg>
  );
}

DownTriangle.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

DownTriangle.defaultProps = {
  fillColor: '#17181a',
  height: 16,
  width: 16,
};

export default DownTriangle;
