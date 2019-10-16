import React from 'react';
import { shallow } from 'enzyme';
import Radio from './Radio';

describe('Radio', () => {
  it('should pass wrapperClass down', () => {
    const wrapper = shallow(<Radio wrapperClass="wrapper" />);

    expect(wrapper.find('.wrapper').exists()).toBeTruthy();
  });

  it('should pass down className to the input', () => {
    const wrapper = shallow(<Radio className="hi" />);

    expect(wrapper.find('input').hasClass('hi')).toBeTruthy();
  });

  it('should pass other props down to the input', () => {
    const wrapper = shallow(<Radio data-test="test" />);

    expect(wrapper.find('input').prop('data-test')).toBe('test');
  });

  it('input should be type="radio"', () => {
    const wrapper = shallow(<Radio />);

    expect(wrapper.find('input').prop('type')).toBe('radio');
  });

  it('should render a label', () => {
    const wrapper = shallow(<Radio label="Cool Radio" />);

    expect(wrapper.find('label').text()).toBe(' Cool Radio');
  });
});
