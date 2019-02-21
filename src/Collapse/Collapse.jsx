import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition'; // eslint-disable-line import/no-extraneous-dependencies

import styles from './collapse.module.scss';

const transitionStatusToClassHash = {
  entering: 'collapsing',
  entered: 'show',
  exiting: 'collapsing',
  exited: 'collapse',
};

class Collapse extends Component {
  state = { height: null };

  onEntering = (node, isAppearing) => {
    this.setState({ height: node.scrollHeight });
    this.props.onEntering(node, isAppearing);
  };

  onEntered = (node, isAppearing) => {
    this.setState({ height: null });
    this.props.onEntered(node, isAppearing);
  };

  onExit = node => {
    this.setState({ height: node.scrollHeight });
    this.props.onExit(node);
  };

  onExiting = node => {
    // getting this variable triggers a reflow
    const unused = node.offsetHeight; // eslint-disable-line no-unused-vars
    this.setState({ height: 0 });
    this.props.onExiting(node);
  };

  onExited = node => {
    this.setState({ height: null });
    this.props.onExited(node);
  };

  render() {
    const {
      tag: Tag,
      isOpen,
      className,
      children,
      innerRef,
      childProps,
      timeout,
      ...rest
    } = this.props;
    const { height } = this.state;
    return (
      <Transition
        {...rest}
        timeout={timeout}
        in={isOpen}
        onEntering={this.onEntering}
        onEntered={this.onEntered}
        onExit={this.onExit}
        onExiting={this.onExiting}
        onExited={this.onExited}
      >
        {status => {
          const collapseClass =
            transitionStatusToClassHash[status] || 'collapse';
          const classes = `${styles[collapseClass]}`;
          let style = height === null ? null : { height };

          if (childProps && childProps.style) {
            style = { ...childProps.style, ...style };
          }
          return (
            <div
              {...childProps}
              style={style}
              className={classes}
              ref={innerRef}
            >
              {children}
            </div>
          );
        }}
      </Transition>
    );
  }
}

Collapse.propTypes = {
  ...Transition.propTypes,
  isOpen: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.object,
  ]),
};

Collapse.defaultProps = {
  ...Transition.defaultProps,
  isOpen: false,
  appear: false,
  enter: true,
  exit: true,
  className: '',
  timeout: 350,
};
export default Collapse;
