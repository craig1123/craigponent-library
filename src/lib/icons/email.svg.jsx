import React from 'react';
import { string, oneOfType, number } from 'prop-types';

const Email = ({ fillColor, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
    <g
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      fill={fillColor}
      stroke={fillColor}
    >
      <path
        d="M1,13v6a2,2,0,0,0,2,2H21a2,2,0,0,0,2-2V13"
        fill="none"
        strokeMiterlimit="10"
      />
      <path
        d="M23,8V5a2,2,0,0,0-2-2H3A2,2,0,0,0,1,5V8l11,6Z"
        fill="none"
        stroke={fillColor}
        strokeMiterlimit="10"
      />
    </g>
  </svg>
);

Email.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Email.defaultProps = {
  fillColor: '#2f3337',
  height: '24px',
  width: '24px',
};

export default Email;
