import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function T0LogoSVG({ fillColor, ...rest }) {
  return (
    <svg className="t0-logo" viewBox="0 0 45 41" {...rest}>
      <g fill={fillColor} fillRule="evenodd">
        <path d="M36.774 32.135c-1.004.993-2.203 1.49-3.598 1.49-1.394 0-2.584-.497-3.57-1.49a5.46 5.46 0 0 1-.57-.676l9.217-12.744v9.821c0 1.406-.493 2.606-1.479 3.599M29.606 8.097c.986-.993 2.176-1.49 3.57-1.49 1.395 0 2.594.497 3.598 1.49.195.2.37.409.527.624l-9.173 12.683v-9.68c0-1.406.493-2.615 1.478-3.627M41.404 3.43C39.135 1.144 36.393 0 33.176 0c-3.198 0-5.931 1.144-8.2 3.43-2.268 2.287-3.402 5.051-3.402 8.294v16.812c0 3.224 1.134 5.98 3.402 8.266 2.269 2.287 5.002 3.43 8.2 3.43 3.217 0 5.96-1.143 8.228-3.43s3.403-5.042 3.403-8.266V11.724c0-3.243-1.135-6.007-3.403-8.294M15.32 40.232c-7.657 0-11.27-5.213-11.27-10.962v-7.175H0v-6.466h4.05v-6.48l7.006-3.045v9.525h5.44v6.466h-5.44v5.713c0 1.218.402 6.16 7.752 6.207l-3.489 6.217z" />
      </g>
    </svg>
  );
}

T0LogoSVG.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

T0LogoSVG.defaultProps = {
  fillColor: '#AFB3BA',
  height: '44px',
  width: '44px',
};

export default T0LogoSVG;
