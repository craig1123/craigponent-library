/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import styles from './tooltip.module.scss';

export default class Arrow extends Component {
  getBaseStyle = () => {
    const { duration, easing, delay, isShowing, wrapper } = this.props;
    const wrapperStyle =
      wrapper.current && wrapper.current.getBoundingClientRect();
    if (wrapperStyle) {
      const { top, bottom, left, right } = wrapperStyle;
      return {
        transition: `all ${duration}ms ${easing} ${delay}ms`,
        opacity: isShowing ? 1 : 0,
        pointerEvents: isShowing ? 'auto' : 'none',
        top,
        bottom,
        left,
        right,
      };
    }
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
    const { wrapper } = this.props;
    const wrapperStyle =
      wrapper.current && wrapper.current.getBoundingClientRect();
    if (wrapperStyle) {
      const { top, left, height, width } = wrapperStyle;
      switch (position) {
        case 'top':
        case 'top-right':
        case 'top-left':
          return {
            enter: {
              transform: 'translate3d(-50%, 0, 0)',
              bottom: '100%',
              left: left + width / 2,
            },
            active: {
              transform: 'translate3d(-50%, -2px, 0)',
            },
          };

        case 'bottom':
          return {
            enter: {
              transform: 'translate3d(-50%, -10px, 0)',
              bottom: 'auto',
              left: left + width / 2,
              top: top + window.scrollY + height,
            },
            active: {
              transform: 'translate3d(-50%, 1px, 0)',
            },
          };
        case 'bottom-left':
        case 'bottom-right':
          return {
            enter: {
              transform: 'translate3d(-50%, -10px, 0)',
              bottom: 'auto',
              left: left + width / 2,
              top: top + window.scrollY + height,
            },
            active: {
              transform: 'translate3d(-50%, 0, 0)',
            },
          };

        case 'left':
          return {
            enter: {
              bottom: 'auto',
              right: '102%',
              left: left - 13,
              top: top + window.scrollY + 12,
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
              left: left + width + 5,
              top: top + window.scrollY + 12,
              transform: 'translate3d(-10px, -50%, 0)',
            },
            active: {
              transform: 'translate3d(0, -50%, 0)',
            },
          };

        default:
          return {};
      }
    }
    return {};
  };

  getArrowStyle = () => {
    const { backgroundColor, position, wrapper, styleMode } = this.props;
    const wrapperStyle =
      wrapper.current && wrapper.current.getBoundingClientRect();
    const fillColor = styleMode === 'dark' ? '#080808' : '#E7E8EA';
    if (wrapperStyle) {
      const { top, left, height, width } = wrapperStyle;
      switch (position) {
        case 'top':
        case 'top-left':
        case 'top-right':
          return {
            borderLeft: 'solid transparent 10px',
            borderRight: 'solid transparent 10px',
            borderTop: `solid ${
              !backgroundColor ? fillColor : backgroundColor
            } 10px`,
            top: top + window.scrollY - 12,
            left: left + width / 2,
            marginBottom: 10,
          };

        case 'bottom':
        case 'bottom-left':
        case 'bottom-right':
          return {
            borderLeft: 'solid transparent 10px',
            borderRight: 'solid transparent 10px',
            borderBottom: `solid ${
              !backgroundColor ? fillColor : backgroundColor
            } 10px`,
            top: top + window.scrollY + height,
            left: left + width / 2,
          };

        case 'left':
          return {
            left: left - 13,
            top: top + window.scrollY + 2,
            borderTop: 'solid transparent 10px',
            borderBottom: 'solid transparent 10px',
            borderLeft: `solid ${
              !backgroundColor ? fillColor : backgroundColor
            } 10px`,
          };

        case 'right':
          return {
            left: left + width + 5,
            top: top + window.scrollY + 2,
            borderTop: 'solid transparent 10px',
            borderBottom: 'solid transparent 10px',
            borderRight: `solid ${
              !backgroundColor ? fillColor : backgroundColor
            } 10px`,
          };

        default:
          return {};
      }
    }
    return {};
  };

  getOffset = () => {
    const { position, offset } = this.props;
    if (offset !== '0px') {
      switch (position) {
        case 'top':
          return { marginBottom: offset };

        case 'top-left':
          return { marginBottom: offset };

        case 'top-right':
          return { marginBottom: offset, marginLeft: offset };

        case 'bottom':
          return { marginTop: parseInt(offset, 10) - 30 };

        case 'bottom-left':
          return { marginTop: parseInt(offset, 10) - 30 };

        case 'bottom-right':
          return { marginTop: parseInt(offset, 10) - 30, marginLeft: offset };

        case 'left':
          return { marginRight: offset };

        case 'right':
          return { marginLeft: offset };

        default:
          return {};
      }
    }
    return {};
  };

  render() {
    return (
      <div
        className={`${styles['tooltip-arrow']} ${
          this.props.arrowClassName
        }`.trim()}
        style={{
          ...this.getBaseStyle(),
          ...this.getArrowStyle(),
          ...this.getAnimationStyle(),
          ...this.getOffset(),
        }}
      />
    );
  }
}
