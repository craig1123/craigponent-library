import React from 'react';
import { string, oneOf, node } from 'prop-types';

import styles from './box.module.scss';

const Box = ({ children, color, className, styleMode, ...rest }) => {
  const colorClass = color ? styles[color] : '';
  const darkMode = styleMode === 'dark' ? styles.dark : '';
  return (
    <div
      className={`${styles.box} ${colorClass} ${darkMode} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
};

Box.propTypes = {
  children: node.isRequired,
  className: string,
  color: oneOf(['', 'success', 'danger', 'primary', 'warning', 'light']),
  styleMode: string,
};

Box.defaultProps = {
  className: '',
  color: '',
  styleMode: 'light',
};

export default Box;
