import React from 'react';
import PropTypes from 'prop-types';
import Fade from '../Fade/Fade';
import Portal from '../Portal/Portal';
import getOriginalBodyPadding from '../utils/getOriginalBodyPadding';
import conditionallyUpdateScrollbar from '../utils/conditionallyUpdateScrollbar';
import focusableElements from '../utils/focusableElements';
import setScrollbarWidth from '../utils/setScrollbarWidth';

import styles from './modal.module.scss';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.modalElement = null;
    this.originalBodyPadding = null;

    this.state = { isOpen: false };
  }

  componentDidMount() {
    const { autoFocus, isOpen } = this.props;
    if (isOpen) {
      this.setState({ isOpen: true });
      this.init();

      if (autoFocus) {
        this.setFocus();
      }
    }

    this.isModalMounted = true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isOpen && !prevProps.isOpen) {
      this.init();
      this.setState({ isOpen: true }); // eslint-disable-line
      // let render() renders Modal Dialog first
      return;
    }

    if (this.props.autoFocus && this.state.isOpen && !prevState.isOpen) {
      this.setFocus();
    }
  }

  componentWillUnmount() {
    if (this.modalElement) {
      this.destroy();
      if (this.state.isOpen) {
        this.close();
      }
    }

    this.isModalMounted = false;
  }

  onOpened = () => {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
    this.dialog.classList.add(styles['dialog-open']);
  };

  onClosed = () => {
    if (this.props.onClosed) {
      this.props.onClosed();
    }
    this.destroy();
    this.close();

    if (this.isModalMounted) {
      this.setState({ isOpen: false });
    }
  };

  setFocus() {
    if (
      this.dialog &&
      this.dialog.parentNode &&
      typeof this.dialog.parentNode.focus === 'function'
    ) {
      this.dialog.parentNode.focus();
    }
  }

  getFocusableChildren = () =>
    this.modalElement.querySelectorAll(focusableElements.join(', '));

  getFocusedChild() {
    let currentFocus;
    const focusableChildren = this.getFocusableChildren();

    try {
      currentFocus = document.activeElement;
    } catch (err) {
      currentFocus = focusableChildren[0]; // eslint-disable-line prefer-destructuring
    }
    return currentFocus;
  }

  // not mouseUp because scrollbar fires it, shouldn't close when user scrolls
  handleBackdropClick = e => {
    if (e.target === this.mouseDownElement) {
      e.stopPropagation();
      if (!this.props.isOpen || this.props.backdrop !== true) return;

      const backdrop = this.dialog ? this.dialog.parentNode : null;

      if (backdrop && e.target === backdrop && this.props.toggle) {
        this.props.toggle(e);
        this.dialog.classList.remove(styles['dialog-open']);
      }
    }
  };

  handleTab = e => {
    if (e.which !== 9) return;

    const focusableChildren = this.getFocusableChildren();
    const totalFocusable = focusableChildren.length;
    if (totalFocusable === 0) return;
    const currentFocus = this.getFocusedChild();

    let focusedIndex = 0;

    for (let i = 0; i < totalFocusable; i += 1) {
      if (focusableChildren[i] === currentFocus) {
        focusedIndex = i;
        break;
      }
    }

    if (e.shiftKey && focusedIndex === 0) {
      e.preventDefault();
      focusableChildren[totalFocusable - 1].focus();
    } else if (!e.shiftKey && focusedIndex === totalFocusable - 1) {
      e.preventDefault();
      focusableChildren[0].focus();
    }
  };

  handleBackdropMouseDown = e => {
    this.mouseDownElement = e.target;
  };

  handleEscape = e => {
    const { isOpen, toggle } = this.props;
    if (isOpen && e.keyCode === 27 && toggle) {
      e.preventDefault();
      e.stopPropagation();
      toggle(e);
    }
  };

  getDialogRef = ref => {
    this.dialog = ref;
  };

  init() {
    try {
      this.triggeringElement = document.activeElement;
    } catch (err) {
      this.triggeringElement = null;
    }

    if (!this.modalElement) {
      this.modalElement = document.createElement('div');
      this.modalElement.setAttribute('tabindex', '-1');
      this.modalElement.style.position = 'relative';
      this.modalElement.style.zIndex = '99999';
      document.body.appendChild(this.modalElement);
    }

    this.originalBodyPadding = getOriginalBodyPadding();
    conditionallyUpdateScrollbar();

    if (Modal.openCount === 0) {
      document.body.appendChild(this.modalElement);
      document.body.classList.add(styles['modal-open']);
    }

    Modal.openCount += 1;
  }

  destroy() {
    if (this.modalElement) {
      document.body.removeChild(this.modalElement);
      this.modalElement = null;
    }

    this.manageFocusAfterClose();
  }

  manageFocusAfterClose() {
    if (this.triggeringElement) {
      if (this.triggeringElement.focus) this.triggeringElement.focus();
      this.triggeringElement = null;
    }
  }

  close() {
    if (Modal.openCount <= 1) {
      document.body.classList.remove(styles['modal-open']);
    }

    this.manageFocusAfterClose();
    Modal.openCount = Math.max(0, Modal.openCount - 1);

    setScrollbarWidth(this.originalBodyPadding);
  }

  renderModalDialog() {
    const {
      bodyClassName,
      centered,
      children,
      className,
      contentClassName,
      header,
      headerClassName,
      size,
      styleMode,
      toggle,
      xIcon,
    } = this.props;
    const centeredClass = centered ? styles['modal-dialog-centered'] : '';
    const darkMode = styleMode === 'dark' ? styles.dark : '';
    const dialogBaseClass = `${styles['modal-dialog']} ${
      styles[`modal-${size}`]
    } ${centeredClass} ${className}`.trim();

    const modalContentClass = `${
      styles['modal-content']
    } ${darkMode} ${contentClassName}`.trim();

    return (
      <div className={dialogBaseClass} role="document" ref={this.getDialogRef}>
        <div className={modalContentClass}>
          {header && (
            <div
              className={`${styles['modal-header']} ${headerClassName}`.trim()}
            >
              <h5 className={styles['modal-title']}>{header}</h5>
              {xIcon && (
                <button
                  type="button"
                  onClick={toggle}
                  className={styles.close}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              )}
            </div>
          )}
          <div className={`${styles['modal-body']} ${bodyClassName}`.trim()}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!!this.modalElement && this.state.isOpen) {
      const isModalHidden = !!this.modalElement && !this.state.isOpen;
      this.modalElement.style.display = isModalHidden ? 'none' : 'block';

      const {
        wrapClassName,
        modalClassName,
        backdropClassName,
        isOpen,
        backdrop,
        innerRef,
      } = this.props;

      const modalAttributes = {
        onClick: this.handleBackdropClick,
        onMouseDown: this.handleBackdropMouseDown,
        onKeyUp: this.handleEscape,
        onKeyDown: this.handleTab,
        role: 'dialog',
        tabIndex: '-1',
      };

      const Backdrop = backdrop && (
        <Fade
          className={`${styles['modal-backdrop']} ${backdropClassName}`.trim()}
          duration={150}
          in={isOpen && !!backdrop}
          opacity={0.5}
        />
      );

      return (
        <Portal node={this.modalElement}>
          <div className={wrapClassName}>
            <Fade
              {...modalAttributes}
              duration={300}
              in={isOpen}
              onEntered={this.onOpened}
              onExited={this.onClosed}
              className={`${styles.modal} ${modalClassName}`}
              innerRef={innerRef}
            >
              {this.renderModalDialog()}
            </Fade>
            {Backdrop}
          </div>
        </Portal>
      );
    }

    return null;
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  toggle: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  /** Shows the backdrop and makes it clickable */
  backdrop: PropTypes.bool,
  backdropClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  centered: PropTypes.bool,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  headerClassName: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  isOpen: PropTypes.bool,
  modalClassName: PropTypes.string,
  onClosed: PropTypes.func,
  onOpen: PropTypes.func,
  size: PropTypes.string,
  styleMode: PropTypes.oneOf(['dark', 'light']),
  wrapClassName: PropTypes.string,
  /** Shows the close (x) icon or not */
  xIcon: PropTypes.bool,
};

Modal.defaultProps = {
  autoFocus: true,
  backdrop: true,
  backdropClassName: '',
  bodyClassName: '',
  centered: false,
  className: '',
  contentClassName: '',
  header: null,
  headerClassName: '',
  innerRef: null,
  isOpen: false,
  modalClassName: '',
  onOpen: null,
  onClosed: null,
  size: 'md',
  styleMode: 'light',
  wrapClassName: '',
  xIcon: true,
};

Modal.openCount = 0;

export default Modal;
