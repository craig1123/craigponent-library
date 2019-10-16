import React from 'react';
import { mount } from 'enzyme';
import TabItem from './TabItem';

const otherProps = {
  duration: 300,
  innerRef: () => {},
  isActiveTab: false,
};

describe('TabItem', () => {
  const children = 'Portfolio';
  it('should pass other props down', () => {
    const wrapper = mount(
      <TabItem {...otherProps} data-testprop="testvalue">
        {children}
      </TabItem>,
    );
    expect(wrapper.find('a').prop('data-testprop')).toContain('testvalue');
  });

  it('should render in dark mode', () => {
    const wrapper = mount(
      <TabItem {...otherProps} styleMode="dark">
        {children}
      </TabItem>,
    );
    expect(wrapper.prop('styleMode')).toBe('dark');
  });

  it('should accept the activeTabClass prop', () => {
    const wrapper = mount(
      <TabItem {...otherProps} isActiveTab activeTabClass="active">
        {children}
      </TabItem>,
    );
    expect(wrapper.find('.active').exists()).toBeTruthy();
  });

  it('should pass tabClass down', () => {
    const wrapper = mount(
      <TabItem {...otherProps} tabClass="tab">
        {children}
      </TabItem>,
    );
    expect(wrapper.find('.tab').exists()).toBeTruthy();
  });

  it('should accept a different duration and should be active', () => {
    const duration = 1000;
    const wrapper = mount(
      <TabItem {...otherProps} isActiveTab duration={duration}>
        {children}
      </TabItem>,
    );
    expect(wrapper.find('a').prop('style')).toHaveProperty(
      'transition',
      `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
    );
  });
});
