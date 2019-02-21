import React from 'react';
import { bool, string, oneOfType, number } from 'prop-types';

function PDFSVG({ pdf, fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 64 64" {...rest}>
      <g transform="translate(.5 .5)">
        {pdf && ( // when false, it removes the letters "PDF" for other file types
          <>
            <path
              fill={fillColor}
              d="M26.9,40.6c0,1-0.3,1.8-0.9,2.3c-0.6,0.5-1.5,0.8-2.7,0.8h-0.8V47h-2v-9.3h3 c1.1,0,2,0.2,2.6,0.7C26.6,38.9,26.9,39.7,26.9,40.6z M22.4,42.1h0.6c0.6,0,1.1-0.1,1.4-0.4s0.5-0.6,0.5-1c0-0.5-0.1-0.8-0.4-1 c-0.3-0.2-0.6-0.3-1.2-0.3h-0.9V42.1z"
              strokeLinecap="square"
            />
            <path
              fill={fillColor}
              d="M36.6,42.3c0,1.5-0.4,2.7-1.3,3.5c-0.9,0.8-2.1,1.2-3.8,1.2h-2.6v-9.3h2.9 c1.5,0,2.7,0.4,3.5,1.2C36.2,39.7,36.6,40.8,36.6,42.3z M34.5,42.3c0-2-0.9-3-2.6-3h-1v6h0.8C33.6,45.4,34.5,44.4,34.5,42.3z"
              strokeLinecap="square"
            />
            <path
              fill={fillColor}
              d="M40.7,47h-1.9v-9.3h5.3v1.6h-3.4v2.4h3.1v1.6h-3.1V47z"
              strokeLinecap="square"
            />
          </>
        )}
        <polyline
          data-cap="butt"
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          points="40,2 40,18 56,18"
        />
        <polyline
          fill="none"
          stroke={fillColor}
          strokeLinecap="square"
          strokeMiterlimit="10"
          points="56,32 56,18 40,2 8,2 8,32"
        />
        <polyline
          fill="none"
          stroke={fillColor}
          strokeLinecap="square"
          strokeMiterlimit="10"
          points="8,53 8,62 56,62 56,53"
        />
        <line
          data-cap="butt"
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          x1="61"
          y1="32"
          x2="3"
          y2="32"
        />
        <polyline
          data-cap="butt"
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          points="8,27 3,32 3,53 61,53 61,32 56,27"
        />
      </g>
    </svg>
  );
}

PDFSVG.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  pdf: bool,
  width: oneOfType([string, number]),
};

PDFSVG.defaultProps = {
  fillColor: '#2f3337',
  height: '64px',
  pdf: true,
  width: '64px',
};

export default PDFSVG;
