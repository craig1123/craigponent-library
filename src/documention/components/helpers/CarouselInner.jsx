import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../lib';
import styles from './carouselInner.module.scss';

const CarouselInner = ({
  body,
  icon,
  linkTitle,
  title,
  action,
  children,
  styleMode,
  buttonPosition,
}) => {
  const darkMode = styleMode === 'dark' ? styles.dark : '';
  const buttonPositionClass = buttonPosition === 'middle' ? styles.middle : '';

  return (
    <div
      className={`${
        styles['carousel-item-wrapper']
      } ${darkMode} ${buttonPositionClass}`}
    >
      <div className={`${styles['icon-wrapper']} ${darkMode}`}>{icon}</div>
      <div className={`${styles['carousel-item-title']} ${darkMode}`}>
        {title}
      </div>
      <p
        className={`${
          styles['carousel-item-body']
        } ${darkMode} ${buttonPositionClass}`}
      >
        {body}
      </p>
      <div className={`${styles['carousel-item-link-wrapper']} ${darkMode}`}>
        {action && (
          <Button
            className={styles['carousel-item-link']}
            onClick={action}
            size="sm"
          >
            {linkTitle}
          </Button>
        )}
        {children}
      </div>
    </div>
  );
};

CarouselInner.propTypes = {
  body: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  buttonPosition: PropTypes.string,
  children: PropTypes.node,
  linkTitle: PropTypes.string,
  styleMode: PropTypes.string,
};

CarouselInner.defaultProps = {
  action: null,
  children: null,
  linkTitle: '',
  styleMode: '',
  buttonPosition: '',
};

export default CarouselInner;
