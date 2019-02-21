/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import styles from './tooltip.module.scss';

export default class TipContainer extends Component {
  getBaseStyle = () => {
    const {
      duration,
      easing,
      delay,
      isShowing,
      backgroundColor,
      textColor,
    } = this.props;
    const opacity = isShowing ? 1 : 0;
    const pointerEvents = isShowing ? 'auto' : 'none';
    return {
      backgroundColor,
      color: textColor,
      transition: `all ${duration}ms ${easing} ${delay}ms`,
      opacity,
      pointerEvents,
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
        return {
          enter: {
            marginBottom: 10,
            transform: 'translate3d(-50%, 0, 0)',
            bottom: '100%',
            left: '50%',
          },
          active: {
            transform: 'translate3d(-50%, -5px, 0)',
          },
        };

      case 'top-left':
        return {
          enter: {
            ...this.getAnimationStyleByPosition('top').enter,
            transform: 'translate3d(calc(-100% + 16px), 0, 0)',
          },
          active: {
            transform: 'translate3d(calc(-100% + 16px), -5px, 0)',
          },
        };

      case 'top-right':
        return {
          enter: {
            ...this.getAnimationStyleByPosition('top').enter,
            transform: 'translate3d(calc(0% + -16px), 0, 0)',
          },
          active: {
            transform: 'translate3d(calc(0% + -16px), -5px, 0)',
          },
        };

      case 'bottom':
        return {
          enter: {
            transform: 'translate3d(-50%, 0, 0)',
            top: '100%',
            left: '50%',
          },
          active: {
            transform: 'translate3d(-50%, 10px, 0)',
          },
        };

      case 'bottom-left':
        return {
          enter: {
            ...this.getAnimationStyleByPosition('bottom').enter,
            transform: 'translate3d(calc(-100% + 16px), 0, 0)',
          },
          active: {
            transform: 'translate3d(calc(-100% + 16px), 10px, 0)',
          },
        };

      case 'bottom-right':
        return {
          enter: {
            ...this.getAnimationStyleByPosition('bottom').enter,
            transform: 'translate3d(calc(0% + -16px), 0, 0)',
          },
          active: {
            transform: 'translate3d(calc(0% + -16px), 10px, 0)',
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
            marginRight: 10,
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
            marginLeft: 10,
          },
          active: {
            transform: 'translate3d(0, -50%, 0)',
          },
        };

      default:
        return {};
    }
  };

  getGap = () => {
    const { position } = this.props;
    switch (position) {
      case 'top':
      case 'top-left':
      case 'top-right':
        return { bottom: '-20px' };

      case 'bottom':
      case 'bottom-left':
      case 'bottom-right':
        return { top: '-20px' };

      case 'left':
        return { right: '-20px' };

      case 'right':
        return { left: '-20px' };

      default:
        return {};
    }
  };

  render() {
    return (
      <div
        className={styles['tip-container']}
        style={{
          ...this.getBaseStyle(),
          ...this.getAnimationStyle(),
        }}
      >
        <div className={styles.gap} style={this.getGap()} />
        {this.props.children}
      </div>
    );
  }
}
