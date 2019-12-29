/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState, useEffect } from 'react';
import {
  string,
  arrayOf,
  shape,
  func,
  bool,
  number,
  node,
  oneOfType,
  oneOf,
} from 'prop-types';
import { useDimensions } from 'react-recipes';
import DownTriangle from '../icons/downTriangle.svg';
import Portal from '../Portal/Portal';
import DropdownItem from './DropdownItem';
import TipContainer from '../Tooltip/TipContainer';

import styles from './dropdown.module.scss';

const Dropdown = ({
  caret,
  children,
  className,
  content,
  isOpen,
  noFocus,
  onItemSelect,
  onClose,
  onOpen,
  options,
  styleMode,
  tipContainerClassName,
  toggle,
  value,
  valueClassName,
  offset,
  ...rest
}) => {
  const [isShowing, setIsShowing] = useState(isOpen);
  const [wrapperRef, dimensions] = useDimensions();

  const childrenRef = useRef(null);
  const firstOptionRef = useRef(null);

  const darkMode = styleMode === 'dark';
  const darkStyle = darkMode ? styles.dark : '';
  const dropdownStyles = `${
    styles['dropdown-container']
  } ${darkStyle} ${className}`.trim();
  const tipContainterStyles = `${
    styles['tip-dropdown-container']
  } ${darkStyle} ${tipContainerClassName}`.trim();

  useEffect(() => {
    setIsShowing(isOpen);
    return removeListeners;
  }, [isOpen]);

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
    hideDropdown();
    removeListeners();
  };

  const showDropdown = () => {
    if (onOpen) {
      onOpen();
    }

    if (toggle) {
      toggle(true);
    }

    setIsShowing(true);
  };

  const hideDropdown = () => {
    if (onClose) {
      onClose();
    }

    if (toggle) {
      toggle(false);
    }

    setIsShowing(false);
  };

  const handleTouch = () => {
    if (isShowing) {
      hideDropdown();
      removeListeners();
    } else {
      showDropdown();
      assignOutsideTouchHandler();
    }
  };

  return (
    <div
      className={dropdownStyles}
      onClick={handleTouch}
      onKeyPress={handleTouch}
      ref={wrapperRef}
      {...rest}
    >
      <Portal>
        <TipContainer
          {...rest}
          isShowing={isShowing}
          dimensions={dimensions}
          tipContainerClassName={tipContainterStyles}
          backgroundColor={darkMode ? '#181818' : '#fff'}
        >
          {content || (
            <>
              {options.map((option, i) => (
                <DropdownItem
                  innerRef={i === 0 ? firstOptionRef : null}
                  option={option}
                  onItemSelect={onItemSelect}
                  key={option.name}
                  setIsDDOpen={setIsShowing}
                  styleMode={styleMode}
                />
              ))}
            </>
          )}
        </TipContainer>
      </Portal>
      {children || (
        <div
          className={`${styles['dropdown-value']} ${valueClassName}`.trim()}
          ref={childrenRef}
          role="button"
          tabIndex={0}
        >
          {value}{' '}
        </div>
      )}
      {caret && (
        <DownTriangle
          className={styles['dropdown-icon']}
          height={8}
          width={8}
          fillColor={darkMode ? '#fff' : '#2f3337'}
        />
      )}
    </div>
  );
};

Dropdown.propTypes = {
  onItemSelect: func.isRequired,
  /** Show the default caret triangle or not */
  caret: bool,
  children: node,
  className: string,
  /** Pass down content in place of options */
  content: node,
  delay: number,
  duration: number,
  easing: string,
  /** Makes the dropdown controlled */
  isOpen: bool,
  /** If true, will not focus the first element */
  noFocus: bool,
  offset: string,
  /** Fired when the dropdown is closed */
  onClose: func,
  /** Fired when the dropdown is opened */
  onOpen: func,
  options: arrayOf(
    shape({
      name: oneOfType([string, number]).isRequired,
      value: oneOfType([string, number]).isRequired,
      active: bool,
      disabled: bool,
    }),
  ),
  /** The direction the dropdown will open */
  position: oneOf(['bottom', 'bottom-left', 'bottom-right']),
  styleMode: string,
  /** Fired when the dropdown is opened or closed */
  tipContainerClassName: string,
  toggle: func,
  value: oneOfType([string, number]),
  valueClassName: string,
};

Dropdown.defaultProps = {
  caret: true,
  children: null,
  className: '',
  content: null,
  duration: 180,
  delay: 0,
  easing: 'ease-in-out',
  isOpen: false,
  noFocus: false,
  offset: '0px',
  onClose: null,
  onOpen: null,
  options: [],
  position: 'bottom',
  styleMode: 'light',
  tipContainerClassName: '',
  toggle: null,
  valueClassName: '',
  value: '',
};

export default Dropdown;
