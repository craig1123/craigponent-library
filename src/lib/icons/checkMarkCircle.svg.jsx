import React from 'react';
import { number, oneOfType, string, bool } from 'prop-types';

function CheckMarkCircle({
  circle,
  fillColor,
  secondaryColor,
  viewBoxNum,
  ...rest
}) {
  const path =
    'M9,20c-0.3,0-0.5-0.1-0.7-0.3l-7-7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0L9,17.6L21.3,5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-13,13C9.5,19.9,9.3,20,9,20z';

  if (circle) {
    return (
      <svg viewBox={`0 0 ${viewBoxNum} ${viewBoxNum}`} {...rest}>
        <g fill={fillColor}>
          <circle fill={fillColor} r={viewBoxNum / 2} cx="50%" cy="50%" />
          <path fill={secondaryColor} transform="translate(2, 2)" d={path} />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" {...rest}>
      <g fill={fillColor}>
        <path fill={fillColor} d={path} />
      </g>
    </svg>
  );
}

CheckMarkCircle.propTypes = {
  circle: bool,
  fillColor: string,
  secondaryColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
  viewBoxNum: number,
};

CheckMarkCircle.defaultProps = {
  circle: true,
  fillColor: '#00CE7D',
  secondaryColor: '#fff',
  height: 16,
  width: 16,
  viewBoxNum: 28,
};

export default CheckMarkCircle;
