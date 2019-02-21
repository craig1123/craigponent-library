import React from 'react';
import { string, oneOfType, number } from 'prop-types';

const EmailSVG = ({ fillColor, strokewidth, secondaryColor, ...rest }) => (
  <svg viewBox="0 0 32 32" x="0px" y="0px" {...rest}>
    <g
      fill={secondaryColor}
      stroke={secondaryColor}
      strokeLinecap="square"
      strokeWidth={strokewidth}
    >
      <polyline fill="none" points="1,5 16,16 31,5 " strokeLinecap="butt" />
      <rect height="22" width="30" fill="none" stroke={fillColor} x="1" y="5" />
    </g>
  </svg>
);

EmailSVG.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  secondaryColor: string,
  strokewidth: string,
  width: oneOfType([string, number]),
};

EmailSVG.defaultProps = {
  fillColor: '#389BFF',
  height: '24px',
  secondaryColor: '#389BFF',
  strokewidth: '2px',
  width: '24px',
};

export default EmailSVG;
