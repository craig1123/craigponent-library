import React from 'react';
import { node, oneOfType, string, bool } from 'prop-types';

import styles from './sectionHeader.module.scss';

const SectionHeader = props => {
  const {
    border,
    children,
    className,
    headerClassName,
    leftSideClassName,
    rightSide,
    rightSideClassName,
    styleMode,
    ...rest
  } = props;

  const darkMode = styleMode === 'dark' ? styles.dark : '';
  const borderClass = border ? styles.border : '';
  const wrapperClass = `${
    styles['header-wrapper']
  } ${borderClass} ${darkMode} ${className}`.trim();
  const headerClass = `${styles.header} ${headerClassName}`.trim();

  return (
    <div className={wrapperClass} {...rest}>
      <div className={leftSideClassName}>
        <h2 className={headerClass}>{children}</h2>
      </div>
      {rightSide && <div className={rightSideClassName}>{rightSide}</div>}
    </div>
  );
};

SectionHeader.propTypes = {
  children: oneOfType([string, node]).isRequired,
  /** shows the border bottom below the title */
  border: bool,
  className: string,
  headerClassName: string,
  leftSideClassName: string,
  rightSide: node,
  rightSideClassName: string,
  styleMode: string,
};

SectionHeader.defaultProps = {
  border: true,
  className: '',
  headerClassName: '',
  leftSideClassName: '',
  rightSide: null,
  rightSideClassName: '',
  styleMode: 'light',
};

export default SectionHeader;
