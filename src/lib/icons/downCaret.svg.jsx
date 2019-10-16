import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function DownCaret({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g fill={fillColor}>
        <path
          fill={fillColor}
          d="M12,18c-0.256,0-0.512-0.098-0.707-0.293L0.586,7L2,5.586l10,10l10-10L23.414,7L12.707,17.707 C12.512,17.902,12.256,18,12,18z"
        />
      </g>
    </svg>
  );
}

DownCaret.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

DownCaret.defaultProps = {
  fillColor: '#8a8f9c',
  height: '14',
  width: '14',
};

export default DownCaret;
