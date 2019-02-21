import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function FileSVG({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 32 32" {...rest}>
      <g
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
        fill={fillColor}
        stroke={fillColor}
      >
        <polyline
          data-cap="butt"
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          points="21,1 21,9 29,9 "
          strokeLinecap="butt"
        />
        <polygon
          fill="none"
          stroke={fillColor}
          strokeMiterlimit="10"
          points="21,1 3,1 3,31 29,31 29,9 "
        />
      </g>
    </svg>
  );
}

FileSVG.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

FileSVG.defaultProps = {
  fillColor: '#389BFF',
  height: '21px',
  width: '32px',
};

export default FileSVG;
