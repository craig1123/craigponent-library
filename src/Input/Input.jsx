/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './input.module.scss';

const Input = props => {
  const {
    className,
    children,
    formText,
    invalidText,
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
  const validClass = validText ? styles['is-valid'] : '';
  const darkMode = styleMode === 'dark' ? styles.dark : '';
  let formControlClass = `${styles['form-control']} ${styles[size]}`;

  if (type === 'radio') {
    formControlClass = styles['form-radio'];
  } else if (type === 'checkbox') {
    formControlClass = styles['form-checkbox'];
  }

  const inputClassName = `${formControlClass} ${invalidClass} ${darkMode} ${validClass} ${className}`.trim();

  if (Tag === 'input') {
    attributes.type = type;
  }

  let element = (
    <>
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
        {...attributes}
        ref={innerRef}
        name={name}
        className={`${inputClassName} ${
          leftIcon ? styles['input-icon-left'] : ''
        } ${rightIcon ? styles['input-icon-right'] : ''}`}
      />
      {rightIcon && (
        <div
          className={`${styles.icon} ${styles['right-icon']} ${styles[size]}`}
        >
          {rightIcon}
        </div>
      )}
    </>
  );
  let inputWrapperClass = styles['form-group'];

  if (leftAddOn || rightAddOn) {
    element = (
      <>
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
            {...attributes}
            ref={innerRef}
            name={name}
            className={`${inputClassName} ${
              leftIcon ? styles['input-icon-left'] : ''
            } ${rightIcon ? styles['input-icon-right'] : ''} ${
              rightAddOn ? styles['left-add-on'] : styles['right-add-on']
            }`}
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
      </>
    );
  } else if (type === 'select') {
    element = (
      <>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}
        <select {...attributes} ref={innerRef} className={inputClassName}>
          {children}
        </select>
      </>
    );
  } else if (type === 'radio' || type === 'checkbox') {
    inputWrapperClass = styles['radio-wrappers'];
    element = (
      <label htmlFor={name} className={styles['form-check-label']}>
        <input
          {...attributes}
          ref={innerRef}
          name={name}
          className={inputClassName}
        />
        {label}
      </label>
    );
  } else if (type === 'toggle') {
    element = (
      <label htmlFor={name} className={styles['form-toggle']}> {/* eslint-disable-line */}
        <input {...attributes} ref={innerRef} name={name} type="checkbox" />
        <span className={styles['form-toggle-slider']} />
      </label>
    );
  }

  return (
    <div className={`${inputWrapperClass} ${wrapperClass}`.trim()}>
      {element}
      {(invalidText || validText || formText) && (
        <small
          className={`${styles['small-text']} ${
            validText ? validClass : invalidClass
          }`}
        >
          {validText || invalidText || formText}
        </small>
      )}
    </div>
  );
};

Input.propTypes = {
  children: PropTypes.node,
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
  wrapperClass: PropTypes.string,
};

Input.defaultProps = {
  className: '',
  children: null,
  formText: null,
  innerRef: null,
  invalidText: null,
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
