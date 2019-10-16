import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function InstagramLogo({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 16 16" {...rest}>
      <g fill={fillColor} fillRule="nonzero">
        <circle cx="12.145" cy="3.892" r="1" />
        <path d="M8 12c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z" />
        <path d="M12 16H4c-2.056 0-4-1.944-4-4V4c0-2.056 1.944-4 4-4h8c2.056 0 4 1.944 4 4v8c0 2.056-1.944 4-4 4zM4 2c-.935 0-2 1.065-2 2v8c0 .953 1.047 2 2 2h8c.935 0 2-1.065 2-2V4c0-.935-1.065-2-2-2H4z" />
      </g>
    </svg>
  );
}

InstagramLogo.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

InstagramLogo.defaultProps = {
  fillColor: '#AFB3BA',
  height: '24px',
  width: '24px',
};

export default InstagramLogo;
