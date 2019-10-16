/* eslint-disable jsx-a11y/no-noninteractive-tabindex, react/prop-types */
import React, { Fragment } from 'react';
import { mount } from 'enzyme';
import Fade from '../Fade/Fade';
import Button from '../Button/Button';
import Modal from './Modal';

const didMount = component => {
  const wrapper = mount(component);
  wrapper.setProps({ fakefield: 'fakeToUpdate' });
  return wrapper;
};

describe('Modal', () => {
  let isOpen;
  let toggle;

  beforeEach(() => {
    isOpen = false;
    toggle = () => {
      isOpen = !isOpen;
    };

    jest.useFakeTimers();
  });

  afterEach(() => {
    // fast forward time for modal to fade out
    jest.runTimersToTime(300);
    jest.clearAllTimers();
  });

  it('should render modal portal into DOM', () => {
    isOpen = true;
    const wrapper = didMount(
      <Modal isOpen={isOpen} toggle={toggle}>
        Yo!
      </Modal>,
    );

    jest.runTimersToTime(300);
    expect(wrapper.childAt(0).children().length).not.toBe(0);
    wrapper.unmount();
  });

  it('should render with the backdrop with a Fade type', () => {
    isOpen = true;
    const wrapper = didMount(
      <Modal isOpen={isOpen} toggle={toggle} backdropClassName="myBackdrop">
        Yo!
      </Modal>,
    );

    jest.runTimersToTime(300);
    const backdrop = wrapper.find('.myBackdrop').at(0);
    expect(JSON.stringify(backdrop.type())).toBe(JSON.stringify(Fade));
    wrapper.unmount();
  });

  it('should not render with the backdrop with the class "modal-backdrop" when backdrop is "false"', () => {
    isOpen = true;
    const wrapper = didMount(
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        backdropClassName="myBackdrop"
        backdrop={false}
      >
        Yo!
      </Modal>,
    );

    jest.runTimersToTime(300);
    const backdrop = wrapper.find('.myBackdrop').at(0);
    expect(backdrop.exists()).toBeFalsy();
    wrapper.unmount();
  });

  it('should render without fade transition if provided with fade={false}', () => {
    isOpen = true;
    const wrapper = didMount(
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        fade={false}
        modalClassName="fadeless-modal"
      >
        Howdy!
      </Modal>,
    );

    // Modal should appear instantaneously
    jest.runTimersToTime(1);

    const matchedModals = document.getElementsByClassName('fadeless-modal');
    const matchedModal = matchedModals[0];

    expect(matchedModals.length).toBe(1);
    // Modal should not have the 'fade' class
    expect(matchedModal.className.split(' ').indexOf('fade') < 0).toBe(true);

    wrapper.unmount();
  });

  it('should render when expected when passed modalTransition and backdropTransition props', () => {
    isOpen = true;
    const wrapper = didMount(
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        modalTransition={{ timeout: 2 }}
        backdropTransition={{ timeout: 10 }}
        modalClassName="custom-timeout-modal"
      >
        Hello, world!
      </Modal>,
    );

    jest.runTimersToTime(20);

    const matchedModals = document.getElementsByClassName(
      'custom-timeout-modal',
    );

    expect(matchedModals.length).toBe(1);

    wrapper.unmount();
  });

  it('should render with class "modal" and have custom class name if provided with modalClassName', () => {
    isOpen = true;
    const wrapper = didMount(
      <Modal isOpen={isOpen} toggle={toggle} modalClassName="myModal">
        Yo!
      </Modal>,
    );

    jest.runTimersToTime(300);
    expect(document.querySelectorAll('.myModal').length).toBe(1);
    wrapper.unmount();
  });

  it('should render with custom class name if provided with wrapClassName', () => {
    isOpen = true;
    const wrapper = didMount(
      <Modal isOpen={isOpen} toggle={toggle} wrapClassName="myModal">
        Yo!
      </Modal>,
    );

    jest.runTimersToTime(300);
    expect(document.getElementsByClassName('myModal').length).toBe(1);
    wrapper.unmount();
  });

  it('should render modal when isOpen is true', () => {
    isOpen = true;
    const wrapper = didMount(
      <Modal
        modalClassName="myModal"
        backdropClassName="myBackdrop"
        isOpen={isOpen}
        toggle={toggle}
      >
        Yo!
      </Modal>,
    );

    jest.runTimersToTime(300);
    expect(document.getElementsByClassName('myModal').length).toBe(1);
    expect(document.getElementsByClassName('myBackdrop').length).toBe(1);
    wrapper.unmount();
  });

  it('should render modal with default role of "dialog"', () => {
    isOpen = true;
    const wrapper = didMount(
      <Modal modalClassName="myModal" isOpen={isOpen} toggle={toggle}>
        Yo!
      </Modal>,
    );

    jest.runTimersToTime(300);
    expect(
      document.getElementsByClassName('myModal')[0].getAttribute('role'),
    ).toBe('dialog');
    wrapper.unmount();
  });

  it('should not render modal when isOpen is false', () => {
    const wrapper = didMount(
      <Modal isOpen={isOpen} toggle={toggle}>
        Yo!
      </Modal>,
    );

    jest.runTimersToTime(300);
    expect(wrapper.childAt(0).children().length).toBe(0);
    expect(document.getElementsByClassName('modal').length).toBe(0);
    expect(document.getElementsByClassName('modal-backdrop').length).toBe(0);
    wrapper.unmount();
  });

  it('should toggle modal', () => {
    const wrapper = didMount(
      <Modal
        modalClassName="myModal"
        backdropClassName="myBackdrop"
        isOpen={isOpen}
        toggle={toggle}
      >
        Yo!
      </Modal>,
    );

    jest.runTimersToTime(300);
    expect(isOpen).toBe(false);
    expect(wrapper.childAt(0).children().length).toBe(0);
    expect(document.getElementsByClassName('myModal').length).toBe(0);
    expect(document.getElementsByClassName('myBackdrop').length).toBe(0);

    toggle();
    wrapper.setProps({ isOpen });

    jest.runTimersToTime(300);
    expect(isOpen).toBe(true);
    expect(document.getElementsByClassName('myModal').length).toBe(1);
    expect(document.getElementsByClassName('myBackdrop').length).toBe(1);
    wrapper.unmount();
  });

  it('should call onClosed & onOpened', () => {
    const onOpened = jest.fn();
    const onClosed = jest.fn();
    const wrapper = didMount(
      <Modal
        isOpen={isOpen}
        onOpen={onOpened}
        onClosed={onClosed}
        toggle={toggle}
      >
        Yo!
      </Modal>,
    );

    jest.runTimersToTime(300);
    expect(isOpen).toBe(false);
    expect(onOpened).not.toHaveBeenCalled();
    expect(onClosed).not.toHaveBeenCalled();

    toggle();
    wrapper.setProps({ isOpen });
    jest.runTimersToTime(300);

    expect(isOpen).toBe(true);
    expect(onOpened).toHaveBeenCalled();
    expect(onClosed).not.toHaveBeenCalled();

    toggle();
    wrapper.setProps({ isOpen });
    jest.runTimersToTime(300);

    expect(isOpen).toBe(false);
    expect(onClosed).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('should not call init when isOpen does not change', () => {
    jest.spyOn(Modal.prototype, 'init');
    jest.spyOn(Modal.prototype, 'componentDidUpdate');
    const wrapper = mount(
      <Modal isOpen={isOpen} toggle={toggle}>
        Yo!
      </Modal>,
    );

    jest.runTimersToTime(300);
    expect(isOpen).toBe(false);
    expect(Modal.prototype.init).not.toHaveBeenCalled();
    expect(Modal.prototype.componentDidUpdate).not.toHaveBeenCalled();

    wrapper.setProps({
      isOpen,
    });
    jest.runTimersToTime(300);

    expect(isOpen).toBe(false);
    expect(Modal.prototype.init).not.toHaveBeenCalled();
    expect(Modal.prototype.componentDidUpdate).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('should close modal when escape key pressed', () => {
    isOpen = true;
    const wrapper = didMount(
      <Modal modalClassName="myModal" isOpen={isOpen} toggle={toggle}>
        Yo!
      </Modal>,
    );
    const instance = wrapper.instance();

    jest.runTimersToTime(300);

    expect(isOpen).toBe(true);
    expect(document.getElementsByClassName('myModal').length).toBe(1);

    instance.handleEscape({ keyCode: 13 });
    jest.runTimersToTime(300);

    expect(isOpen).toBe(true);
    expect(document.getElementsByClassName('myModal').length).toBe(1);

    const escapeKeyUpEvent = {
      keyCode: 27,
      preventDefault: jest.fn(() => {}),
      stopPropagation: jest.fn(() => {}),
    };

    instance.handleEscape(escapeKeyUpEvent);
    jest.runTimersToTime(300);

    expect(isOpen).toBe(false);
    expect(escapeKeyUpEvent.preventDefault.mock.calls.length).toBe(1);
    expect(escapeKeyUpEvent.stopPropagation.mock.calls.length).toBe(1);

    wrapper.setProps({
      isOpen,
    });
    jest.runTimersToTime(300);

    expect(document.getElementsByClassName('myModal').length).toBe(0);

    wrapper.unmount();
  });

  it('should close modal when clicking backdrop', () => {
    isOpen = true;
    const wrapper = didMount(
      <Modal
        modalClassName="myModal"
        isOpen={isOpen}
        toggle={toggle}
        backdropClassName="myBackdrop"
      >
        <button id="clicker" type="button">
          Does Nothing
        </button>
      </Modal>,
    );

    jest.runTimersToTime(300);

    expect(isOpen).toBe(true);
    expect(document.getElementsByClassName('myModal').length).toBe(1);
    //
    document.getElementById('clicker').click();
    jest.runTimersToTime(300);

    expect(isOpen).toBe(true);

    const modal = document.getElementsByClassName('myModal')[0];

    const mouseDownEvent = document.createEvent('MouseEvents');
    mouseDownEvent.initEvent('mousedown', true, true);
    modal.dispatchEvent(mouseDownEvent);

    const clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);
    modal.dispatchEvent(clickEvent);

    jest.runTimersToTime(300);

    expect(isOpen).toBe(false);

    wrapper.unmount();
  });

  it('should destroy this.modalElement', () => {
    isOpen = true;
    const wrapper = didMount(
      <Modal isOpen={isOpen} toggle={toggle}>
        <button id="clicker" type="button">
          Does Nothing
        </button>
      </Modal>,
    );
    const instance = wrapper.instance();

    jest.runTimersToTime(300);
    expect(instance.modalElement).toBeTruthy();

    toggle();
    wrapper.setProps({
      isOpen,
    });
    jest.runTimersToTime(300);

    expect(isOpen).toBe(false);
    expect(instance.modalElement).toBe(null);

    wrapper.unmount();
  });

  it('should destroy this.modalElement on unmount', () => {
    isOpen = true;
    const wrapper = didMount(
      <Modal isOpen={isOpen} toggle={toggle}>
        <button id="clicker" type="button">
          Does Nothing
        </button>
      </Modal>,
    );
    const instance = wrapper.instance();

    jest.runTimersToTime(300);
    expect(instance.modalElement).toBeTruthy();

    wrapper.unmount();
    jest.runTimersToTime(300);

    expect(instance.modalElement).toBe(null);
  });

  it('should remove exactly modal-open class from body', () => {
    // set a body class which includes modal-open
    document.body.className = 'my-modal-opened';

    const wrapper = didMount(
      <Modal isOpen={isOpen} toggle={toggle}>
        Yo!
      </Modal>,
    );

    // assert that the modal is closed and the body class is what was set initially
    jest.runTimersToTime(300);
    expect(isOpen).toBe(false);
    expect(document.body.className).toBe('my-modal-opened');

    toggle();
    wrapper.setProps({
      isOpen,
    });

    // assert that the modal is open and the body class is what was set initially + modal-open
    jest.runTimersToTime(300);
    expect(isOpen).toBe(true);

    // append another body class which includes modal-open
    document.body.className += ' modal-opened';

    toggle();
    wrapper.setProps({ isOpen });

    // assert that the modal is closed and the body class is what was set initially
    jest.runTimersToTime(301);
    expect(isOpen).toBe(false);
    expect(document.body.className).toBe('my-modal-opened modal-opened');

    wrapper.unmount();
  });

  it('should allow focus on only focusable elements', () => {
    isOpen = true;

    const wrapper = didMount(
      <Modal isOpen={isOpen} toggle={toggle}>
        <a alt="test" href="/">
          Test
        </a>
        <map name="test">
          <area alt="test" href="/" coords="200,5,200,30" />
        </map>
        <input type="text" />
        <input type="hidden" />
        <input type="text" disabled value="Test" />
        <select name="test" id="select_test">
          <option>Test item</option>
        </select>
        <select name="test" id="select_test_disabled" disabled>
          <option>Test item</option>
        </select>
        <textarea name="textarea_test" id="textarea_test" cols="30" rows="10" />
        <textarea
          name="textarea_test_disabled"
          id="textarea_test_disabled"
          cols="30"
          rows="10"
          disabled
        />
        <object>Test</object>
        <button type="button" tabIndex="0">
          test tab index
        </button>
        <div>
          <Button disabled color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button btnType="primary" onClick={toggle}>
            Cancel
          </Button>
        </div>
      </Modal>,
    );

    const instance = wrapper.instance();
    expect(instance.getFocusableChildren().length).toBe(9);
    wrapper.unmount();
  });

  it('should return the focus to the last focused element before the modal has opened', () => {
    const MockComponent = ({ isModalOpen = false }) => (
      <Fragment>
        <button className="focus" type="button">
          Focused
        </button>
        <Modal isOpen={isModalOpen} toggle={toggle}>
          Whatever
        </Modal>
      </Fragment>
    );
    const wrapper = didMount(<MockComponent />);
    const button = wrapper
      .find('.focus')
      .hostNodes()
      .getDOMNode();
    button.focus();
    wrapper.setProps({ isOpen: true });
    wrapper.setProps({ isOpen: false });
    jest.runAllTimers();

    expect(document.activeElement === button).toEqual(true);
    wrapper.unmount();
  });

  it('should return the focus to the last focused element before the modal has opened when "unmountOnClose" is false', () => {
    const MockComponent = ({ isModalOpen = false }) => (
      <Fragment>
        <button className="focus" type="button">
          Focused
        </button>
        <Modal isOpen={isModalOpen} toggle={toggle}>
          Whatever
        </Modal>
      </Fragment>
    );
    const wrapper = didMount(<MockComponent />);
    const button = wrapper
      .find('.focus')
      .hostNodes()
      .getDOMNode();
    button.focus();
    wrapper.setProps({ isOpen: true });
    wrapper.setProps({ isOpen: false });
    jest.runAllTimers();

    expect(document.activeElement === button).toEqual(true);
    wrapper.unmount();
  });
});
