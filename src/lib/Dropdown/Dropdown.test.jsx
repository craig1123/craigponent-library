import React from 'react';
import { shallow, mount } from 'enzyme';
import Tooltip from '../Tooltip/Tooltip';
import Dropdown from './Dropdown';

const options = [
  { value: '0', name: '0' },
  { value: '1', name: '1' },
  { value: '2', name: '2' },
];

const noop = () => {};

describe('Dropdown', () => {
  it('should be a Tooltip', () => {
    const tooltip = shallow(
      <Dropdown value="0" onChange={noop} options={options} />,
    );

    expect(JSON.stringify(tooltip.type())).toBe(JSON.stringify(Tooltip));
  });

  it('should pass down all attributes', () => {
    const wrapper = shallow(
      <Dropdown
        value="0"
        onChange={noop}
        options={options}
        data-table="true"
      />,
    );

    expect(wrapper.prop('data-table')).toContain('true');
  });

  it('should handle the caret prop', () => {
    const svgWrapper = mount(
      <Dropdown value="0" onChange={noop} options={options} />,
    );
    const noSvgWrapper = mount(
      <Dropdown value="0" onChange={noop} options={options} caret={false} />,
    );

    expect(svgWrapper.find('svg').exists()).toEqual(true);
    expect(noSvgWrapper.find('svg').exists()).toEqual(false);
  });

  it('should handle the styleMode prop', () => {
    const lightWrapper = mount(
      <Dropdown value="0" onChange={noop} options={options} />,
    );
    const darkWrapper = mount(
      <Dropdown value="0" onChange={noop} options={options} styleMode="dark" />,
    );

    expect(
      lightWrapper
        .find('g')
        .hostNodes()
        .prop('fill'),
    ).toEqual('#2f3337');
    expect(
      darkWrapper
        .find('g')
        .hostNodes()
        .prop('fill'),
    ).toEqual('#fff');
  });

  it('should handle the selecting a value', () => {
    let myOption = '';
    const onChange = option => {
      myOption = option.name;
    };
    const wrapper = mount(
      <Dropdown value={myOption} onChange={onChange} options={options} />,
    );
    wrapper
      .find('div[role="button"]')
      .at(1)
      .simulate('click');
    expect(myOption).toEqual('1');

    wrapper
      .find('div[role="button"]')
      .at(2)
      .simulate('click');
    expect(myOption).toEqual('2');
  });
});
