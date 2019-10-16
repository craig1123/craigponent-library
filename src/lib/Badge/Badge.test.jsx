import React from 'react';
import { shallow, mount } from 'enzyme';
import Badge from './Badge';

describe('Badge', () => {
  it('should render children', () => {
    const wrapper = shallow(<Badge>Yo!</Badge>);
    expect(wrapper.text()).toBe('Yo!');
  });

  it('should render nothing if no children', () => {
    const wrapper = shallow(<Badge />);
    expect(wrapper.text()).toEqual('');
  });

  it('should render Badges with other types', () => {
    const wrapper = mount(<Badge type="danger">Danger Badge</Badge>);
    expect(wrapper.prop('type')).toBe('danger');
  });

  it('should pass className down', () => {
    const wrapper = shallow(<Badge className="test-class-name">Yo!</Badge>);
    expect(wrapper.prop('className')).toContain('test-class-name');
  });

  it('should pass other props down', () => {
    const badge = shallow(<Badge data-testprop="testvalue">Yo!</Badge>);
    expect(badge.prop('data-testprop')).toContain('testvalue');
  });
});
