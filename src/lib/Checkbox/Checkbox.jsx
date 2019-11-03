/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './checkbox.module.scss';

const Checkbox = ({
  className,
  innerRef,
  invalid,
  label,
  name,
  styleMode,
  valid,
  warning,
  wrapperClass,
  ...attributes
}) => {
  const invalidClass = invalid ? styles.invalid : '';
  const validClass = valid ? styles.valid : '';
  const warningClass = warning ? styles.warning : '';
  const darkMode = styleMode === 'dark' ? styles.dark : '';
  const labelClass = `${
    styles['form-check-label']
  } ${invalidClass} ${warningClass} ${validClass}`.trim();
  const inputClassName = `${
    styles['form-checkbox']
  } ${darkMode} ${invalidClass} ${warningClass} ${validClass} ${className}`.trim();

  return (
    <div className={`${styles['checkbox-wrapper']} ${wrapperClass}`.trim()}>
      <label htmlFor={name} className={labelClass}>
        <input
          {...attributes}
          ref={innerRef}
          id={name}
          name={name}
          className={inputClassName}
          type="checkbox"
        />
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  invalid: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  styleMode: PropTypes.string,
  valid: PropTypes.bool,
  warning: PropTypes.bool,
  wrapperClass: PropTypes.string,
};

Checkbox.defaultProps = {
  className: '',
  innerRef: null,
  invalid: false,
  label: null,
  name: null,
  styleMode: 'light',
  valid: false,
  warning: false,
  wrapperClass: '',
};

export default Checkbox;
