import React from 'react';
import { mount } from 'enzyme';
import ProgressTracker from './ProgressTracker';

const progressTrackerWords = [
  'Create Account',
  'Issuer Info',
  'Offering Info',
  'Submit',
];

describe('ProgressTracker', () => {
  it('should pass className down', () => {
    const wrapper = mount(
      <ProgressTracker
        activeIndex={0}
        items={progressTrackerWords}
        className="hi"
      />,
    );
    expect(wrapper.prop('className')).toContain('hi');
    expect(wrapper.find('ul.hi').exists()).toBeTruthy();
  });

  it('should pass other props down', () => {
    const wrapper = mount(
      <ProgressTracker
        activeIndex={0}
        items={progressTrackerWords}
        data-testprop="testvalue"
      />,
    );
    expect(wrapper.prop('data-testprop')).toContain('testvalue');
  });

  it('should add the color prop', () => {
    const color = '#000';
    const wrapper = mount(
      <ProgressTracker
        activeIndex={1}
        color={color}
        items={progressTrackerWords}
      />,
    );
    const circleNumber = wrapper.find('div[role="button"]');
    expect(circleNumber.prop('style')).toHaveProperty('backgroundColor', color);
    expect(circleNumber.prop('style')).toHaveProperty(
      'border',
      `2px solid ${color}`,
    );
    const activeLi = wrapper
      .find('li')
      .at(0)
      .childAt(1);
    expect(activeLi.prop('style')).toHaveProperty('backgroundColor', color);
  });

  it('should not be able to click on number step that the user has not passed yet', () => {
    const wrapper = mount(
      <ProgressTracker activeIndex={0} items={progressTrackerWords} />,
    );
    const circleNumber = wrapper.find('div[role="button"]');
    expect(circleNumber.exists()).toBeFalsy();
  });

  it('selects the index using selectIndex when clicked on the number circle and has passed that step', () => {
    let activeIndex = 3;
    const selectIndex = index => {
      activeIndex = index;
    };
    const wrapper = mount(
      <ProgressTracker
        activeIndex={activeIndex}
        items={progressTrackerWords}
        selectIndex={selectIndex}
      />,
    );

    expect(activeIndex).toBe(3);

    wrapper
      .find('div[role="button"]')
      .at(1)
      .simulate('click');
    expect(activeIndex).toBe(1);

    wrapper
      .find('div[role="button"]')
      .at(0)
      .simulate('keyPress');
    expect(activeIndex).toBe(0);
  });

  it('should accept the vertical prop', () => {
    const wrapper = mount(
      <ProgressTracker activeIndex={1} items={progressTrackerWords} vertical />,
    );
    expect(wrapper.prop('vertical')).toBe(true);
  });
});
