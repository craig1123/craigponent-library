import React from 'react';
import { string, shape, bool, number, oneOfType, func } from 'prop-types';

import styles from './dropdown.module.scss';

function DropdownItem({
  option,
  onItemSelect,
  setIsDDOpen,
  innerRef,
  styleMode,
  toggle,
}) {
  const { value, name, disabled, active } = option;
  const darkMode = styleMode === 'dark' ? styles.dark : '';
  if (`${value}`.toLowerCase() === 'separator') {
    return <div className={`${styles['dropdown-separator']} ${darkMode}`} />;
  }

  const handleChange = e => {
    if (disabled) {
      return;
    }

    onItemSelect(option, e);
    setIsDDOpen(false);

    if (toggle) {
      toggle(false);
    }
  };

  return (
    <div
      className={`${styles['dropdown-item']} ${darkMode} ${
        active ? styles.active : ''
      } ${disabled ? styles.disabled : ''}`}
      ref={innerRef}
      onClick={handleChange}
      onKeyPress={handleChange}
      role="button"
      tabIndex={disabled ? null : 0}
      value={value}
    >
      {name}
    </div>
  );
}

DropdownItem.propTypes = {
  onItemSelect: func.isRequired,
  option: shape({
    name: oneOfType([string, number]).isRequired,
    value: oneOfType([string, number]).isRequired,
    active: bool,
    disabled: bool,
  }).isRequired,
  setIsDDOpen: func.isRequired,
  styleMode: string.isRequired,
  innerRef: shape({}),
  toggle: func,
};

DropdownItem.defaultProps = {
  innerRef: null,
  toggle: null,
};

export default DropdownItem;
