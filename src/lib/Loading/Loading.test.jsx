import React from 'react';
import { shallow, mount } from 'enzyme';
import Loading from './Loading';

describe('Loading', () => {
  it('should pass other props down', () => {
    const wrapper = shallow(<Loading data-testprop="testvalue" />);
    expect(wrapper.prop('data-testprop')).toContain('testvalue');
  });

  it('should have the right color', () => {
    const color = '#fff';
    const wrapper = mount(<Loading color={color} />);
    const divStyle = wrapper
      .find('div')
      .at(1)
      .hostNodes()
      .prop('style');
    expect(divStyle).toHaveProperty('border', `1px solid ${color}`);
    expect(divStyle).toHaveProperty(
      'borderColor',
      `${color} transparent transparent transparent`,
    );
  });
});
