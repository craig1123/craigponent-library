import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function LinkedInLogo({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 17 16" {...rest}>
      <path
        fill={fillColor}
        fillRule="nonzero"
        d="M15.3 0H.7C.3 0 0 .3 0 .7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V.7c-.1-.4-.4-.7-.8-.7zM4.7 13.6H2.4V6h2.4v7.6h-.1zM3.6 5c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4V9.9c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8H6.2V6h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z"
      />
    </svg>
  );
}

LinkedInLogo.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

LinkedInLogo.defaultProps = {
  fillColor: '#afb4ba',
  height: 16,
  width: 17,
};

export default LinkedInLogo;
