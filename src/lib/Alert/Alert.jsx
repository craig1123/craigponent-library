import React from 'react';
import PropTypes from 'prop-types';

import styles from './alert.module.scss';

function Alert(props) {
  const {
    children,
    className,
    closeClassName,
    color,
    description,
    isOpen,
    onClose,
    title,
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
      <div className={styles.alertInside}>
        {onClose && (
          <button
            type="button"
            className={`${styles.close} ${closeClassName}`.trim()}
            aria-label="Close Alert"
            onClick={onClose}
          >
            <span aria-hidden="true" className={styles['close-icon']}>
              &times;
            </span>
          </button>
        )}
        {children}
        {title && <div className={styles.title}>{title}</div>}
        {description && <div className={styles.description}>{description}</div>}
      </div>
    </div>
  );
}

Alert.propTypes = {
  /** Childen to be in the Alert body */
  children: PropTypes.node,
  className: PropTypes.string,
  closeClassName: PropTypes.string,
  /** Alert Color type */
  color: PropTypes.oneOf(['primary', 'success', 'danger']),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Controls if the Alert is displayed or not */
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Alert.defaultProps = {
  children: null,
  className: '',
  closeClassName: '',
  color: 'success',
  description: null,
  isOpen: true,
  onClose: null,
  title: null,
};

export default Alert;
