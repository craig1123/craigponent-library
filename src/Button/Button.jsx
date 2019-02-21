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
    loading,
    rounded,
    size,
    styleMode,
    ...rest
  } = props;
  const load = loading ? styles.loading : '';
  const border = bordered ? styles.bordered : '';
  const round = rounded ? styles.rounded : '';
  const displayBlock = block ? styles.block : '';
  const btnClassName = `${styles['craig-btn']} ${
    styles[`craig-btn-${btnType}`]
  } ${styles[size]} ${load} ${border} ${displayBlock} ${round} ${
    styles[styleMode]
  } ${className}`.trim();

  return (
    <button className={btnClassName} {...rest}>
      <div className={styles['btn-flex']}>
        {loading && (
          <Loading
            color={styleMode === 'dark' ? '#fff' : '#2f3337'}
            style={marginRight}
          />
        )}
        {children}
      </div>
    </button>
  );
};

Button.propTypes = {
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
  className: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.string,
  styleMode: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  block: false,
  bordered: true,
  btnType: 'default',
  children: null,
  className: '',
  loading: false,
  rounded: false,
  size: 'md',
  styleMode: 'light',
  type: 'button',
};

export default Button;
