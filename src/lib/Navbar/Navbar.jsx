import React from 'react';
import { oneOfType, string, node } from 'prop-types';

import MenuIcon from '../icons/menuIcon.svg';

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
      <MenuIcon className="hamburger" onClick={() => {}} />
    </div>
  );
};

Navbar.propTypes = {
  children: oneOfType([node, string]),
  className: string,
  styleMode: string,
};

Navbar.defaultProps = {
  children: null,
  className: '',
  styleMode: 'light',
};

export default Navbar;
