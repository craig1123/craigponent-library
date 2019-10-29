import React, { Fragment, useRef, useState, useEffect } from 'react';
import {
  string,
  arrayOf,
  shape,
  func,
  bool,
  number,
  node,
  oneOfType,
} from 'prop-types';
import DownTriangle from '../icons/downTriangle.svg';
import Tooltip from '../Tooltip/Tooltip';
import DropdownItem from './DropdownItem';
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
  ...rest
}) => {
  const [isDDOpen, setIsDDOpen] = useState(isOpen);
  const childrenRef = useRef(null);
  const firstOptionRef = useRef(null);

  useEffect(() => {
    setIsDDOpen(isOpen);
  }, [isOpen]);

  const darkMode = styleMode === 'dark';
  const darkStyle = darkMode ? styles.dark : '';
  const dropdownStyles = `${
    styles['dropdown-container']
  } ${darkStyle} ${className}`.trim();
  const tipContainterStyles = `${
    styles['tip-dropdown-container']
  } ${darkStyle} ${tipContainerClassName}`.trim();
  const onDropdownOpen = () => {
    if (!noFocus && firstOptionRef.current) {
      firstOptionRef.current.focus();
    }

    if (toggle) {
      toggle(true);
    }

    if (onOpen) {
      onOpen();
    }
  };

  const onDropdownClose = () => {
    if (childrenRef.current) {
      childrenRef.current.focus();
    }

    if (toggle) {
      toggle(false);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <Tooltip
      backgroundColor={darkMode ? '#181818' : '#fff'}
      className={dropdownStyles}
      isOpen={isDDOpen}
      onClose={onDropdownClose}
      onOpen={onDropdownOpen}
      tipContainerClassName={tipContainterStyles}
      content={
        content || (
          <Fragment>
            {options.map((option, i) => (
              <DropdownItem
                innerRef={i === 0 ? firstOptionRef : null}
                option={option}
                onItemSelect={onItemSelect}
                key={option.name}
                setIsDDOpen={setIsDDOpen}
                styleMode={styleMode}
              />
            ))}
          </Fragment>
        )
      }
      {...rest}
    >
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
    </Tooltip>
  );
};

Dropdown.propTypes = {
  onItemSelect: func.isRequired,
  /** Show the tooltip arrow or not */
  arrow: bool,
  /** Show the default caret triangle or not */
  caret: bool,
  children: node,
  className: string,
  /** Pass down content in place of options */
  content: node,
  /** if true, the dropdown will open when hovered */
  hover: bool,
  /** Makes the dropdown controlled */
  isOpen: bool,
  /** If true, will not focus the first element */
  noFocus: bool,
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
  position: string,
  styleMode: string,
  /** Fired when the dropdown is opened or closed */
  tipContainerClassName: string,
  toggle: func,
  value: oneOfType([string, number]),
  valueClassName: string,
};

Dropdown.defaultProps = {
  arrow: false,
  caret: true,
  children: null,
  className: '',
  content: null,
  hover: false,
  isOpen: false,
  noFocus: false,
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
