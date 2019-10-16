import React from 'react';
import { mount } from 'enzyme';
import Input from './Input';

describe('Input', () => {
  it('should pass wrapperClass down', () => {
    const wrapper = mount(<Input wrapperClass="wrapper" />);

    expect(wrapper.find('.wrapper').exists()).toBeTruthy();
  });

  it('should pass down className to the input', () => {
    const wrapper = mount(<Input className="hi" />);

    expect(wrapper.find('input').hasClass('hi')).toBeTruthy();
  });

  it('should pass other props down to the input', () => {
    const wrapper = mount(<Input data-test="test" type="toggle" />);

    expect(wrapper.find('input').prop('data-test')).toBe('test');
  });

  it('should render children to select', () => {
    const wrapper = mount(
      <Input type="select" label="select">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </Input>,
    );

    expect(wrapper.find('select').children().length).toEqual(3);
  });

  // Texts under Input
  it('should render formText', () => {
    const wrapper = mount(<Input formText="hi" type="radio" />);
    expect(wrapper.find('small').text()).toBe('hi');
  });
  it('should render invalidText', () => {
    const wrapper = mount(<Input invalidText="hi" type="checkbox" />);
    expect(wrapper.find('small').text()).toBe('hi');
  });
  it('should render validText', () => {
    const wrapper = mount(<Input validText="hi" type="select" />);
    expect(wrapper.find('small').text()).toBe('hi');
  });
  it('should render warningText', () => {
    const wrapper = mount(<Input warningText="hi" />);
    expect(wrapper.find('small').text()).toBe('hi');
  });

  it('should render a label', () => {
    const wrapper = mount(<Input label="Cool Input" />);

    expect(wrapper.find('label').text()).toBe('Cool Input');
  });

  it('should render leftAddOn', () => {
    const wrapper = mount(<Input leftAddOn="$" wrapperClass="wrap" />);

    expect(
      wrapper
        .find('.wrap')
        .find('div')
        .at(0)
        .text(),
    ).toBe('$');
  });

  it('should render rightAddOn', () => {
    const wrapper = mount(<Input rightAddOn="$" wrapperClass="wrap" />);

    expect(
      wrapper
        .find('.wrap')
        .find('div')
        .at(0)
        .text(),
    ).toBe('$');
  });

  it('should render leftIcon', () => {
    const wrapper = mount(<Input leftIcon="$" wrapperClass="wrap" />);

    expect(
      wrapper
        .find('.wrap')
        .find('div')
        .at(0)
        .text(),
    ).toBe('$');
  });

  it('should render rightIcon', () => {
    const wrapper = mount(<Input rightIcon="$" wrapperClass="wrap" />);

    expect(
      wrapper
        .find('.wrap')
        .find('div')
        .at(0)
        .text(),
    ).toBe('$');
  });
});
