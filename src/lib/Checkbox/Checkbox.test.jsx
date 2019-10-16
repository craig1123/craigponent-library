import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('should pass wrapperClass down', () => {
    const wrapper = shallow(<Checkbox wrapperClass="wrapper" />);

    expect(wrapper.find('.wrapper').exists()).toBeTruthy();
  });

  it('should pass down className to the input', () => {
    const wrapper = shallow(<Checkbox className="hi" />);

    expect(wrapper.find('input').hasClass('hi')).toBeTruthy();
  });

  it('should pass other prop attributes down to the input', () => {
    const wrapper = shallow(<Checkbox data-test="test" />);

    expect(wrapper.find('input').prop('data-test')).toBe('test');
  });

  it('input should be type="checkbox"', () => {
    const wrapper = shallow(<Checkbox />);

    expect(wrapper.find('input').prop('type')).toBe('checkbox');
  });

  it('should render a label', () => {
    const wrapper = shallow(<Checkbox label="Cool Checkbox" />);

    expect(wrapper.find('label').text()).toBe(' Cool Checkbox');
  });
});
