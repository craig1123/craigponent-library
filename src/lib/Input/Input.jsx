/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './input.module.scss';

const Input = props => {
  const {
    className,
    formText,
    invalidText,
    warningText,
    innerRef,
    label,
    leftAddOn,
    leftIcon,
    name,
    rightAddOn,
    rightIcon,
    size,
    styleMode,
    type,
    validText,
    wrapperClass,
    ...attributes
  } = props;

  const Tag = type === 'textarea' ? type : 'input';
  const invalidClass = invalidText ? styles['is-invalid'] : '';
  const warningClass = warningText ? styles['is-warning'] : '';
  const validClass = validText ? styles['is-valid'] : '';
  const darkMode = styleMode === 'dark' ? styles.dark : '';
  const formControlClass = `${styles['form-control']} ${styles[size]}`;

  const inputClassName = `${formControlClass} ${invalidClass} ${warningClass} ${darkMode} ${validClass} ${className}`.trim();

  if (Tag === 'input') {
    attributes.type = type;
  }

  let element = (
    <div className={styles['input-wrapper']}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      {leftIcon && (
        <div
          className={`${styles.icon} ${styles['left-icon']} ${styles[size]}`}
        >
          {leftIcon}
        </div>
      )}
      <Tag
        ref={innerRef}
        name={name}
        id={name}
        className={`${inputClassName} ${
          leftIcon ? styles['input-icon-left'] : ''
        } ${rightIcon ? styles['input-icon-right'] : ''}`}
        {...attributes}
      />
      {rightIcon && (
        <div
          className={`${styles.icon} ${styles['right-icon']} ${styles[size]}`}
        >
          {rightIcon}
        </div>
      )}
    </div>
  );
  const inputWrapperClass = styles['form-group'];

  if (leftAddOn || rightAddOn) {
    element = (
      <div className={styles['input-wrapper']}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles['add-on-group']}>
          {leftAddOn && (
            <div
              className={`${styles['add-on']} ${styles['left-add-on']} ${
                styles['left-margin']
              }`}
            >
              {leftAddOn}
            </div>
          )}
          {leftIcon && (
            <div
              className={`${styles.icon} ${styles['left-icon']} ${
                styles[size]
              }`}
            >
              {leftIcon}
            </div>
          )}
          <Tag
            ref={innerRef}
            id={name}
            name={name}
            className={`${inputClassName} ${
              leftIcon ? styles['input-icon-left'] : ''
            } ${rightIcon ? styles['input-icon-right'] : ''} ${
              rightAddOn ? styles['left-add-on'] : styles['right-add-on']
            }`}
            {...attributes}
          />
          {rightIcon && (
            <div
              className={`${styles.icon} ${styles['right-icon']} ${
                styles[size]
              }`}
            >
              {rightIcon}
            </div>
          )}
          {rightAddOn && (
            <div
              className={`${styles['add-on']} ${styles['right-add-on']} ${
                styles['right-margin']
              }`}
            >
              {rightAddOn}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${inputWrapperClass} ${wrapperClass}`.trim()}>
      {element}
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

Input.propTypes = {
  className: PropTypes.string,
  formText: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  invalidText: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  leftAddOn: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  leftIcon: PropTypes.node,
  name: PropTypes.string,
  rightAddOn: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  rightIcon: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  styleMode: PropTypes.string,
  type: PropTypes.string,
  validText: PropTypes.string,
  warningText: PropTypes.string,
  wrapperClass: PropTypes.string,
};

Input.defaultProps = {
  className: '',
  formText: null,
  innerRef: null,
  invalidText: null,
  warningText: null,
  label: null,
  leftAddOn: null,
  leftIcon: null,
  name: null,
  rightAddOn: null,
  rightIcon: null,
  size: 'lg',
  styleMode: 'light',
  type: 'text',
  validText: null,
  wrapperClass: '',
};

export default Input;
