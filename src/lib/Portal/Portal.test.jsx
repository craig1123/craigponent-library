import React from 'react';
import { mount } from 'enzyme';
import Portal from './Portal';

describe('Portal', () => {
  const children = 'Children';

  it('lifecycle methods should be called and add/remove node from DOM', () => {
    const componentDidMount = jest.fn();
    const componentWillUnmount = jest.fn();

    // 1. First extends your class to mock lifecycle methods
    class Foo extends Portal {
      constructor(props) {
        super(props);
        this.componentDidMount = componentDidMount;
        this.componentWillUnmount = componentWillUnmount;
      }

      render() {
        return <Portal>{this.props.children}</Portal>;
      }
    }

    // 2. mount-render and test lifecycle
    const wrapper = mount(<Foo>{children}</Foo>);
    expect(componentDidMount.mock.calls.length).toBe(1);
    expect(componentWillUnmount.mock.calls.length).toBe(0);

    // 3. unmount and test componentWillUnmount
    wrapper.unmount();
    expect(componentDidMount.mock.calls.length).toBe(1);
    expect(componentWillUnmount.mock.calls.length).toBe(1);
  });

  it('renders the children', () => {
    const wrapper = mount(<Portal>{children}</Portal>);
    expect(wrapper.get(0).props.children).toBe(children);
  });
});
