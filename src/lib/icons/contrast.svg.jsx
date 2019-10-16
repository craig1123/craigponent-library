import React from 'react';
import { number, oneOfType, string } from 'prop-types';

function Contrast({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        fill={fillColor}
        d="M12 1C5.935 1 1 5.935 1 12s4.935 11 11 11 11-4.935 11-11S18.065 1 12 1zM3 12c0-4.963 4.038-9 9-9v18c-4.962 0-9-4.037-9-9z"
      />
    </svg>
  );
}

Contrast.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Contrast.defaultProps = {
  fillColor: '#ffffff',
  height: 16,
  width: 16,
};

export default Contrast;
