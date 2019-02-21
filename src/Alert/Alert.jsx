import React from 'react';
import PropTypes from 'prop-types';

import styles from './alert.module.scss';

function Alert(props) {
  const {
    className,
    closeClassName,
    color,
    isOpen,
    onClose,
    children,
    ...rest
  } = props;

  if (!isOpen) {
    return null;
  }

  const alertClasses = `${styles.alert} ${
    styles[`alert-${color}`]
  } ${className}`.trim();

  return (
    <div {...rest} className={alertClasses} role="alert">
      {onClose && (
        <button
          type="button"
          className={`${styles.close} ${closeClassName}`.trim()}
          aria-label="Close Alert"
          onClick={onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
      {children}
    </div>
  );
}

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeClassName: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'success', 'danger', 'warning']),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
Alert.defaultProps = {
  className: '',
  closeClassName: '',
  color: 'success',
  isOpen: true,
  onClose: null,
};

export default Alert;
