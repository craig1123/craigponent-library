import React from 'react';
import { mount } from 'enzyme';
import uniqid from 'uniqid';
import ToastNotification from './ToastNotification';

const toastProps = {
  autoClose: true,
  closeButton: true,
  element: 'Send me a toast! Clink!',
  position: 'bottom_center',
  status: 'error',
  timer: 200,
};

describe('ToastNotification', () => {
  let toasts = [];
  const removeToastNotification = toastId => {
    toasts = toasts.filter(toast => toast.id !== toastId);
  };
  const addToast = props => {
    const newToast = {
      ...toastProps,
      ...props,
      id: uniqid(),
    };
    toasts = [...toasts, newToast];
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    toasts = [];
    jest.clearAllTimers();
  });

  it('should handle scrolling down the page with rootScrollElement', () => {
    document.body.scrollTop = 20;
    const wrapper = mount(
      <ToastNotification
        rootScrollElement={document.body}
        toasts={toasts}
        removeToastNotification={removeToastNotification}
      />,
    );

    expect(wrapper.state('topDistance')).toBe(60);

    document.body.dispatchEvent(new Event('scroll'));
    jest.runOnlyPendingTimers();
    wrapper.update();
    expect(wrapper.state('topDistance')).toBe(0);

    wrapper.unmount();
  });

  it('should be able to add a new toast', () => {
    const wrapper = mount(
      <ToastNotification
        rootScrollElement={window}
        toasts={toasts}
        removeToastNotification={removeToastNotification}
      />,
    );

    expect(wrapper.children().exists()).toBeFalsy();

    addToast({ autoClose: false });
    wrapper.setProps({ toasts });

    expect(wrapper.children().exists()).toBeTruthy();
  });

  describe('individual toast', () => {
    it('should be able to autoClose after 10ms', () => {
      const removeToast = jest.fn();
      const timer = 10;

      addToast({ timer });

      mount(
        <ToastNotification
          toasts={toasts}
          removeToastNotification={removeToast}
        />,
      );

      setTimeout(() => {
        expect(removeToast).toHaveBeenCalled();
      }, timer);
    });

    it('should pass down the className', () => {
      addToast({ className: 'butter' });
      const wrapper = mount(
        <ToastNotification
          toasts={toasts}
          removeToastNotification={removeToastNotification}
        />,
      );

      expect(wrapper.find('.butter').exists()).toBeTruthy();
    });

    it('should render the closeButton when true', () => {
      addToast();
      const wrapper = mount(
        <ToastNotification
          toasts={toasts}
          removeToastNotification={removeToastNotification}
        />,
      );

      expect(wrapper.find('button[aria-label="close"]').exists()).toBeTruthy();
    });

    it('should not render the closeButton when false', () => {
      addToast({ closeButton: false });
      const wrapper = mount(
        <ToastNotification
          toasts={toasts}
          removeToastNotification={removeToastNotification}
        />,
      );

      expect(wrapper.find('button[aria-label="close"]').exists()).toBeFalsy();
    });

    it('closes by clicking the X', () => {
      addToast();
      const wrapper = mount(
        <ToastNotification
          toasts={toasts}
          removeToastNotification={removeToastNotification}
        />,
      );

      wrapper.find('button[aria-label="close"]').simulate('click');

      expect(toasts).toEqual([]);
    });

    it('closes by clicking the toast when there is a link', () => {
      addToast({ link: 'yes.com', className: 'toasty' });
      const wrapper = mount(
        <ToastNotification
          toasts={toasts}
          removeToastNotification={removeToastNotification}
        />,
      );

      wrapper.find('.toasty').simulate('click');

      expect(toasts).toEqual([]);
    });

    it('can be positioned on bottom', () => {
      addToast({ wrapperClassName: 'toasty' });
      const wrapper = mount(
        <ToastNotification
          toasts={toasts}
          removeToastNotification={removeToastNotification}
        />,
      );

      expect(wrapper.find('.toasty').prop('style')).toHaveProperty(
        'bottom',
        '0px',
      );
    });

    it('can be positioned on top with multiple', () => {
      addToast({ position: 'top_center', wrapperClassName: 'toasty1' });
      addToast({ position: 'top_center', wrapperClassName: 'toasty2' });
      addToast({ position: 'top_center', wrapperClassName: 'toasty3' });
      const wrapper = mount(
        <ToastNotification
          toasts={toasts}
          removeToastNotification={removeToastNotification}
        />,
      );

      expect(wrapper.find('.toasty1').prop('style')).toHaveProperty(
        'top',
        '60px',
      );
      expect(wrapper.find('.toasty2').prop('style')).toHaveProperty(
        'top',
        `${54 * 1 + 60}px`,
      );
      expect(wrapper.find('.toasty3').prop('style')).toHaveProperty(
        'top',
        `${54 * 2 + 60}px`,
      );
    });

    it('can shows the colors of different statuses', () => {
      addToast({ status: 'primary', className: 'primary' });
      addToast({ status: 'success', className: 'success' });
      addToast({ status: 'warn', className: 'warn' });
      addToast({ status: 'error', className: 'error' });
      const wrapper = mount(
        <ToastNotification
          toasts={toasts}
          removeToastNotification={removeToastNotification}
        />,
      );

      const primaryStyle = wrapper.find('.primary').prop('style');
      const successStyle = wrapper.find('.success').prop('style');
      const warnStyle = wrapper.find('.warn').prop('style');
      const errorStyle = wrapper.find('.error').prop('style');

      expect(primaryStyle).toHaveProperty('backgroundColor', '#389BFF');
      expect(primaryStyle).toHaveProperty('color', '#fff');
      expect(successStyle).toHaveProperty('backgroundColor', '#00CE7D');
      expect(successStyle).toHaveProperty('color', '#fff');
      expect(warnStyle).toHaveProperty('backgroundColor', '#EBF5FF');
      expect(warnStyle).toHaveProperty('color', '#389BFF');
      expect(errorStyle).toHaveProperty('backgroundColor', '#FE0625');
      expect(errorStyle).toHaveProperty('color', '#fff');
    });
  });
});
