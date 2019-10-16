/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import { TransitionGroup } from 'react-transition-group';
import Fade from './Fade';

class Helper extends React.Component {
  state = { showItem: this.props.showItem };

  toggle = () => {
    this.setState(prev => ({
      showItem: !prev.showItem,
    }));
  };

  render() {
    return (
      <div>
        <button className="trigger" type="button" onClick={this.toggle}>
          Toggle
        </button>
        <TransitionGroup component="div">
          {this.state.showItem ? this.props.children : null}
        </TransitionGroup>
      </div>
    );
  }
}

describe('Fade', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should transition classes from "fade" to "fade show" on appear', () => {
    const isOpen = true;
    const wrapper = mount(
      <Helper showItem={isOpen}>
        <Fade data-find="show" key={Math.random()}>
          Yo!
        </Fade>
        <Fade data-find="hide" appear={false} key={Math.random()}>
          Yo 2!
        </Fade>
      </Helper>,
    );

    expect(
      wrapper
        .update()
        .find('div[data-find="hide"]')
        .hostNodes().length,
    ).toBe(1);
    expect(
      wrapper
        .update()
        .find('div[data-find="show"]')
        .hostNodes().length,
    ).toBe(1);

    jest.runTimersToTime(300);

    expect(
      wrapper
        .update()
        .find('div[data-find="show"]')
        .hostNodes().length,
    ).toBe(1);

    wrapper
      .find('.trigger')
      .hostNodes()
      .simulate('click');
    expect(
      wrapper
        .update()
        .find('div[data-find="show"]')
        .hostNodes().length,
    ).toBe(1);
  });

  it('should transition classes from "fade" to "fade show" on enter', () => {
    const onEnter = jest.fn();
    const onExit = jest.fn();
    const isOpen = false;
    const wrapper = mount(
      <Helper showItem={isOpen}>
        <Fade
          data-find="show"
          onEnter={onEnter}
          onExit={onExit}
          key={Math.random()}
        >
          Yo 3!
        </Fade>
        <Fade
          data-find="hide"
          appear={false}
          enter={false}
          exit={false}
          key={Math.random()}
        >
          Yo 4!
        </Fade>
      </Helper>,
    );

    expect(
      wrapper
        .update()
        .find('div[data-find="hide"]')
        .hostNodes().length,
    ).toBe(0);
    expect(
      wrapper
        .update()
        .find('div[data-find="show"]')
        .hostNodes().length,
    ).toBe(0);

    wrapper
      .find('.trigger')
      .hostNodes()
      .simulate('click');

    expect(
      wrapper
        .update()
        .find('div[data-find="hide"]')
        .hostNodes().length,
    ).toBe(1);
    expect(
      wrapper
        .update()
        .find('div[data-find="show"]')
        .hostNodes().length,
    ).toBe(1);
    expect(onEnter).toHaveBeenCalled();

    jest.runTimersToTime(300);

    expect(onEnter).toHaveBeenCalled();
    expect(onExit).not.toHaveBeenCalled();
    expect(
      wrapper
        .update()
        .find('div[data-find="show"]')
        .hostNodes().length,
    ).toBe(1);

    wrapper
      .find('.trigger')
      .hostNodes()
      .simulate('click');
    expect(
      wrapper
        .update()
        .find('div[data-find="show"]')
        .hostNodes().length,
    ).toBe(1);
    expect(onExit).toHaveBeenCalled();
  });

  it('should pass className down', () => {
    const fade = mount(
      <Fade data-find="show" className="test-class-name">
        Yo!
      </Fade>,
    );
    expect(
      fade
        .find('div[data-find="show"]')
        .hostNodes()
        .prop('className'),
    ).toContain('test-class-name');
  });

  it('should pass other props down', () => {
    const fade = mount(
      <Fade data-find="show" data-testprop="testvalue">
        Yo!
      </Fade>,
    );
    expect(
      fade
        .find('div[data-find="show"]')
        .hostNodes()
        .prop('data-testprop'),
    ).toContain('testvalue');
  });
});
