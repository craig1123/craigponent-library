import React from 'react';
import { Tabs } from '../../../lib';

import styles from './customTabs.module.scss';

const CustomTab = props => (
  <Tabs
    activeTabClass={styles['active-tab-class']}
    tabClass={styles['tab-class']}
    {...props}
  />
);

export default CustomTab;
