import React from 'react';
import { oneOfType, string, func, shape, arrayOf, node } from 'prop-types';

import styles from './Navbar.module.scss';

const Navbar = ({
  children,
  className,
  styleMode,
  ...rest
}) => {
  const darkMode = styleMode === 'dark' ? styles.dark : '';
  const navbarClassName = `${
    styles['navbar-wrapper']
  } ${darkMode} ${className}`.trim();
  return (
    <div className={navbarClassName} {...rest}>
      {children}
    </div>
  );
};

Navbar.propTypes = {
  bodyClassName: string,
  children: oneOfType([node, string]),
  className: string,
  styleMode: string,
  title: oneOfType([string, node]),
  titleClassName: string,
  titleProps: shape({}),
  titleTag: oneOfType([
    func,
    string,
    shape({}),
    arrayOf(oneOfType([func, string, shape({})])),
  ]),
};

Navbar.defaultProps = {
  bodyClassName: '',
  children: null,
  className: '',
  styleMode: 'light',
  title: null,
  titleClassName: '',
  titleProps: null,
  titleTag: 'div',
};

export default Navbar;
