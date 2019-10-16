import React from 'react';
import { string, shape, bool, number, oneOfType, func } from 'prop-types';

import styles from './dropdown.module.scss';

function DropdownItem({ option, onChange, innerRef, styleMode }) {
  const { value, name, disabled, active } = option;
  const darkMode = styleMode === 'dark' ? styles.dark : '';
  if (`${value}`.toLowerCase() === 'separator') {
    return <div className={`${styles['dropdown-separator']} ${darkMode}`} />;
  }

  const handleChange = e => {
    if (disabled) {
      return;
    }

    onChange(option, e);
    // HACK: if anyone can solve this, congrats. Otherwise, waiting until rewrite of tooltip to support controlled
    setTimeout(() => {
      document.body.firstElementChild.click();
    }, 0);
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
  onChange: func.isRequired,
  option: shape({
    name: oneOfType([string, number]).isRequired,
    value: oneOfType([string, number]).isRequired,
    active: bool,
    disabled: bool,
  }).isRequired,
  styleMode: string.isRequired,
  innerRef: shape({}),
};

DropdownItem.defaultProps = {
  innerRef: null,
};

export default DropdownItem;
