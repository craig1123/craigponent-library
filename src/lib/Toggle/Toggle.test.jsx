import React from 'react';
import { shallow } from 'enzyme';
import Toggle from './Toggle';

describe('Toggle', () => {
  it('should pass wrapperClass down', () => {
    const wrapper = shallow(<Toggle name="toggle" wrapperClass="wrapper" />);

    expect(wrapper.find('.wrapper').exists()).toBeTruthy();
  });

  it('should pass down className to the input', () => {
    const wrapper = shallow(<Toggle name="toggle" className="hi" />);

    expect(wrapper.find('input').hasClass('hi')).toBeTruthy();
  });

  it('should pass other props down to the input', () => {
    const wrapper = shallow(<Toggle name="toggle" data-test="test" />);

    expect(wrapper.find('input').prop('data-test')).toBe('test');
  });
});
