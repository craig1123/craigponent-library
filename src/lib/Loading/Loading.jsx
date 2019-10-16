import React, { memo } from 'react';
import { string } from 'prop-types';

import styles from './loading.module.scss';

const sizes = {
  sm: '25px',
  md: '34px',
  lg: '44px',
};

// TODO: change to SVG

const Loading = ({ className, color, size, styleMode, type, ...rest }) => {
  const styleModeColor = styleMode === 'dark' ? '#FFF' : '#1F2228';
  const loadingColor = color || styleModeColor;
  const loadingSize = sizes[size] || size; // can be 'sm', 'md', 'lg' or a pixel size
  const ringStyle = {
    border: `1px solid ${loadingColor}`,
    borderColor: `${loadingColor} transparent transparent transparent`,
    height: loadingSize,
    width: loadingSize,
  };
  const dotStyle = {
    color: loadingColor,
    fontSize: `${loadingSize}`,
  };
  const ringClassNameWrapper = `${styles['loading-ring']} ${className}`.trim();
  const dotsClassNameWrapper = `${styles['loading-dots']} ${className}`.trim();

  if (type === 'dots') {
    return <div className={dotsClassNameWrapper} style={dotStyle} {...rest} />;
  }
  return (
    <div className={ringClassNameWrapper} {...rest}>
      <div style={ringStyle} />
      <div style={ringStyle} />
      <div style={ringStyle} />
      <div style={ringStyle} />
    </div>
  );
};

Loading.propTypes = {
  className: string,
  color: string,
  size: string,
  styleMode: string,
  /** Pass "ring" for loading circle or "dots" for loading dots */
  type: string,
};

Loading.defaultProps = {
  className: '',
  color: null,
  size: 'sm',
  styleMode: 'light',
  type: 'ring',
};

export default memo(Loading);
