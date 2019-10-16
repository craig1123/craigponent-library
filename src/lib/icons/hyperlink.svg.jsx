import React from 'react';
import { number, oneOfType, string } from 'prop-types';

function Hyperlink({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        transform="translate(0.5 0.5)"
        fill={fillColor}
        stroke={fillColor}
      >
        <path
          fill="none"
          strokeMiterlimit="10"
          d=" M21.645,9.999C22.476,10.732,23,11.805,23,13v4c0,2.209-1.791,4-4,4h-9c-2.209,0-4-1.791-4-4v-4c0-2.209,1.791-4,4-4h4"
        />
        <path
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          d="M2.355,14.001 C1.524,13.268,1,12.195,1,11V7c0-2.209,1.791-4,4-4h9c2.209,0,4,1.791,4,4v4c0,2.209-1.791,4-4,4h-4"
        />
      </g>
    </svg>
  );
}

Hyperlink.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Hyperlink.defaultProps = {
  fillColor: '#00CE7D',
  height: 16,
  width: 16,
};

export default Hyperlink;
