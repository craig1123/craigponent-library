import React, { Component } from 'react';
import { Tabs, TabItem } from '../../../lib';

const menuItems = [
  'Personal Data',
  'Bank Accounts',
  'Documents',
  'Authorized Users',
];

class TabItemExample extends Component {
  state = { activeTab: 0, tabRefs: [] };

  onClick = tab => e => {
    e.preventDefault();
    this.setState({ activeTab: tab });
  };

  handleKeyboard = tab => e => {
    const code = e.keyCode || e.which;

    if (code === 13) {
      this.onClick(tab)(e);
    }
  };

  handleRefs = index => tabElement => {
    if (!this.state.tabRefs[index]) {
      this.setState(prevState => {
        const { tabRefs } = prevState;
        tabRefs[index] = tabElement;

        return { ...prevState, tabRefs };
      });
    }
  };

  render() {
    const { activeTab, tabRefs } = this.state;
    return (
      <Tabs activeTab={activeTab} styleMode="dark" tabRefs={tabRefs}>
        {menuItems.map((item, i) => (
          <TabItem
            key={item}
            innerRef={this.handleRefs(i)}
            isActiveTab={activeTab === i}
            onClick={this.onClick(i)}
            onKeyPress={this.handleKeyboard(i)}
            styleMode="dark"
          >
            {item}
          </TabItem>
        ))}
      </Tabs>
    );
  }
}

export default TabItemExample;
