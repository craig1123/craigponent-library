/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './toggle.module.scss';

const Toggle = ({ innerRef, name, wrapperClass, ...attributes }) => (
  <div className={`${styles['form-group']} ${wrapperClass}`.trim()}>
    <label htmlfor={name} className={styles['form-toggle']}> {/* eslint-disable-line */}
      <input {...attributes} ref={innerRef} name={name} type="checkbox" />
      <span className={styles['form-toggle-slider']} />
    </label>
  </div>
);

Toggle.propTypes = {
  name: PropTypes.string.isRequired,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  wrapperClass: PropTypes.string,
};

Toggle.defaultProps = {
  innerRef: null,
  wrapperClass: '',
};

export default Toggle;
