/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useDimensions from 'lohook/src/useDimensions';
import Portal from '../Portal/Portal';
import Arrow from './Arrow';
import TipContainer from './TipContainer';

import styles from './tooltip.module.scss';

function Tooltip(props) {
  const {
    arrow,
    arrowClassName,
    backgroundColor,
    children,
    className,
    content,
    duration,
    delay,
    easing,
    hover,
    onOpen,
    onClose,
    position,
    tipContainerClassName,
    isOpen,
    styleMode,
    offset,
    ...rest
  } = props;

  const [isShowing, setIsShowing] = useState(isOpen);
  const [wrapperRef, dimensions] = useDimensions({});

  useEffect(() => {
    if (isOpen) {
      handleTouch();
    }
    return removeListeners;
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const assignOutsideTouchHandler = () => {
    document.addEventListener('click', handler);
  };

  const removeListeners = () => {
    document.removeEventListener('click', handler);
  };

  const handler = e => {
    let currentNode = e.target;
    const componentNode = wrapperRef.current;
    while (currentNode.parentNode) {
      if (currentNode === componentNode) return;
      currentNode = currentNode.parentNode;
    }
    if (currentNode !== document) return;
    hideTooltip();
    removeListeners();
  };

  const showTooltip = () => {
    if (onOpen) {
      onOpen();
    }

    setIsShowing(true);
  };

  const hideTooltip = () => {
    if (onClose) {
      onClose();
    }

    setIsShowing(false);
  };

  const handleTouch = () => {
    showTooltip();
    assignOutsideTouchHandler();
  };

  return (
    <div
      className={`${styles['tooltip-wrapper']} ${className}`.trim()}
      onClick={hover ? null : handleTouch}
      onKeyPress={hover ? null : handleTouch}
      onMouseEnter={hover ? showTooltip : null}
      onMouseLeave={hover ? hideTooltip : null}
      ref={wrapperRef}
      {...rest}
    >
      <Portal>
        {arrow && (
          <Arrow {...props} isShowing={isShowing} dimensions={dimensions} />
        )}
        <TipContainer {...props} isShowing={isShowing} dimensions={dimensions}>
          {content}
        </TipContainer>
      </Portal>
      {children}
    </div>
  );
}

Tooltip.propTypes = {
  /** The display for the user to hover/click on */
  children: PropTypes.node.isRequired,
  /** Content elements inside the tooltip container */
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  arrow: PropTypes.bool,
  arrowClassName: PropTypes.string,
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.string,
  hover: PropTypes.bool,
  isOpen: PropTypes.bool,
  offset: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  position: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',
    'bottom',
    'bottom-left',
    'bottom-right',
    'right',
    'left',
  ]),
  styleMode: PropTypes.string,
  tipContainerClassName: PropTypes.string,
};

Tooltip.defaultProps = {
  arrow: true,
  arrowClassName: '',
  backgroundColor: '',
  className: '',
  duration: 180,
  delay: 0,
  easing: 'ease-in-out',
  hover: true,
  isOpen: false,
  onClose: null,
  onOpen: null,
  position: 'top',
  tipContainerClassName: '',
  offset: '0px',
  styleMode: 'light',
};

export default Tooltip;
