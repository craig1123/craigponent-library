import React from 'react';
import { shallow, mount } from 'enzyme';
import Collapse from '../Collapse/Collapse';
import UncontrolledCollapse from './UncontrolledCollapse';

describe('UncontrolledCollapse', () => {
  const children = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
  let toggler;
  let togglers;

  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <button id="toggler">Click Me</button>
        <button class="toggler">Toggler 1</button>
        <button class="toggler">Toggler 2</button>
      </div>`;
    toggler = document.getElementById('toggler');
    togglers = document.getElementsByClassName('toggler');
  });

  afterEach(() => {
    document.body.innerHTML = '';
    toggler = null;
    togglers = null;
  });

  it('should be a Collapse', () => {
    const collapse = shallow(
      <UncontrolledCollapse toggler="#toggler">
        {children}
      </UncontrolledCollapse>,
    );

    expect(JSON.stringify(collapse.type())).toBe(JSON.stringify(Collapse));
  });

  it('should have isOpen default to false', () => {
    const collapse = shallow(
      <UncontrolledCollapse toggler="#toggler">
        {children}
      </UncontrolledCollapse>,
    );

    expect(collapse.prop('isOpen')).toBe(false);
  });

  it('should toggle isOpen when toggle is called', () => {
    const collapse = shallow(
      <UncontrolledCollapse toggler="#toggler">
        {children}
      </UncontrolledCollapse>,
    );

    toggler.click();
    collapse.update();

    expect(collapse.prop('isOpen')).toBe(true);
  });

  it('should call toggle when toggler is clicked', () => {
    const component = mount(
      <UncontrolledCollapse toggler="#toggler">
        {children}
      </UncontrolledCollapse>,
    );

    expect(component.state('isOpen')).toBe(false);
    toggler.click();
    expect(component.state('isOpen')).toBe(true);
  });

  it('should toggle for multiple togglers', () => {
    const collapse = shallow(
      <UncontrolledCollapse toggler=".toggler">
        {children}
      </UncontrolledCollapse>,
    );

    expect(collapse.prop('isOpen')).toBe(false);

    togglers[0].click();
    collapse.update();

    expect(collapse.prop('isOpen')).toBe(true);

    togglers[1].click();
    collapse.update();

    expect(collapse.prop('isOpen')).toBe(false);
  });

  it('mounts and unmounts', () => {
    const componentDidMount = jest.fn();
    const componentWillUnmount = jest.fn();

    // 1. First extends your class to mock lifecycle methods
    class Foo extends UncontrolledCollapse {
      constructor(props) {
        super(props);
        this.componentDidMount = componentDidMount;
        this.componentWillUnmount = componentWillUnmount;
      }

      render() {
        return (
          <UncontrolledCollapse toggler={this.props.toggler}>
            {this.props.children}
          </UncontrolledCollapse>
        );
      }
    }

    // 2. mount-render and test lifecycle
    const wrapper = mount(<Foo toggler="#toggler">{children}</Foo>);
    expect(componentDidMount.mock.calls.length).toBe(1);
    expect(componentWillUnmount.mock.calls.length).toBe(0);

    // 3. unmount and test componentWillUnmount
    wrapper.unmount();
    expect(componentDidMount.mock.calls.length).toBe(1);
    expect(componentWillUnmount.mock.calls.length).toBe(1);
  });

  it('should remove eventListeners when unmounted', () => {
    const wrapper = shallow(
      <UncontrolledCollapse toggler="#toggler">
        {children}
      </UncontrolledCollapse>,
    );
    expect(typeof wrapper.instance().removeEventListeners).toBe('function');

    toggler.click();
    expect(wrapper.state('isOpen')).toBe(true);

    wrapper.unmount();
    expect(wrapper.instance()).toBe(null);
  });
});
