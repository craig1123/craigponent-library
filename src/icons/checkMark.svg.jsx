import React from 'react';
import { number, oneOfType, string } from 'prop-types';

function CheckMarkSVG({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g fill={fillColor} className="checkmark">
        <g
          className="nc-icon-wrapper"
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

CheckMarkSVG.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

CheckMarkSVG.defaultProps = {
  fillColor: '#000',
  height: 16,
  width: 16,
};

export default CheckMarkSVG;
