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
      <label htmlfor={name} className={styles['form-check-label']}> {/* eslint-disable-line */}
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
  invalid: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  styleMode: PropTypes.string,
  valid: PropTypes.string,
  warning: PropTypes.string,
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
