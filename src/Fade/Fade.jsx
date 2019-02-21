import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition'; // eslint-disable-line import/no-extraneous-dependencies

const defaultStyle = duration => ({
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
});

const transitionStyles = opacity => ({
  entering: { opacity: 0 },
  entered: { opacity },
});

function Fade(props) {
  const {
    tag: Tag,
    innerRef,
    children,
    duration,
    in: show,
    mountOnEnter,
    unmountOnExit,
    appear,
    enter,
    exit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    opacity,
    ...rest
  } = props;

  return (
    <Transition
      timeout={duration}
      in={show}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      appear={appear}
      enter={enter}
      exit={exit}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
    >
      {status => (
        <Tag
          ref={innerRef}
          style={{
            ...defaultStyle(duration),
            ...transitionStyles(opacity)[status],
          }}
          {...rest}
        >
          {children}
        </Tag>
      )}
    </Transition>
  );
}

Fade.propTypes = {
  // Controls if the fade is currently showing or not (default: true)
  in: PropTypes.bool.isRequired,

  // All of these match react-transition-group/Transition props
  mountOnEnter: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  appear: PropTypes.bool, // (default: true)
  enter: PropTypes.bool, // (default: true)
  exit: PropTypes.bool, // (default: true)
  duration: PropTypes.number,
  addEndListener: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,

  // These props are go
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  opacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  tag: PropTypes.string,
  className: PropTypes.string,
};

Fade.defaultProps = {
  ...Transition.defaultProps,
  className: '',
  duration: 150,
  appear: true,
  enter: true,
  exit: true,
  in: true,
  innerRef: null,
  opacity: 1,
  tag: 'div',
};

export default Fade;
