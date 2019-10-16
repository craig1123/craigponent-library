import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function RightCaret({ fillColor, ...rest }) {
  return (
    <svg
      x="0px"
      y="0px"
      fill={fillColor}
      stroke={fillColor}
      strokeWidth="50px"
      id="right-caret-svg"
      viewBox="0 0 792 792"
      {...rest}
    >
      <polygon points="580.802,369.604 580.802,369.604 211.198,0 184.802,26.396 554.405,396 184.802,765.604 211.198,792 607.198,396" />
    </svg>
  );
}

RightCaret.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

RightCaret.defaultProps = {
  fillColor: '#1F2228',
  height: '15px',
  width: '15px',
};

export default RightCaret;
