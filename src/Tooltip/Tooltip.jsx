/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Arrow from './Arrow';
import TipContainer from './TipContainer';

import styles from './tooltip.module.scss';

class Tooltip extends Component {
  wrapper = React.createRef();

  state = { isShowing: false };

  showTooltip = () => {
    this.setState({ isShowing: true });
  };

  hideTooltip = () => {
    this.setState({ isShowing: false });
  };

  handleTouch = () => {
    this.showTooltip();
    this.assignOutsideTouchHandler();
  };

  assignOutsideTouchHandler = () => {
    const mobile = window.innerWidth < 769;
    const handler = e => {
      let currentNode = e.target;
      const componentNode = this.wrapper.current;
      while (currentNode.parentNode) {
        if (currentNode === componentNode) return;
        currentNode = currentNode.parentNode;
      }
      if (currentNode !== document) return;
      this.hideTooltip();
      if (mobile) {
        document.removeEventListener('touchstart', handler);
      } else {
        document.removeEventListener('click', handler);
      }
    };
    if (mobile) {
      document.addEventListener('touchstart', handler);
    } else {
      document.addEventListener('click', handler);
    }
  };

  render() {
    const { isShowing } = this.state;
    const {
      arrow,
      backgroundColor,
      children,
      className,
      content,
      duration,
      delay,
      easing,
      hover,
      position,
      textColor,
      ...rest
    } = this.props;

    return (
      <div
        className={`${styles['tooltip-wrapper']} ${className}`.trim()}
        onClick={hover ? null : this.handleTouch}
        onKeyPress={hover ? null : this.handleTouch}
        onMouseEnter={hover ? this.showTooltip : null}
        onMouseLeave={hover ? this.hideTooltip : null}
        onTouchStart={this.handleTouch}
        ref={this.wrapper}
        {...rest}
      >
        {arrow && <Arrow {...this.props} isShowing={isShowing} />}
        <TipContainer {...this.props} isShowing={isShowing}>
          {content}
        </TipContainer>
        {children}
      </div>
    );
  }
}

Tooltip.propTypes = {
  arrow: PropTypes.bool,
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  className: PropTypes.string,
  duration: PropTypes.number,
  delay: PropTypes.number,
  easing: PropTypes.string,
  hover: PropTypes.bool,
  position: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',
    'bottom',
    'bottom-left',
    'bottom-right',
    'right',
    'left',
  ]),
  textColor: PropTypes.string,
};

Tooltip.defaultProps = {
  arrow: true,
  backgroundColor: '#17181A',
  className: '',
  duration: 180,
  delay: 0,
  easing: 'ease-in-out',
  hover: true,
  position: 'top',
  textColor: '#fff',
};

export default Tooltip;
