import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function FacebookLogo({ fillColor, secondaryColor, ...rest }) {
  return (
    <svg id="facebook-logo" viewBox="0 0 100 100" {...rest}>
      <path
        fill={fillColor}
        d="M94.48,0h-89A5.52,5.52,0,0,0,0,5.52v89A5.52,5.52,0,0,0,5.52,100h47.9V61.33h-13V46.19h13V35.05c0-12.91,7.89-19.95,19.41-19.95a104.57,104.57,0,0,1,11.64.6V29.2H76.53c-6.27,0-7.49,3-7.49,7.35v9.64H84l-2,15.14H69V100H94.48A5.52,5.52,0,0,0,100,94.48v-89A5.52,5.52,0,0,0,94.48,0Z"
      />
      <path
        fill={secondaryColor}
        id="f"
        d="M69,100V61.33h13l2-15.14H69V36.55c0-4.37,1.22-7.35,7.49-7.35h7.94V15.7a104.57,104.57,0,0,0-11.64-.6c-11.52,0-19.41,7-19.41,19.95V46.19h-13V61.33h13V100Z"
      />
    </svg>
  );
}

FacebookLogo.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  secondaryColor: string,
  width: oneOfType([string, number]),
};

FacebookLogo.defaultProps = {
  fillColor: '#AFB3BA',
  height: '20px',
  secondaryColor: 'transparent',
  width: '20px',
};

export default FacebookLogo;
