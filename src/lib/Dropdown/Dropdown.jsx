import React, { Fragment, useRef } from 'react';
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
  onChange,
  onClose,
  onOpen,
  options,
  styleMode,
  value,
  valueClassName,
  ...rest
}) => {
  const childrenRef = useRef(null);
  const firstOptionRef = useRef(null);
  const darkMode = styleMode === 'dark' ? 'dark' : '';
  const dropdownStyles = `${styles['dropdown-container']} ${
    darkMode ? styles.dark : ''
  } ${className}`.trim();
  const onDropdownOpen = () => {
    if (firstOptionRef.current) {
      firstOptionRef.current.focus();
    }

    if (onOpen) {
      onOpen();
    }
  };

  const onDropdownClose = () => {
    if (childrenRef.current) {
      childrenRef.current.focus();
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <Tooltip
      backgroundColor={darkMode === 'dark' ? '#181818' : '#fff'}
      className={dropdownStyles}
      onClose={onDropdownClose}
      onOpen={onDropdownOpen}
      tipContainerClassName={styles['tip-dropdown-container']}
      content={
        <Fragment>
          {options.map((option, i) => (
            <DropdownItem
              innerRef={i === 0 ? firstOptionRef : null}
              option={option}
              onChange={onChange}
              key={option.name}
              styleMode={styleMode}
            />
          ))}
        </Fragment>
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
          fillColor={darkMode === 'dark' ? '#fff' : '#2f3337'}
        />
      )}
    </Tooltip>
  );
};

Dropdown.propTypes = {
  onChange: func.isRequired,
  options: arrayOf(
    shape({
      name: oneOfType([string, number]).isRequired,
      value: oneOfType([string, number]).isRequired,
      active: bool,
      disabled: bool,
    }),
  ).isRequired,
  /** Show the default caret triangle or not */
  caret: bool,
  children: node,
  className: string,
  /** if true, the dropdown will open when hovered */
  hover: bool,
  onClose: func,
  onOpen: func,
  /** The direction the dropdown will open */
  position: string,
  styleMode: string,
  value: string,
  valueClassName: string,
};

Dropdown.defaultProps = {
  caret: true,
  children: null,
  className: '',
  hover: false,
  onClose: null,
  onOpen: null,
  position: 'bottom',
  styleMode: 'light',
  valueClassName: '',
  value: '',
};

export default Dropdown;
