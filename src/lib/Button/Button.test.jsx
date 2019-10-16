import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  it('should render children', () => {
    const wrapper = shallow(<Button>Ello world</Button>);
    expect(wrapper.find('div').text()).toBe('Ello world');
  });

  it('should render an anchor element if href exists', () => {
    const wrapper = mount(<Button href="/home">Home</Button>);

    expect(wrapper.find('a').hostNodes().length).toBe(1);
    expect(wrapper.find('div').text()).toBe('Home');
  });

  it('should render buttons with default btnType', () => {
    const wrapper = mount(<Button>Default Button</Button>);

    expect(wrapper.prop('btnType')).toBe('default');
  });

  it('should render bordered', () => {
    const wrapper = mount(<Button bordered>Button</Button>);
    expect(wrapper.prop('bordered')).toBe(true);
  });

  it('should render rounded', () => {
    const wrapper = mount(<Button rounded>Button</Button>);
    expect(wrapper.prop('rounded')).toBe(true);
  });

  it('should render noMargin', () => {
    const wrapper = mount(<Button noMargin>Button</Button>);
    expect(wrapper.prop('noMargin')).toBe(true);
  });

  it('should render darkMode', () => {
    const wrapper = mount(<Button styleMode="dark">Button</Button>);
    expect(wrapper.prop('styleMode')).toBe('dark');
  });

  it('should render buttons with other btnTypes', () => {
    const wrapper = mount(<Button btnType="primary">Primary Button</Button>);

    expect(wrapper.prop('btnType')).toBe('primary');
  });

  it('should render buttons at different sizes', () => {
    const small = mount(<Button size="sm">Small Button</Button>);
    const large = mount(<Button size="lg">Large Button</Button>);

    expect(small.prop('size')).toBe('sm');
    expect(large.prop('size')).toBe('lg');
  });

  it('should render a loader in the button', () => {
    const noLoad = mount(<Button>No Load</Button>);
    const load = mount(<Button loading>Loading...</Button>);
    const noLoadLength = noLoad.find('div').hostNodes().length;
    const loadLength = load.find('div').hostNodes().length;
    expect(loadLength >= 2).toBeTruthy();
    expect(noLoadLength === 1).toBeTruthy();
  });

  it('should render block level buttons', () => {
    const block = mount(<Button block>Block Level Button</Button>);

    expect(block.prop('block')).toBe(true);
  });

  it('should have prop type', () => {
    const wrapper = mount(<Button type="submit">Home</Button>);

    expect(
      wrapper
        .find('button')
        .hostNodes()
        .prop('type'),
    ).toBe('submit');
  });

  describe('onClick', () => {
    it('calls props.onClick if it exists', () => {
      const onClick = jest.fn();
      const wrapper = mount(<Button onClick={onClick}>Testing Click</Button>);

      wrapper
        .find('button')
        .hostNodes()
        .simulate('click');
      expect(onClick).toHaveBeenCalled();
    });

    it('is not called when disabled', () => {
      let num = 1;
      const onClick = () => {
        num += 1;
      };
      const wrapper = mount(<Button onClick={onClick}>Testing Click</Button>);

      wrapper.find('button').simulate('click');
      expect(num).toBe(2);

      wrapper.setProps({ disabled: true });
      wrapper.find('button').simulate('click');
      expect(num).toBe(2);

      wrapper.setProps({ disabled: false });
      wrapper.find('button').simulate('click');
      expect(num).toBe(3);
    });
  });
});
