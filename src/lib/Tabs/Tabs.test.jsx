import React from 'react';
import { mount } from 'enzyme';
import Tabs from './Tabs';

const tabs = ['Buy', 'Sell'];
const otherProps = {
  activeTab: 0,
  onClick: () => {},
};

describe('Tabs', () => {
  it('should pass other props down', () => {
    const wrapper = mount(
      <Tabs {...otherProps} data-testprop="testvalue">
        Portfolio
      </Tabs>,
    );
    expect(wrapper.prop('data-testprop')).toContain('testvalue');
  });

  it('should render in dark mode', () => {
    const wrapper = mount(
      <Tabs {...otherProps} tabs={tabs} styleMode="dark" />,
    );
    expect(wrapper.prop('styleMode')).toContain('dark');
  });

  it('should accept the activeTabClass prop', () => {
    const wrapper = mount(
      <Tabs {...otherProps} tabs={tabs} activeTabClass="active" />,
    );
    expect(wrapper.find('.active').exists()).toBeTruthy();
  });

  it('should pass tabClass down', () => {
    const wrapper = mount(<Tabs {...otherProps} tabs={tabs} tabClass="tab" />);
    expect(wrapper.find('.tab').exists()).toBeTruthy();
  });

  it('should accept a different duration and should be active', () => {
    const duration = 1000;
    const wrapper = mount(
      <Tabs {...otherProps} tabs={tabs} duration={duration} />,
    );
    expect(
      wrapper
        .find('a')
        .at(0)
        .prop('style'),
    ).toHaveProperty(
      'transition',
      `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
    );
  });

  it('should update the activeTab with the onClick method', () => {
    let activeTab = 0;
    const onClick = tab => {
      activeTab = tab;
    };
    const wrapper = mount(
      <Tabs
        {...otherProps}
        activeTab={activeTab}
        tabs={tabs}
        onClick={onClick}
      />,
    );
    expect(activeTab).toBe(0);

    wrapper
      .find('a')
      .at(1)
      .simulate('click');
    expect(activeTab).toBe(1);

    wrapper
      .find('a')
      .at(0)
      .simulate('keyPress', { keyCode: 13 });
    expect(activeTab).toBe(0);

    // test keypress, but not on the enter key
    wrapper
      .find('a')
      .at(1)
      .simulate('keyPress', { keyCode: 0 });
    expect(activeTab).toBe(0);
  });

  describe('Indicator', () => {});
});
