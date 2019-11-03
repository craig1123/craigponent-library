import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Collapse from '../Collapse/Collapse';
import Fade from '../Fade/Fade';

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
    fade,
    collapse,
    duration,
    ...rest
  } = props;

  const [isShowing, setIsShowing] = useState(isOpen);
  const [isShowingFade, setIsShowingFade] = useState(true);

  useEffect(() => {
    if (isOpen && !isShowing) {
      // eslint-disable-next-line no-use-before-define
      showAlert();
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen) {
    return null;
  }

  const showAlert = () => {
    if (fade) {
      setIsShowingFade(true);
    }
    setIsShowing(true);
  };

  const hideAlert = () => {
    if (fade) {
      setIsShowingFade(false);
    }

    setIsShowing(false);
    if (onClose) {
      setTimeout(() => {
        onClose();
      }, duration);
    }
  };

  const alertClasses = `${styles.alert} ${
    styles[`alert-${color}`]
  } ${className}`.trim();

  const renderAlert = () => (
    <div {...rest} className={alertClasses} role="alert">
      <div className={styles.alertInside}>
        {onClose && (
          <button
            type="button"
            className={`${styles.close} ${closeClassName}`.trim()}
            aria-label="Close Alert"
            onClick={hideAlert}
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

  const renderSwitch = () => {
    if (collapse && fade) {
      return (
        <Collapse isOpen={isShowing}>
          <Fade
            in={isShowingFade}
            duration={duration}
            onExited={() => setIsShowing(false)}
          >
            {renderAlert()}
          </Fade>
        </Collapse>
      );
    }

    if (collapse) {
      return <Collapse isOpen={isShowing}>{renderAlert()}</Collapse>;
    }

    if (fade) {
      return (
        <Fade
          in={isShowingFade}
          duration={duration}
          onExited={() => setIsShowing(false)}
        >
          {renderAlert()}
        </Fade>
      );
    }

    return renderAlert();
  };

  return renderSwitch();
}

Alert.propTypes = {
  /** Children to be in the Alert body */
  children: PropTypes.node,
  className: PropTypes.string,
  closeClassName: PropTypes.string,
  /** Include Collapse transition */
  collapse: PropTypes.bool,
  /** Alert Color type */
  color: PropTypes.oneOf(['primary', 'success', 'danger']),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Transition duration passed to Fade */
  duration: PropTypes.number,
  /** Include Fade transition */
  fade: PropTypes.bool,
  /** Controls if the Alert is displayed or not */
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Alert.defaultProps = {
  children: null,
  className: '',
  closeClassName: '',
  collapse: true,
  color: 'success',
  description: null,
  duration: 300,
  fade: true,
  isOpen: true,
  onClose: null,
  title: null,
};

export default Alert;
