/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './select.module.scss';

const Select = ({
  className,
  children,
  formText,
  invalidText,
  warningText,
  innerRef,
  label,
  name,
  size,
  styleMode,
  validText,
  wrapperClass,
  ...attributes
}) => {
  const invalidClass = invalidText ? styles['is-invalid'] : '';
  const warningClass = warningText ? styles['is-warning'] : '';
  const validClass = validText ? styles['is-valid'] : '';
  const darkMode = styleMode === 'dark' ? styles.dark : '';
  const formControlClass = `${styles['form-control']} ${styles[size]}`;
  const inputClassName = `${formControlClass} ${invalidClass} ${warningClass} ${darkMode} ${validClass} ${className}`.trim();

  return (
    <div className={`${styles['form-group']} ${wrapperClass}`.trim()}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <select
        name={name}
        id={name}
        ref={innerRef}
        className={inputClassName}
        {...attributes}
      >
        {children}
      </select>
      {(invalidText || validText || formText || warningText) && (
        <small
          className={`${
            styles['small-text']
          } ${validClass} ${invalidClass} ${warningClass}`}
        >
          {validText || invalidText || warningText || formText}
        </small>
      )}
    </div>
  );
};

Select.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  formText: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  invalidText: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  styleMode: PropTypes.string,
  validText: PropTypes.string,
  warningText: PropTypes.string,
  wrapperClass: PropTypes.string,
};

Select.defaultProps = {
  className: '',
  children: null,
  formText: null,
  innerRef: null,
  invalidText: null,
  warningText: null,
  label: null,
  name: null,
  size: 'lg',
  styleMode: 'light',
  validText: null,
  wrapperClass: '',
};

export default Select;
