import React from 'react';
import { string, oneOfType, number, bool } from 'prop-types';

function CancelButton({ hover, fillColor, secondaryColor, ...rest }) {
  return (
    <svg viewBox="0 0 30 30" {...rest}>
      <g
        id="Product-Buttons"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          transform="translate(-565.000000, -27.000000)"
          id={`cancel-order${hover ? '-hover' : ''}`}
        >
          <g transform="translate(565.000000, 27.000000)">
            {hover ? (
              <rect
                id="Rectangle"
                fillOpacity="0.1"
                fill={fillColor}
                x="0"
                y="0"
                width="30"
                height="30"
                rx="15"
              />
            ) : (
              <rect
                id="Rectangle"
                stroke={secondaryColor}
                x="0.5"
                y="0.5"
                width="29"
                height="29"
                rx="14.5"
              />
            )}
            <path
              d="M20,10 L10,20"
              id="Shape"
              stroke={fillColor}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10,10 L20,20"
              id="Shape"
              stroke={fillColor}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

CancelButton.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  hover: bool,
  secondaryColor: string,
  width: oneOfType([string, number]),
};

CancelButton.defaultProps = {
  fillColor: '#FE0625',
  height: '24px',
  hover: false,
  secondaryColor: '#DADCDF',
  width: '24px',
};

export default CancelButton;
