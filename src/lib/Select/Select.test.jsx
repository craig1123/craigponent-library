import React from 'react';
import { shallow } from 'enzyme';
import Select from './Select';

describe('Select', () => {
  it('should pass wrapperClass down', () => {
    const wrapper = shallow(<Select wrapperClass="wrapper" />);

    expect(wrapper.find('.wrapper').exists()).toBeTruthy();
  });

  it('should pass down className to the select', () => {
    const wrapper = shallow(<Select className="hi" />);

    expect(wrapper.find('select').hasClass('hi')).toBeTruthy();
  });

  it('should pass other props down to the select', () => {
    const wrapper = shallow(<Select data-test="test" type="toggle" />);

    expect(wrapper.find('select').prop('data-test')).toBe('test');
  });

  it('should render children to select', () => {
    const wrapper = shallow(
      <Select label="select">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </Select>,
    );

    expect(wrapper.find('select').children().length).toEqual(3);
  });

  // Texts under Select
  it('should render formText', () => {
    const wrapper = shallow(<Select formText="hi" />);
    expect(wrapper.find('small').text()).toBe('hi');
  });
  it('should render invalidText', () => {
    const wrapper = shallow(<Select invalidText="invalid" />);
    expect(wrapper.find('small').text()).toBe('invalid');
  });
  it('should render validText', () => {
    const wrapper = shallow(<Select validText="valid" />);
    expect(wrapper.find('small').text()).toBe('valid');
  });
  it('should render warningText', () => {
    const wrapper = shallow(<Select warningText="warning" />);
    expect(wrapper.find('small').text()).toBe('warning');
  });

  it('should render a label', () => {
    const wrapper = shallow(<Select label="Cool Select" />);

    expect(wrapper.find('label').text()).toBe('Cool Select');
  });
});
