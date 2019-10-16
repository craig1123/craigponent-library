/* eslint-disable react/jsx-first-prop-new-line */
import React from 'react';
import { string, number, oneOfType } from 'prop-types';

function Wifi(props) {
  const { fillColor, ...rest } = props;
  return (
    <svg viewBox="0 0 16 16" {...rest}>
      <g fill={fillColor}>
        <circle fill={fillColor} cx={8} cy="12.5" r="1.5" />
        <path d="M11.5 10C10.6 9 9.3 8.5 8 8.5S5.4 9 4.5 10L3.1 8.6c1.3-1.4 3-2.1 4.9-2.1s3.6.7 4.9 2.1L11.5 10z" />
        <path
          fill={fillColor}
          d="M8 2C5 2 2.2 3.1 0 5.2l1.4 1.4C3.2 4.9 5.5 4 8 4s4.8.9 6.6 2.7L16 5.2C13.8 3.1 11 2 8 2z"
        />
      </g>
    </svg>
  );
}

Wifi.propTypes = {
  className: string,
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Wifi.defaultProps = {
  className: '',
  fillColor: '#00ce7d',
  height: 16,
  width: 16,
};

export default Wifi;
