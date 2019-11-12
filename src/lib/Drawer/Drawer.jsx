/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect, Fragment } from 'react';
import { oneOfType, string, func, node, number, bool, oneOf } from 'prop-types';
import Transition from 'react-transition-group/Transition';
import Fade from '../Fade/Fade';

import styles from './drawer.module.scss';

let timeout = null;

const Drawer = ({
  backdrop,
  backdropClassName,
  backdropDuration,
  bodyClassName,
  children,
  className,
  close,
  closeClassName,
  contentClassName,
  duration,
  height,
  styleMode,
  position,
  width,
  onOpen,
  onClose,
  isOpen,
  header,
  headerClassName,
  titleClassName,
  toggle,
  ...rest
}) => {
  const [isShowing, setIsShowing] = useState(isOpen);

  const darkMode = styleMode === 'dark' ? styles.dark : '';
  const drawerClassName = `${styles['drawer-wrapper']} ${
    styles[position]
  } ${darkMode} ${className}`.trim();
  const drawerContentClass = `${
    styles['drawer-content']
  } ${darkMode} ${contentClassName}`.trim();

  useEffect(() => {
    if (isOpen && !isShowing) {
      showDrawer();
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => clearTimeout(timeout), []);

  if (!isOpen) {
    return null;
  }

  const showDrawer = () => {
    if (onOpen) {
      onOpen();
    }

    if (toggle) {
      toggle(true);
    }

    setIsShowing(true);
  };

  const hideDrawer = () => {
    if (onClose) {
      timeout = setTimeout(() => {
        onClose();
      }, 150);
    }

    if (toggle) {
      timeout = setTimeout(() => {
        toggle(false);
      }, 150);
    }

    setIsShowing(false);
  };

  // eslint-disable-next-line consistent-return
  const transitionStyles = () => {
    switch (position) {
      case 'left':
        return {
          entering: { transform: `translate3d(-50%, 0, 0)` },
          entered: { transform: `translate3d(0%, 0, 0)` },
          exiting: { transform: `translate3d(0%, 0, 0)` },
          exited: { transform: `translate3d(-50%, 0, 0)` },
        };
      case 'right':
        return {
          entering: { transform: `translate3d(100%, 0, 0)` },
          entered: { transform: `translate3d(0%, 0, 0)` },
          exiting: { transform: `translate3d(0%, 0, 0)` },
          exited: { transform: `translate3d(100%, 0, 0)` },
        };
      case 'top':
        return {
          entering: { transform: `translate3d(0, -50%, 0)` },
          entered: { transform: `translate3d(0, 0%, 0)` },
          exiting: { transform: `translate3d(0, 0%, 0)` },
          exited: { transform: `translate3d(0, -50%, 0)` },
        };
      case 'bottom':
        return {
          entering: { transform: `translate3d(0, 100%, 0)` },
          entered: { transform: `translate3d(0, 0%, 0)` },
          exiting: { transform: `translate3d(0, 0%, 0)` },
          exited: { transform: `translate3d(0, 100%, 0)` },
        };
      default:
        console.error(`Invalid position type ${position} supplied to Drawer`);
    }
  };

  return (
    <Fragment>
      <Transition in={isShowing} timeout={duration} {...rest}>
        {state => (
          <div
            className={drawerClassName}
            style={{ height, width, ...transitionStyles()[state] }}
            {...rest}
          >
            <div className={drawerContentClass}>
              {header && (
                <div
                  className={`${
                    styles['drawer-header']
                  } ${headerClassName}`.trim()}
                >
                  <h3
                    className={`${
                      styles['drawer-title']
                    } ${titleClassName}`.trim()}
                  >
                    {header}
                  </h3>
                  {(close || onClose) && (
                    <button
                      type="button"
                      onClick={hideDrawer}
                      className={`${styles.close} ${closeClassName}`.trim()}
                      aria-label="Close Drawer"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className={`${styles['drawer-body']} ${bodyClassName}`.trim()}>
              {children}
            </div>
          </div>
        )}
      </Transition>
      {backdrop && (
        <Fade
          className={`${styles['drawer-backdrop']} ${isOpen &&
            styles.backdrop} ${backdropClassName}`.trim()}
          onClick={hideDrawer}
          duration={backdropDuration}
          in={isOpen && !!backdrop}
          opacity={0.5}
        />
      )}
    </Fragment>
  );
};

Drawer.propTypes = {
  /** Show a backdrop */
  backdrop: bool,
  backdropClassName: string,
  /** Duration of backdrop fade */
  backdropDuration: number,
  bodyClassName: string,
  children: oneOfType([node, string]),
  className: string,
  /** Include the (x) icon to close */
  close: bool,
  closeClassName: string,
  contentClassName: string,
  delay: number,
  duration: number,
  easing: string,
  header: oneOfType([node, string]),
  headerClassName: string,
  height: string,
  isOpen: bool,
  onClose: func,
  onOpen: func,
  position: oneOf(['top', 'bottom', 'right', 'left']),
  styleMode: string,
  titleClassName: string,
  toggle: func,
  width: string,
};

Drawer.defaultProps = {
  backdrop: true,
  backdropClassName: '',
  backdropDuration: 150,
  bodyClassName: '',
  children: null,
  className: '',
  close: true,
  closeClassName: '',
  contentClassName: '',
  duration: 10,
  delay: 0,
  easing: 'ease-in-out',
  header: null,
  headerClassName: '',
  height: '',
  isOpen: false,
  onClose: null,
  onOpen: null,
  position: 'left',
  styleMode: 'light',
  titleClassName: '',
  toggle: null,
  width: '',
};

export default Drawer;
