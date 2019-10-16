/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

// components
import Button from '../../Button/Button';
import LeftArrow from '../../icons/leftArrow.svg';
import RightArrow from '../../icons/rightArrow.svg';

import styles from '../carousel.module.scss';

export const PrevNextButton = ({
  name,
  disabled,
  onClick,
  onMouseEnter,
  onMouseLeave,
  styleMode,
}) => {
  const className = `carousel__${name}-btn-item${
    disabled ? ' __inactive' : ''
  }`;

  return (
    <div className={`${styles[`carousel__${name}-btn`]}`}>
      <div
        className={styles[`carousel__${name}-btn-wrapper`]}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {name === 'prev' ? (
          <Button
            noMargin
            rounded
            disabled={disabled}
            onClick={onClick}
            styleMode={styleMode}
            className={`${styles['arrow-wrapper']} ${
              styles.previous
            } ${className}`}
          >
            <LeftArrow
              fillColor={styleMode === 'dark' ? '#fff' : '#000'}
              height={16}
              width={16}
            />
          </Button>
        ) : (
          <Button
            noMargin
            rounded
            disabled={disabled}
            onClick={onClick}
            styleMode={styleMode}
            className={`${styles['arrow-wrapper']} ${styles.next}`}
          >
            <RightArrow
              fillColor={styleMode === 'dark' ? '#fff' : '#000'}
              height={16}
              width={16}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

PrevNextButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  name: PropTypes.oneOf(['next', 'prev']),
  styleMode: PropTypes.string,
};

PrevNextButton.defaultProps = {
  name: '',
  styleMode: '',
};
