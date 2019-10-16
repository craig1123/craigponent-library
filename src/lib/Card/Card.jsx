import React from 'react';
import { oneOfType, string, func, shape, arrayOf, node } from 'prop-types';

import styles from './card.module.scss';

const Card = ({
  bodyClassName,
  children,
  className,
  styleMode,
  titleClassName,
  title,
  titleProps,
  titleTag: TitleTag,
  ...rest
}) => {
  const darkMode = styleMode === 'dark' ? styles.dark : '';
  const cardClassName = `${
    styles['card-wrapper']
  } ${darkMode} ${className}`.trim();
  return (
    <div className={cardClassName} {...rest}>
      {title && (
        <TitleTag
          className={`${styles['card-heading']} ${titleClassName}`.trim()}
          {...titleProps}
        >
          {title}
        </TitleTag>
      )}
      <div className={`${styles['card-body']} ${bodyClassName}`.trim()}>
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  bodyClassName: string,
  children: oneOfType([node, string]),
  className: string,
  styleMode: string,
  title: oneOfType([string, node]),
  titleClassName: string,
  titleProps: shape({}),
  titleTag: oneOfType([
    func,
    string,
    shape({}),
    arrayOf(oneOfType([func, string, shape({})])),
  ]),
};

Card.defaultProps = {
  bodyClassName: '',
  children: null,
  className: '',
  styleMode: 'light',
  title: null,
  titleClassName: '',
  titleProps: null,
  titleTag: 'div',
};

export default Card;
