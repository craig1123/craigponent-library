import React from 'react';
import { shallow, mount } from 'enzyme';
import Alert from './Alert';

const noop = () => {};

describe('Alert', () => {
  it('should render children', () => {
    const alert = mount(<Alert>Yo!</Alert>);
    expect(alert.text()).toBe('Yo!');
  });

  it('should pass className down', () => {
    const alert = mount(<Alert className="test-class-name">Yo!</Alert>);
    expect(alert.prop('className')).toContain('test-class-name');
  });

  it('should pass close className down', () => {
    const alert = mount(
      <Alert onClose={noop} closeClassName="test-class-name">
        Yo!
      </Alert>,
    );
    expect(
      alert
        .find('button')
        .hostNodes()
        .prop('className'),
    ).toContain('test-class-name');
  });

  it('should pass other props down', () => {
    const alert = mount(<Alert data-testprop="testvalue">Yo!</Alert>);
    expect(alert.prop('data-testprop')).toContain('testvalue');
  });

  it('should accept color prop', () => {
    const alert = mount(<Alert color="danger">Yo!</Alert>);
    expect(alert.prop('color')).toBe('danger');
  });

  it('should be non dismissible by default', () => {
    const alert = mount(<Alert>Yo!</Alert>);
    const button = alert.find('button');
    expect(button.hostNodes().length).toEqual(0);
  });

  it('should show dismiss button if passed onClose', () => {
    const alert = mount(
      <Alert color="danger" onClose={noop} title="hi">
        Yo!
      </Alert>,
    );
    const button = alert.find('button');
    expect(button.hostNodes().length).toEqual(1);
    expect(button.prop('aria-label')).toBe('Close Alert');
  });

  it('should be empty if not isOpen', () => {
    const alert = shallow(<Alert isOpen={false}>Yo!</Alert>);
    expect(alert.html()).toBe(null);
  });

  it('should be dismissible', () => {
    const onClick = jest.fn();
    const alert = mount(
      <Alert color="danger" onClose={onClick} description="dismiss me">
        Yo!
      </Alert>,
    );

    alert
      .find('button')
      .hostNodes()
      .simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
