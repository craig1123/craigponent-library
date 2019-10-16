import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function Logout({ fillColor, ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
      <g className="logout-icon-wrapper" fill={fillColor}>
        <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
      </g>
    </svg>
  );
}

Logout.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Logout.defaultProps = {
  fillColor: '#2F3337',
  height: '22px',
  width: '22px',
};

export default Logout;
