/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import styles from './tooltip.module.scss';

export default class Arrow extends Component {
  getBaseStyle = () => {
    const { duration, easing, delay, isShowing } = this.props;
    return {
      transition: `all ${duration}ms ${easing} ${delay}ms`,
      opacity: isShowing ? 1 : 0,
      pointerEvents: isShowing ? 'auto' : 'none',
    };
  };

  getAnimationStyle = () => {
    const { position, isShowing } = this.props;
    const animationStyle = this.getAnimationStyleByPosition(position);

    if (isShowing === false) {
      return animationStyle.enter;
    }

    return {
      ...animationStyle.enter,
      ...animationStyle.active,
    };
  };

  getAnimationStyleByPosition = position => {
    switch (position) {
      case 'top':
      case 'top-left':
      case 'top-right':
        return {
          enter: {
            transform: 'translate3d(-50%, 0, 0)',
            bottom: '100%',
            left: '50%',
          },
          active: {
            transform: 'translate3d(-50%, -5px, 0)',
          },
        };

      case 'bottom':
      case 'bottom-left':
      case 'bottom-right':
        return {
          enter: {
            transform: 'translate3d(-50%, -10px, 0)',
            bottom: 'auto',
            left: '50%',
            top: '100%',
          },
          active: {
            transform: 'translate3d(-50%, 0, 0)',
          },
        };

      case 'left':
        return {
          enter: {
            bottom: 'auto',
            left: 'auto',
            right: '100%',
            top: '50%',
            transform: 'translate3d(10px, -50%, 0)',
          },
          active: {
            transform: 'translate3d(0, -50%, 0)',
          },
        };

      case 'right':
        return {
          enter: {
            bottom: 'auto',
            left: '100%',
            top: '50%',
            transform: 'translate3d(-10px, -50%, 0)',
          },
          active: {
            transform: 'translate3d(0, -50%, 0)',
          },
        };

      default:
        return {};
    }
  };

  getArrowStyle = () => {
    const { backgroundColor, position } = this.props;
    switch (position) {
      case 'top':
      case 'top-left':
      case 'top-right':
        return {
          bottom: '-5px',
          left: '50%',
          borderLeft: 'solid transparent 10px',
          borderRight: 'solid transparent 10px',
          borderTop: `solid ${backgroundColor} 10px`,
        };

      case 'bottom':
      case 'bottom-left':
      case 'bottom-right':
        return {
          borderLeft: 'solid transparent 10px',
          borderRight: 'solid transparent 10px',
          borderBottom: `solid ${backgroundColor} 10px`,
          bottom: '-5px',
          left: '50%',
        };

      case 'left':
        return {
          borderTop: 'solid transparent 10px',
          borderBottom: 'solid transparent 10px',
          borderLeft: `solid ${backgroundColor} 10px`,
        };

      case 'right':
        return {
          borderTop: 'solid transparent 10px',
          borderBottom: 'solid transparent 10px',
          borderRight: `solid ${backgroundColor} 10px`,
        };

      default:
        return {};
    }
  };

  render() {
    return (
      <div
        className={styles['tooltip-arrow']}
        style={{
          ...this.getBaseStyle(),
          ...this.getArrowStyle(),
          ...this.getAnimationStyle(),
        }}
      />
    );
  }
}
