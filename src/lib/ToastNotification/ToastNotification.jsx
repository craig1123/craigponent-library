/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import {
  arrayOf,
  func,
  bool,
  string,
  shape,
  oneOf,
  node,
  number,
  element,
  oneOfType,
} from 'prop-types';

import toastStyles from './toastNotification.module.scss';

const colors = {
  success: {
    backgroundColor: '#00CE7D',
    color: '#fff',
  },
  primary: {
    backgroundColor: '#389BFF',
    color: '#fff',
  },
  warn: {
    backgroundColor: '#EBF5FF',
    color: '#389BFF',
  },
  error: {
    backgroundColor: '#FE0625',
    color: '#fff',
  },
};

class ToastNotification extends Component {
  state = {
    topDistance: 60,
  };

  componentDidMount() {
    const { rootScrollElement } = this.props;
    if (rootScrollElement) {
      rootScrollElement.addEventListener('scroll', this.onWindowScroll);
    }
  }

  componentWillUnmount() {
    const { rootScrollElement } = this.props;
    if (rootScrollElement) {
      rootScrollElement.removeEventListener('scroll', this.onWindowScroll);
    }
  }

  onWindowScroll = () => {
    let { topDistance } = this.state;
    const { rootScrollElement } = this.props;

    if (rootScrollElement.scrollTop > 0) {
      topDistance = 0;
    } else if (rootScrollElement.scrollTop <= 60) {
      topDistance = 60;
    }

    this.setState({ topDistance });
  };

  onCloseToast = id => e => {
    e.preventDefault();
    this.props.removeToastNotification(id);
  };

  onToastClick = toast => () => {
    if (toast.link) {
      this.props.removeToastNotification(toast.id);
      window.history.pushState(null, '', toast.link);
    }
  };

  mapToasts = (toast, index) => {
    // Some default values
    const styles = { ...toast.style };
    const toastPosition = toast.position;
    // Since they are stackable and we are using absolute
    // positioning we have to make sure we offset the top/bottom
    switch (toastPosition) {
      case 'top_center': {
        styles.top = `${54 * index + this.state.topDistance}px`;
        break;
      }
      case 'sticky_in_page': {
        styles.top = 0;
        break;
      }
      case 'bottom_center': {
        styles.bottom = `${54 * index}px`;
        break;
      }
      default:
        break;
    }

    // If we have autoClose then we dispatch the removal of it after the timer/default value
    if (toast.autoClose) {
      setTimeout(
        () => this.props.removeToastNotification(toast.id),
        toast.timer,
      );
    }

    return (
      <div
        key={toast.id}
        style={styles}
        className={`${toastStyles['toast-wrapper']} ${
          toastStyles[toastPosition]
        } ${toast.wrapperClassName || ''}`.trim()}
      >
        <div
          style={colors[toast.status]}
          onClick={this.onToastClick(toast)}
          className={`${toastStyles.toast} ${
            toastStyles['']
          } ${toast.className || ''}`.trim()}
        >
          <div className={toastStyles['toast-container']}>
            {toast.closeButton && (
              <button
                type="button"
                aria-label="close"
                className={toastStyles['close-toast']}
                style={colors[toast.status]}
                onClick={this.onCloseToast(toast.id)}
              >
                &#10005;
              </button>
            )}
            {toast.element}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.props.toasts.map(this.mapToasts);
  }
}

ToastNotification.propTypes = {
  removeToastNotification: func.isRequired,
  rootScrollElement: oneOfType([element, node, shape({})]),
  toasts: arrayOf(
    shape({
      autoClose: bool,
      className: string,
      closeButton: bool,
      element: node,
      id: string,
      link: string,
      position: oneOf(['top_center', 'sticky_in_page', 'bottom_center']),
      status: oneOf(['primary', 'success', 'warn', 'error']),
      timer: number,
      wrapperClassName: string,
    }),
  ),
};

ToastNotification.defaultProps = {
  rootScrollElement: null,
  toasts: [],
};

export default ToastNotification;
