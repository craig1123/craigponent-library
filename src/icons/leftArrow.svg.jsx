import React from 'react';
import { string, oneOfType, number } from 'prop-types';

function LeftArrow({ fillColor, ...rest }) {
  return (
    <svg viewBox="0 0 40 25" {...rest}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g fill={fillColor} fillRule="nonzero">
          <path d="M38.1733666,10.7686 L5.89685786,10.7686 L13.5985037,3.0472 C14.273217,2.3712 14.273217,1.2746 13.5985037,0.5987 C12.9237905,-0.0777 11.8299252,-0.0777 11.1562095,0.5987 L0.506034913,11.2757 C-0.168678304,11.9517 -0.168678304,13.0484 0.506034913,13.7242 L11.1562095,24.4017 C11.4934663,24.74 11.9354613,24.9089 12.3773566,24.9089 C12.8192519,24.9089 13.2612469,24.74 13.5985037,24.4017 C14.273217,23.7257 14.273217,22.6291 13.5985037,21.9533 L5.89685786,14.2315 L38.1733666,14.2315 C39.127182,14.2315 39.9006484,13.4562 39.9006484,12.5 C39.9006484,11.5438 39.1272818,10.7686 38.1733666,10.7686 Z" />
        </g>
      </g>
    </svg>
  );
}

LeftArrow.propTypes = {
  fillColor: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

LeftArrow.defaultProps = {
  fillColor: '#2F3337',
  height: '18px',
  width: '35px',
};

export default LeftArrow;
