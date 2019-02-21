import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function InfoSvG({ fillColor, ...rest }) {
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
          d="M9.455,18.086l-3.243,1.394 C5.477,19.796,5,20.519,5,21.319V23h14v-1.681c0-0.8-0.477-1.523-1.212-1.838l-3.251-1.388"
        />
        <circle fill="none" strokeMiterlimit="10" cx="12" cy="3" r="2" />
        <circle fill="none" strokeMiterlimit="10" cx="21" cy="8" r="2" />
        <circle fill="none" strokeMiterlimit="10" cx="3" cy="8" r="2" />
        <path
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          d="M12,19L12,19 c-2.209,0-4-1.791-4-4v-1c0-2.209,1.791-4,4-4h0c2.209,0,4,1.791,4,4v1C16,17.209,14.209,19,12,19z"
        />
      </g>
    </svg>
  );
}

InfoSvG.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

InfoSvG.defaultProps = {
  fillColor: '#2f3337',
  height: 24,
  width: 24,
};

export default InfoSvG;
