import React from 'react';
import { number, oneOfType, string } from 'prop-types';

function CheckMark({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g fill={fillColor}>
        <g
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          fill={fillColor}
          stroke={fillColor}
        >
          <polyline
            points="2 14 8 20 22 2"
            fill="none"
            stroke={fillColor}
            strokeMiterlimit="10"
          />
        </g>
      </g>
    </svg>
  );
}

CheckMark.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

CheckMark.defaultProps = {
  fillColor: '#000',
  height: 16,
  width: 16,
};

export default CheckMark;
