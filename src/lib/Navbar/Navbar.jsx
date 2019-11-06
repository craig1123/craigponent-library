import React, { useState } from 'react';
import { oneOfType, string, node, object } from 'prop-types';

import MenuIcon from '../icons/menuIcon.svg';

import styles from './Navbar.module.scss';

const Navbar = ({
  children,
  className,
  logo,
  styleMode,
  ...rest
}) => {
  const darkMode = styleMode === 'dark' ? styles.dark : '';
  const navbarClassName = `${
    styles['navbar-wrapper']
  } ${darkMode} ${className}`.trim();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav>
      <div className={`${navbarClassName} ${styles['bigNav']}`} {...rest}>
        {logo}
        {children}
      </div>
      <div className={`${navbarClassName} ${styles['littleNav']}`} {...rest}>
        {logo}
        {showMenu ? <div className={`${styles['mobileLinks']}`}>{children}</div> : null}
        <MenuIcon
          className={`${styles['hamburger']}`}
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  children: oneOfType([node, string]),
  className: string,
  logo: oneOfType([node, object]),
  styleMode: string,
};

Navbar.defaultProps = {
  children: null,
  className: '',
  logo: null,
  styleMode: 'light',
};

export default Navbar;
