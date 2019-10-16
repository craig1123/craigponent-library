import React from 'react';
import PropTypes from 'prop-types';

import styles from './tab-item.module.scss';

const TabItem = ({
  activeTabClass,
  isActiveTab,
  children,
  duration,
  linkTag: LinkTag,
  tabClass,
  innerRef,
  styleMode,
  ...restProps
}) => {
  const darkMode = styleMode === 'dark' ? styles.dark : '';
  let itemClasses = `${styles['item-link']} ${tabClass}`.trim();
  const style = {};

  if (isActiveTab) {
    style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`;
    itemClasses = `${itemClasses} ${
      styles['active-item']
    } ${activeTabClass}`.trim();
  }

  const itemWrapperClasses = `${styles['tab-item']} ${darkMode}`.trim();

  return (
    <li className={itemWrapperClasses} ref={innerRef}>
      <LinkTag style={style} className={itemClasses} {...restProps}>
        {children}
      </LinkTag>
    </li>
  );
};

TabItem.propTypes = {
  children: PropTypes.node.isRequired,
  activeTabClass: PropTypes.string,
  duration: PropTypes.number,
  innerRef: PropTypes.func,
  isActiveTab: PropTypes.bool,
  linkTag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  styleMode: PropTypes.string,
  tabClass: PropTypes.string,
};

TabItem.defaultProps = {
  activeTabClass: '',
  duration: 300,
  innerRef: null,
  isActiveTab: false,
  linkTag: 'a',
  styleMode: 'light',
  tabClass: '',
};

export default TabItem;
