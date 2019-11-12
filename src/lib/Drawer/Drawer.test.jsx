import React from 'react';
import { shallow, mount } from 'enzyme';
import Drawer from './Drawer';

const noop = () => {};

const content = <span>Yo</span>;

describe('Drawer', () => {
  it('should render children', () => {
    const drawer = mount(<Drawer isOpen>{content}</Drawer>);
    expect(drawer.find('span').text()).toBe('Yo');
  });

  it('should pass className down', () => {
    const drawer = mount(
      <Drawer className="test-class-name">{content}</Drawer>,
    );
    expect(drawer.prop('className')).toContain('test-class-name');
  });

  it('should pass contentClassName down', () => {
    const drawer = mount(
      <Drawer contentClassName="test-class-name">{content}</Drawer>,
    );
    expect(drawer.prop('contentClassName')).toContain('test-class-name');
  });

  it('should pass headerClassName down', () => {
    const drawer = mount(
      <Drawer headerClassName="test-class-name">{content}</Drawer>,
    );
    expect(drawer.prop('headerClassName')).toContain('test-class-name');
  });

  it('should pass titleClassName down', () => {
    const drawer = mount(
      <Drawer titleClassName="test-class-name">{content}</Drawer>,
    );
    expect(drawer.prop('titleClassName')).toContain('test-class-name');
  });

  it('should pass bodyClassName down', () => {
    const drawer = mount(
      <Drawer bodyClassName="test-class-name">{content}</Drawer>,
    );
    expect(drawer.prop('bodyClassName')).toContain('test-class-name');
  });

  it('should pass close className down', () => {
    const drawer = mount(
      <Drawer onClose={noop} closeClassName="test-class-name" header="hi">
        {content}
      </Drawer>,
    );
    expect(drawer.prop('closeClassName')).toContain('test-class-name');
  });

  it('should pass other props down', () => {
    const drawer = mount(<Drawer data-testprop="testvalue">{content}</Drawer>);
    expect(drawer.prop('data-testprop')).toContain('testvalue');
  });

  it('should show close button if passed onClose', () => {
    const drawer = mount(
      <Drawer isOpen onClose={noop} header="hi">
        {content}
      </Drawer>,
    );
    const button = drawer.find('button');
    expect(button.hostNodes().length).toEqual(1);
    expect(button.prop('aria-label')).toBe('Close Drawer');
  });

  it('should be empty if not isOpen', () => {
    const drawer = shallow(<Drawer isOpen={false}>{content}</Drawer>);
    expect(drawer.html()).toBe(null);
  });

  it('should be dismissible by close button click', () => {
    const onClick = jest.fn();
    const drawer = mount(
      <Drawer isOpen onClose={onClick} header="hi">
        {content}
      </Drawer>,
    );

    drawer
      .find('button')
      .hostNodes()
      .simulate('click');
    setTimeout(() => {
      expect(onClick).toHaveBeenCalled();
    }, 150);
  });
});
