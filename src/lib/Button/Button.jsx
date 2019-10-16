/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading/Loading';

import styles from './button.module.scss';

const marginRight = { marginRight: '15px' };

const Button = props => {
  const {
    block,
    bordered,
    btnType,
    children,
    className,
    href,
    loading,
    loadingColor,
    noMargin,
    rounded,
    size,
    styleMode,
    type,
    ...rest
  } = props;
  const load = loading ? styles.loading : '';
  const border = bordered ? styles.bordered : '';
  const round = rounded ? styles.rounded : '';
  const displayBlock = block ? styles.block : '';
  const noMarginClass = noMargin ? styles['no-margin'] : '';
  const darkMode = styleMode === 'dark' ? styles.dark : '';
  const btnClassName = `${styles.btn} ${styles[`btn-${btnType}`]} ${
    styles[size]
  } ${load} ${noMarginClass} ${border} ${displayBlock} ${round} ${darkMode} ${className}`.trim();

  const buttonChildren = (
    <div className={styles['btn-flex']}>
      {loading && <Loading color={loadingColor} style={marginRight} />}
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} className={btnClassName} {...rest}>
        {buttonChildren}
      </a>
    );
  }

  return (
    <button type={type} className={btnClassName} {...rest}>
      {buttonChildren}
    </button>
  );
};

Button.propTypes = {
  /** Makes the button take up 100% of the parent container's width */
  block: PropTypes.bool,
  bordered: PropTypes.bool,
  btnType: PropTypes.oneOf([
    'primary',
    'success',
    'transparent',
    'default',
    'destructive',
    'link',
    'gray',
  ]),
  children: PropTypes.node,
  className: PropTypes.string,
  /** Link to leave page. Turns the button into an "a" tag.  */
  href: PropTypes.string,
  loading: PropTypes.bool,
  loadingColor: PropTypes.string,
  /** Gets rid of all margin attached to the button */
  noMargin: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.string,
  styleMode: PropTypes.string,
  /** The default type to be applied to the button (ie "submit", "button") */
  type: PropTypes.string,
};

Button.defaultProps = {
  block: false,
  bordered: true,
  btnType: 'default',
  children: null,
  className: '',
  href: '',
  loading: false,
  loadingColor: '#fff',
  noMargin: false,
  rounded: false,
  size: 'md',
  styleMode: 'light',
  type: 'button',
};

export default Button;
