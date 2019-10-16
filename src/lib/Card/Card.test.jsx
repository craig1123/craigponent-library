import React from 'react';
import { shallow, mount } from 'enzyme';
import Card from './Card';

describe('Card', () => {
  it('should render children', () => {
    const wrapper = shallow(
      <Card>
        <span>Ello World</span>
      </Card>,
    );
    expect(wrapper.find('span').text()).toBe('Ello World');
  });

  it('should render title', () => {
    const wrapper = shallow(<Card title={<span>Ello world</span>} />);
    expect(wrapper.find('span').text()).toBe('Ello world');
  });

  it('should render titleTag', () => {
    const wrapper = shallow(<Card titleTag="span" title="Ello world" />);
    expect(wrapper.find('span').text()).toBe('Ello world');
  });

  it('should render titleClassName', () => {
    const wrapper = shallow(
      <Card titleTag="span" titleClassName="hi" title="Ello world" />,
    );
    expect(wrapper.find('.hi').exists()).toBe(true);
  });

  it('should render titleProps', () => {
    const wrapper = shallow(
      <Card
        titleTag="button"
        titleProps={{ type: 'button' }}
        title="Ello world"
      />,
    );
    expect(wrapper.find('button').prop('type')).toBe('button');
  });

  it('should render bodyClassName', () => {
    const wrapper = shallow(
      <Card titleTag="span" bodyClassName="hi" title="Ello world" />,
    );
    expect(wrapper.find('.hi').exists()).toBe(true);
  });

  it('should render darkMode', () => {
    const wrapper = mount(
      <Card styleMode="dark">
        <div>Card</div>
      </Card>,
    );
    expect(wrapper.prop('styleMode')).toBe('dark');
  });
});
