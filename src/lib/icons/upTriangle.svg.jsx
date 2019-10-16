import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function UpTriangle({ fillColor, secondaryColor, ...rest }) {
  return (
    <svg id="up-triangle" {...rest} viewBox="0 0 26 14">
      <g stroke="none" strokeWidth="1" fill={fillColor} fillRule="evenodd">
        <g transform="translate(1.000000, 0.000000)">
          <polygon
            id="Shape"
            stroke={secondaryColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            points="24 12 12 0 0 12"
          />
          <path
            stroke={fillColor}
            d="M1.35348885,12 L2.74757235,10.7 L1.35348885,12 L1.2,12 L1.35348885,12 L0,13.262145 L1.35348885,12 L22.6672699,12 L21.3971893,10.8135557 L22.6672699,12 L1.35348885,12 Z M22.6672699,12 L24.2,13.431798 L22.6672699,12 L22.8,12 L22.6672699,12 Z"
          />
        </g>
      </g>
    </svg>
  );
}

UpTriangle.propTypes = {
  fillColor: string,
  secondaryColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

UpTriangle.defaultProps = {
  fillColor: '#FFFFFF',
  secondaryColor: '#DADCDF',
  height: '14px',
  width: '26px',
};

export default UpTriangle;
