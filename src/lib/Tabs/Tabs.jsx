/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import TabItem from '../TabItem/TabItem';
import Indicator from './Indicator';

import styles from './tabs.module.scss';

class Tabs extends React.Component {
  state = { tabsElements: this.props.tabRefs || [] };

  onClick = tab => e => {
    e.preventDefault();
    if (this.props.onClick) {
      this.props.onClick(tab);
    }
  };

  handleKeyboard = tab => e => {
    const code = e.keyCode || e.which;

    if (code === 13) {
      this.onClick(tab)(e);
    }
  };

  handleRefs = index => tabElement => {
    if (!this.state.tabsElements[index]) {
      this.setState(prevState => {
        const { tabsElements } = prevState;
        tabsElements[index] = tabElement;

        return { tabsElements };
      });
    }
  };

  mapTabs = (tab, index) => (
    <TabItem
      key={index}
      tabClass={this.props.tabClass}
      activeTabClass={this.props.activeTabClass}
      duration={this.props.duration}
      innerRef={this.handleRefs(index)}
      isActiveTab={this.props.activeTab === index}
      linkTag={this.props.linkTag}
      onClick={this.onClick(index)}
      onKeyPress={this.handleKeyboard(index)}
      styleMode={this.props.styleMode}
    >
      {tab}
    </TabItem>
  );

  render() {
    const {
      activeTabClass,
      activeTab,
      children,
      className,
      duration,
      indicatorClass,
      indicatorColor,
      linkTag,
      onClick,
      styleMode,
      tabClass,
      tabs,
      tabRefs,
      ...rest
    } = this.props;
    const { tabsElements } = this.state;

    const darkMode = styleMode === 'dark' ? styles.dark : '';
    const classes = `${styles.tabs} ${darkMode} ${className}`.trim();

    return (
      <div className={classes} {...rest}>
        <ul className={styles['tab-list']}>
          {children || !tabs ? children : tabs.map(this.mapTabs)}
        </ul>
        <Indicator
          indicatorClass={indicatorClass}
          activeTabElement={tabsElements[activeTab]}
          indicatorColor={indicatorColor}
          duration={duration}
        />
      </div>
    );
  }
}

Tabs.propTypes = {
  activeTab: PropTypes.number.isRequired,
  activeTabClass: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  duration: PropTypes.number,
  indicatorClass: PropTypes.string,
  indicatorColor: PropTypes.string,
  linkTag: PropTypes.string,
  onClick: PropTypes.func,
  styleMode: PropTypes.string,
  tabClass: PropTypes.string, // eslint-disable-line
  tabRefs: PropTypes.array, // eslint-disable-line
  tabs: PropTypes.array, // eslint-disable-line
};

Tabs.defaultProps = {
  activeTabClass: '',
  children: null,
  indicatorColor: '#00CE7D',
  indicatorClass: '',
  className: '',
  duration: 300, // in ms
  linkTag: 'a',
  onClick: null,
  tabClass: '',
  styleMode: 'light',
  tabs: [],
  tabRefs: null,
};

export default Tabs;
