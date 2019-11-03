/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './radio.module.scss';

const Radio = ({
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
  const inputClassName = `${
    styles['form-radio']
  } ${darkMode} ${className} ${invalidClass} ${validClass} ${warningClass}`.trim();

  return (
    <div className={`${styles['radio-wrappers']} ${wrapperClass}`.trim()}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={styles['form-check-label']}>
        <input
          {...attributes}
          ref={innerRef}
          name={name}
          className={inputClassName}
          type="radio"
        />
        {label}
      </label>
    </div>
  );
};

Radio.propTypes = {
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

Radio.defaultProps = {
  className: '',
  innerRef: null,
  invalid: null,
  label: null,
  name: null,
  styleMode: 'light',
  valid: null,
  warning: null,
  wrapperClass: '',
};

export default Radio;
